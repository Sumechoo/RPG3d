import { Level, TileConfig, TileFormat } from "../types";
import { MainRenderer } from "./MainRenderer";
import { PlayerController } from "./PlayerController";
import { Block } from "./Block";
import { Vector3, SpriteMaterial } from "three";
import { IMAGE_ASSETS } from "../assets/images";
import { getInMatrix, setInMatrix, matrixToNodes } from "./utils";
import { Sprite } from "./Sprite";
import { PathFinder, PathNode } from "./PathFinder";
import { Creature } from "./Creature";

export class LevelBuilder {
    private _walkableMatrix: boolean[][] = [];

    private readonly _pathFinder: PathFinder;

    constructor(level: Level, renderer: MainRenderer) {
        let x = 0;
        let y = 0;

        const player = new PlayerController({level: this, position: {x: 0, y: 0}});

        level.map.split('').forEach((item) => {
            y++;
            switch(item) {
                case '\n':
                    x++;
                    y = 0;
                    break;
                case '@':
                    player.position.x = x;
                    player.position.z = y;
                default:
                    const configs = level.configs[item];

                    if (configs) {
                        const {tileConfig, includes, spawns} = configs;
                        const configsToInclude: Array<TileConfig> = [];

                        if(includes) {
                            includes.forEach((id) => configsToInclude.push(...level.configs[id]?.tileConfig));
                        }

                        if(spawns) {
                            const creature = new spawns({level: this, position: {x, y}});
                            creature.position.y = 2;
                            renderer.add(creature.getBody());
                            renderer.addAnimated(creature);
                        }

                        [...configsToInclude, ...tileConfig]
                            .forEach(({yShift, texture, isWalkable, format, size}, index) => {
                                const position = new Vector3(x, index + (yShift ?? 0), y);

                                if (format === TileFormat.SPRITE) {
                                    renderer.add(new Sprite(position, IMAGE_ASSETS[texture ?? 'tree'] as SpriteMaterial, size), )
                                } else {
                                    renderer.add(new Block(position, IMAGE_ASSETS[texture ?? 'floor_stone']));
                                }
                                setInMatrix(x, y, isWalkable || false, this._walkableMatrix);
                            });
                    }
                    break;
            }
        });

        renderer.add(player);
        renderer.addAnimated(player);
        renderer.setMainCamera(player.getCamera());

        this._pathFinder = new PathFinder(matrixToNodes(this._walkableMatrix));

        // test path folowing
        const path = this._pathFinder.getPath({x: 9, y: 8}, {x: 25, y: 60});

        const testCreature = new Creature({
            level: this,
            position: {x: 0, y: 0},
        });

        renderer.add(testCreature.getBody());
        renderer.addAnimated(testCreature);

        this.EXP_moveCreatureByPath(testCreature, path);
    }

    private EXP_moveCreatureByPath = (obj: Creature, path: PathNode[]) => {
        if(path.length === 1) {
            return;
        }

        obj.setPosition(path[0].position);

        setTimeout(() => this.EXP_moveCreatureByPath(obj, [...path].splice(1, path.length)), 300);
    } 

    public isTileWalkable(x: number, y: number) {
        return getInMatrix(x, y, this._walkableMatrix);
    }
}