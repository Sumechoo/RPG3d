import { Cat } from "../classes/mobs/Cat";
import { Level } from "../types";

export const CatBarn: Level = {
    map: `
    wwwwwwwww
    wcccccccw
    wcccccccw
    w       w
    w       w
    wwww@wwww
    w       w
    w       w
    wwwwwwwww
    `,
    configs: {
        w: {
            tileConfig: [
                {texture: 'floor_stone', yShift: 1},
            ]
        },
        ' ': {
            tileConfig: [
                {texture: 'floor_wood', isWalkable: true},
            ],
        },
        c: {
            includes: [' '],
            tileConfig: [],
            spawns: Cat,
        },
        '@': {
            includes: [' '],
            tileConfig: [],
        }
    }
}