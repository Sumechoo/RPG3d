import { Level } from "../types";

export const MAP_01: Level = {
    map: `
####
# @ ###################
#             #       #
#   #######   #       #
####      #   ####    #
          #           #   
          #           #
          #           #
          #   wwwwwwwww           ####
          #   w       w           #  #
###########   wwwwwwwww           #  #
#                     #   #########  #
#                     #   #          #
#                     #   #          #
#                     #####      #####
#                                #
#                     #####      #
#######################   #      #
                          #      #
                          #      #
                          ########
    `,   
    configs: {
        '@': {
            includes: [' '],
            tileConfig: [],
        },
        ' ': {
            tileConfig: [
                {isWalkable: true, texture: 'grass'},
                {isWalkable: true, texture: 'wall_stone', yShift: 2},
            ],
        },
        '#': {
            tileConfig: [
                {texture: 'wall_stone', yShift: 1},
                {texture: 'wall_stone', yShift: 1},
            ],
        },
        'w': {
            includes: ['#'],
            tileConfig: [],
        },
    },
};