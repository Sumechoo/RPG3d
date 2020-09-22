import { Cat } from "../classes/mobs/Cat";
import { Level, TileFormat } from "../types";

export const CatBarn: Level = {
    map: `
     t t tt
     
     wwwwwwwww
 t   wcccccc@w  t
     wcccccc w
 t   wcccccccw  t
     wcccccccw
     wcccccccw   t
 t   w ccccccw
     wwwwwwwww
     
     t   t
    `,
    configs: {
        w: {
            tileConfig: [
                {texture: 'floor_stone', yShift: 1},
                {texture: 'floor_wood', yShift: 1},
            ]
        },
        ' ': {
            tileConfig: [
                {texture: 'floor_stone', isWalkable: true},
            ],
        },
        t: {
            tileConfig: [
                {format: TileFormat.SPRITE, texture: 'tree', size: 10, yShift: 5},
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