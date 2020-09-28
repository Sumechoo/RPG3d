import { Creature } from "../classes/Creature";
import { Cat } from "../classes/mobs/Cat";
import { Level, TileFormat } from "../types";

export const MAP_01: Level = {
    map: `
####
#   ###################
#             #       #
#   #######   #       #
####      #   ####    #
          #           #   
          #           #
          #           #
          #b  wwwwwwwww           ####
          #   w       w           #  #
###########   wwwwwwwww           #  #
#bbb                bb#   #########  #
#bb                  b#   #bb        #
#                    b#   #b         #
#b    @               #####      #####
#bb                              #
#bbbb                b#####bbbbbb#
#######################   #bbbbbb#
                          #bbbbbb#
                          #bbbbbb#
                          #bbbbbb#
                          ########
    `,   
    configs: {
        '@': {
            includes: [' '],
            tileConfig: [],
        },
        ' ': {
            tileConfig: [
                {isWalkable: true, texture: 'floor_stone'},
                {isWalkable: true, texture: 'floor_stone', yShift: () => 2},
            ],
        },
        '#': {
            tileConfig: [
                {texture: 'wall_stone', yShift: () => 1},
                {texture: 'wall_stone', yShift: () => 1},
            ],
        },
        b: {
            includes: [' '],
            tileConfig: [
                {texture: 'tall_grass', format: TileFormat.SPRITE, yShift: () => -1.2, size: 2, isHairy: true, isWalkable: true}
            ]
        },
        c: {
            includes: [' '],
            tileConfig: [],
        },
        'w': {
            includes: ['#'],
            tileConfig: [],
        },
    },
};