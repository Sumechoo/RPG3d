import { Cat } from "../classes/mobs/Cat";
import { Level, TileFormat } from "../types";

export const CatBarn: Level = {
    map: `
     t t tt
     wwwwwwwwwww
     w         w
     w@wwwwwww wwwwwww
 t   w       w       w
 t   w       wwwwwww www
 t   w       w         wwww
 t   w       w            w
 t   w       wwwwwwwwwww  w
 t   w c       w       w  w
     wwwwwwww     w       w
             wwwwwwwwwwwwww
     t   t
    `,
    configs: {
        w: {
            tileConfig: [
                {texture: 'floor_stone', yShift: () => 1},
                {texture: 'floor_wood', yShift: () => 1},
            ]
        },
        ' ': {
            tileConfig: [
                {texture: 'window_old', isWalkable: true},
            ],
        },
        t: {
            tileConfig: [
                {format: TileFormat.SPRITE, texture: 'tree', size: 10, yShift: () => 5},
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