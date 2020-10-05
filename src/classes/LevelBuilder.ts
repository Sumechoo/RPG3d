import { Level, TileConfig, TileFormat } from "../types";
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

export const GEOMETRY_RESOURCES = {
    // TODO: Collect info about static sprites amount to proper init of resources
    grass_01: new InstancedGeometry(IMAGE_ASSETS.tall_grass, .3, 50000, true),
    grass_02: new InstancedGeometry(IMAGE_ASSETS.tall_grass_02, .3, 50000, true),
    grass_03: new InstancedGeometry(IMAGE_ASSETS.tall_grass_03, .3, 18000, true),
    grass_04: new InstancedGeometry(IMAGE_ASSETS.tall_grass_03, .4, 2000, true),
    bush: new InstancedGeometry(IMAGE_ASSETS.bush, 1, 2000, true),
    bush_02: new InstancedGeometry(IMAGE_ASSETS.bush2, 1, 10, true),

    wall: new InstancedGeometry(IMAGE_ASSETS.window_old, .1, 300, false, true, PrepareBoxGeometry),
    asphalt: new InstancedGeometry(IMAGE_ASSETS.actual_grass, 1, 1100, false, true, PrepareBoxGeometry),
    fence: new InstancedGeometry(IMAGE_ASSETS.fence, 1, 200),
    
    tree_01: new InstancedGeometry(IMAGE_ASSETS.tree, 4, 100, true),
    tree_02: new InstancedGeometry(IMAGE_ASSETS.tree2, 6, 100, true),
    tree_03: new InstancedGeometry(IMAGE_ASSETS.tree3, 3, 100,true),
    tree_04: new InstancedGeometry(IMAGE_ASSETS.tree3, 2, 100,true),
}

export class LevelBuilder {
    private _walkableMatrix: boolean[][] = [];
    private _positionsMatrix: Creature[][] = [];
    private _renderer: MainRenderer;

    private readonly _pathFinder: PathFinder;

    constructor(level: Level, renderer: MainRenderer) {
        this._renderer = renderer;

        let x = 0;
        let y = 0;

        let player: PlayerController; 

        level.map.split('').forEach((item) => {
            y++;
            switch(item) {
                case '\n':
                    x++;
                    y = 0;
                    break;
                case '@':
                    player = new PlayerController({
                        level: this,
                        position: {x, y},
                    });

                    renderer.add(player);
                    renderer.addAnimated(player);
                    renderer.setMainCamera(player.getCamera());
                default:
                    const configs = level.configs[item];

                    if (configs) {
                        const {tileConfig, includes, spawns} = configs;
                        const configsToInclude: Array<TileConfig> = [];

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
                            .forEach(({yShift, texture, isWalkable, format, size, isHairy, facing, geometry}, index) => {
                                magnitude = yShift ? magnitude + yShift() : magnitude;
                                const position = new Vector3(x, magnitude + index, y);
                                const facingValue = facing && facing();

                                setInMatrix(x, y, isWalkable || false, this._walkableMatrix);

                                if (geometry) {
                                    const targetName = geometry[Math.floor(Math.random() * geometry.length)];
                                    const targetResource = GEOMETRY_RESOURCES[targetName];

                                    if (isHairy) {
                                        for(let i = 0; i < 60; i++) {
                                            const sizeMod = (size ?? 1) * (Math.random() + 3.4);
                                            const targetName = geometry[Math.floor(Math.random() * geometry.length)];
                                            const targetResource = GEOMETRY_RESOURCES[targetName];

                                            const shiftedPosition = new Vector3(
                                                position.x + Math.random() * 0.8 - 0.4,
                                                position.y,
                                                position.z + Math.random() * 0.8 - 0.4,
                                            );

                                            targetResource.addInstance(shiftedPosition, sizeMod, Math.random() * 360);
                                        }
                                    }

                                    targetResource.addInstance(position, size, facingValue);

                                    return;
                                }

                                if (format === TileFormat.SPRITE) {
                                    renderer.add(new Sprite(position, IMAGE_ASSETS[texture ?? 'tree'], size, facingValue));                                        
                                } else {
                                    renderer.add(new Block(position, IMAGE_ASSETS[texture ?? 'floor_stone']));
                                }
                            });
                    }
                    break;
            }
        });

        const resourcesArray = Object.values(GEOMETRY_RESOURCES);
        resourcesArray.forEach((resource) => resource.finalize());

        this._renderer.add(...resourcesArray);

        this._pathFinder = new PathFinder(matrixToNodes(this._walkableMatrix));
    }

    public getPath = (start: Vec2, end: Vec2) => this._pathFinder.getPath(start, end);

    public disposeLevel = () => {
        console.info('DISPOSING!');

        this._renderer.clearScene();

        const resourcesArray = Object.values(GEOMETRY_RESOURCES);
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