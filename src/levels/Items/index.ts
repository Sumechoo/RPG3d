import { Level } from "../../types";

const map = `
333333333333   
#####  ####3
#FFF#  #FFF3
#FFF####FFF3          ##########
#FFFFFFFFF33333333333#FFFFFFFF#########
########FFBFFF######  #F#FFF@FFFFFFFFF#
2222222#FFFFFFFFFFF#  #F#FFFFFF######F#
       ###########F#  #F########    3F3333333
                 #F#  #F#           3FFFFFFF3
                 #F#  #F#           3F#F#F#F3
                 #F####F###         3F#F#F#F3
                 #FFFFFFFF#         333333333
                 ########F#
                        #F#####
                        #FFFFF#
                        ####FF#
                           #FF#
                           #FF#
                           #22#
`;

export const ItemsMap: Level = {
    map,
    configs: {
        'F': [{yShift: -1, texture: 'asphalt', isWalkable: true}],
        '3': [
            {texture: 'brick_wall'},
            {texture: 'window_old'},
            {texture: 'window_old'},
            {texture: 'window_old'},
            {texture: 'window_old'},
        ],
        'R': [
            {}, {}, {}, {}, {}, {}
        ],
        '2': [
            {texture: 'brick_wall'},
            {texture: 'brick_wall'},
            {texture: 'brick_wall'},
            {texture: 'brick_wall'},
        ],
        '#': [{yShift: -0.5,  texture: 'wall_stone'}],
    },
};