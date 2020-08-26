import { Level } from "../types";
import { MainRenderer } from "./MainRenderer";
import { PlayerController } from "./PlayerController";
import { Block } from "./Block";
import { Vector3 } from "three";
import { IMAGE_ASSETS } from "../assets/images";
import { getInMatrix, setInMatrix } from "./utils";

export class LevelBuilder {
    private _walkableMatrix: boolean[][] = [];

    constructor(level: Level, renderer: MainRenderer) {
        let x = 0;
        let y = 0;

        const player = new PlayerController(this);

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
                    break;
                default:
                    const configs = level.configs[item];

                    if (configs) {
                        configs
                        .forEach(({yShift, texture, isWalkable}, index) => {
                            renderer.add(new Block(new Vector3(x, index + (yShift ?? 0), y), IMAGE_ASSETS[texture ?? 'floor_stone']));
                            setInMatrix(x, y, isWalkable || false, this._walkableMatrix);
                        });
                    }
                    break;
            }
        });

        renderer.add(player);
        renderer.setMainCameraTarget(player);
    }

    public isTileWalkable(x: number, y: number) {
        return getInMatrix(x, y, this._walkableMatrix);
    }
}