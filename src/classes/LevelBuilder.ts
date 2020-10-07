import { Level, LevelAction, LevelParams, TileConfig, TileFormat } from "../types";
import { MainRenderer } from "./MainRenderer";
import { PlayerController } from "./PlayerController";
import { Block } from "./Block";
import { Vector3, SpriteMaterial, Vec2 } from "three";
import { IMAGE_ASSETS } from "../assets/images";
import { getInMatrix, setInMatrix, matrixToNodes } from "./utils";
import { Sprite } from "./Sprite";
import { PathFinder } from "./PathFinder";
import { Creature } from "./Creature";
import { InstancedGeometry } from "./IstancedGeometry";
import { PrepareBoxGeometry } from "./GeometryPreparators";

export const getGeometryResources = () => ({
    grass_01: new InstancedGeometry(IMAGE_ASSETS.tall_grass, .01, 50000, true),
    grass_02: new InstancedGeometry(IMAGE_ASSETS.tall_grass_02, .01, 50000, true),
    grass_03: new InstancedGeometry(IMAGE_ASSETS.tall_grass_03, .01, 18000, true),
    grass_04: new InstancedGeometry(IMAGE_ASSETS.tall_grass_03, .01, 2000, true),
    bush: new InstancedGeometry(IMAGE_ASSETS.bush, 1, 2000, true),
    bush_02: new InstancedGeometry(IMAGE_ASSETS.bush2, 1, 10, true),
    corn: new InstancedGeometry(IMAGE_ASSETS.corn, 1, 1000, true),

    wall: new InstancedGeometry(IMAGE_ASSETS.window_old, .1, 500, false, true, PrepareBoxGeometry),
    dirt: new InstancedGeometry(IMAGE_ASSETS.actual_grass, 1, 1100, false, true, PrepareBoxGeometry),
    asphalt: new InstancedGeometry(IMAGE_ASSETS.beton_wall, 1, 1100, false, true, PrepareBoxGeometry),
    fence: new InstancedGeometry(IMAGE_ASSETS.fence, 1, 200),

    window_decale: new InstancedGeometry(IMAGE_ASSETS.window_decale, 1, 200, false, true, PrepareBoxGeometry),
    door_decale: new InstancedGeometry(IMAGE_ASSETS.door_decale, 1, 200, false, true, PrepareBoxGeometry),

    tree_01: new InstancedGeometry(IMAGE_ASSETS.tree, 4, 100, true),
    tree_02: new InstancedGeometry(IMAGE_ASSETS.tree2, 6, 100, true),
    tree_03: new InstancedGeometry(IMAGE_ASSETS.tree3, 3, 100,true),
    tree_04: new InstancedGeometry(IMAGE_ASSETS.tree3, 2, 100,true),
});

export class LevelBuilder {
    private _walkableMatrix: boolean[][] = [];
    private _positionsMatrix: Creature[][] = [];
    private _actionsMatrix: LevelAction[][] = [];

    private _renderer: MainRenderer;
    private _player?: PlayerController;

    private readonly _pathFinder: PathFinder;

    private _geometryResources: ReturnType<typeof getGeometryResources>;

    constructor(level: Level, renderer: MainRenderer, params: LevelParams) {
        this._renderer = renderer;
        const {spawnPosition} = params;

        if(spawnPosition) {
            this._player = new PlayerController({
                level: this,
                position: {x: spawnPosition.x, y: spawnPosition.y},
            });

            renderer.add(this._player);
            renderer.addAnimated(this._player);
            renderer.setMainCamera(this._player.getCamera());
        }

        this._geometryResources = getGeometryResources();

        level.map.split('\n').forEach((row, x) => row.split('').forEach((item, y) => {
                if (item === '@') {
                    console.info('@ position is:', {x, y});
                }

                const configs = level.configs[item];

                if (configs) {
                    const {tileConfig, includes, spawns, action} = configs;
                    const configsToInclude: Array<TileConfig> = [];
                    
                    setInMatrix(x, y, action, this._actionsMatrix);

                    if(includes) {
                        includes.forEach((id) => configsToInclude.push(...level.configs[id]?.tileConfig));
                    }

                    if(spawns) {
                        const creature = new spawns({
                            level: this,
                            position: {x, y},
                        });
                        creature.position.y = 2;

                        renderer.add(creature.getBody());
                        renderer.addAnimated(creature);
                    }

                    let magnitude = -1;

                    [...configsToInclude, ...tileConfig]
                        .forEach(({yShift, isWalkable, size, isHairy, facing, geometry}, index) => {
                            magnitude = yShift ? magnitude + yShift() : magnitude;
                            const position = new Vector3(x, magnitude + index, y);
                            const facingValue = facing && facing();

                            setInMatrix(x, y, isWalkable || false, this._walkableMatrix);

                            if (geometry) {
                                const targetName = geometry[Math.floor(Math.random() * geometry.length)];
                                const targetResource = this._geometryResources[targetName];

                                if (isHairy) {
                                    for(let i = 0; i < 60; i++) {
                                        const sizeMod = (size ?? 1) * (Math.random() + 3.4);
                                        const targetName = geometry[Math.floor(Math.random() * geometry.length)];
                                        const targetResource = this._geometryResources[targetName];

                                        const shiftedPosition = new Vector3(
                                            position.x + Math.random() - 0.5,
                                            position.y,
                                            position.z + Math.random() - 0.5,
                                        );

                                        targetResource.addInstance(shiftedPosition, sizeMod, Math.random() * 360);
                                    }
                                }

                                targetResource.addInstance(position, size, facingValue);
                            }
                        });
                }
        }));

        const resourcesArray = Object.values(this._geometryResources);
        resourcesArray.forEach((resource) => resource.finalize());

        this._renderer.add(...resourcesArray);
        this._pathFinder = new PathFinder(matrixToNodes(this._walkableMatrix));
    }

    public getRenderer = () => this._renderer;

    public getPath = (start: Vec2, end: Vec2) => this._pathFinder.getPath(start, end);

    public callActionAt = (at: Vec2) => {
        const action = getInMatrix(at.x, at.y, this._actionsMatrix);

        action && action.call(this, at);
    }

    public disposeLevel = () => {
        this._renderer.clearScene();
        this._player?.dispose();

        const resourcesArray = Object.values(this._geometryResources);
        resourcesArray.forEach((resource) => resource.dispose());
    }
    
    public lockPosition = (x: number, y: number, by: Creature) => {
        setInMatrix(x, y, by, this._positionsMatrix);
    }

    public unlockPosition = (x: number, y: number) => {
        setInMatrix(x, y, undefined, this._positionsMatrix);
    }

    public getCreatureAt = (x: number, y: number) => {
        return getInMatrix(x,y,this._positionsMatrix);
    }

    public removeCreature = (target: Creature) => {
        this._renderer.remove(target.getBody());
        this._renderer.removeAnimated(target);
        this.unlockPosition(target.position.x, target.position.z);
    }

    public isTileWalkable(x: number, y: number) {
        return getInMatrix(x, y, this._walkableMatrix) && !getInMatrix(x, y, this._positionsMatrix);
    }
}