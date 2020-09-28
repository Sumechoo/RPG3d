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
                            .forEach(({yShift, texture, isWalkable, format, size, isHairy, facing}, index) => {
                                magnitude = yShift ? magnitude + yShift() : magnitude;
                                const position = new Vector3(x, magnitude + index, y);
                                const facingValue = facing && facing();

                                size = isHairy && size ? size * Math.random() + 0.5 : size;

                                if (format === TileFormat.SPRITE) {
                                    if (isHairy) {
                                        for(let i = 0; i < Math.round(Math.random() * 10) + 3; i++) {
                                            const shiftedPosition = new Vector3(
                                                position.x + Math.random() / 1.5,
                                                position.y,
                                                position.z + Math.random() / 1.5,
                                            );
                                            renderer.add(new Sprite(shiftedPosition, IMAGE_ASSETS[texture ?? 'tree'], size, facingValue));
                                        }
                                    } else {
                                        renderer.add(new Sprite(position, IMAGE_ASSETS[texture ?? 'tree'], size, facingValue));                                        
                                    }
                                } else {
                                    renderer.add(new Block(position, IMAGE_ASSETS[texture ?? 'floor_stone']));
                                }
                                setInMatrix(x, y, isWalkable || false, this._walkableMatrix);
                            });
                    }
                    break;
            }
        });

        this._pathFinder = new PathFinder(matrixToNodes(this._walkableMatrix));
    }

    public getPath = (start: Vec2, end: Vec2) => this._pathFinder.getPath(start, end);

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