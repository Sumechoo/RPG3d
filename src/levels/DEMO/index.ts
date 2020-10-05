import { Level, TileConfig, TileFormat } from "../../types";
import {Cat} from '../../classes/mobs/Cat';
import { repeat } from "../../classes/utils";
import { GEOMETRY_RESOURCES } from "../../classes/LevelBuilder";

export const DEMO_LEVEL: Level = {
    map: `
            T   TTT T T    TTT TT TTTTT T TTT T T TT    T TTT T T

        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
     T  w_____________________________________________________w   T
    T   w_____________T_______________________________________w   T
    T wwwF_FFFFFFFFFFFFF_FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFwwww
     wAAAAAAAAAAAAAAAAAAAAAAAAAAAA@AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwT
     wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw
     TwwwFFpFFwwwwAAAAAAAwFFFFFFpFFFFFFFFFFFFFFpFFFFFFFAAAAAAAwwww
    T   w__p__w  wFFFAwFFF______p__________f___p_______AAAAAAAwBBBBB
     T  w__p__wwww___Af_________p__________f___p_______AAAAAAAwBww
     T  w__p_________Af_________p__________f___p_______AAAAAAAAB_w
     T  w__p_________Af_________p____T_____f_T_p_______________B_w
    TT  w__ppppppppppAf_________p__T_TT_T_wFFFFpFFFFw_T________BBBBB
    T   w_______T_T__Af____T____p_________fAAAAAAAAAf____________w  T
    T   w_______T_T__Af____T____p_________fAAAAABBBBf____________w  T
     T  w___T__T___T_Af_________p__T____T_fAAAAAB  Bf____________w   T
     wwww____________AppppppppppppppppppppfAAAAAB  BfT___________w    T
     wAAAAAAAAAAAAAAAAf___p_____p___T___T_fAAAAAB  Bf____________w
     wwww__________wwwwww_p_____p_T_____T_fAAAAAB  Bf____________w 
     T  wFFw_T_____fppppppp_____p___T_T_T_fAAAAABBBBf____________w
     T  wppf_T_____fppppppp_____p___T_T_T_fAAAAAAAAAf____________w
    T   wppf__T____fppppf_______p_______T_wFFpFFFFFFw___________w
     T  wppf_______fppppf_______pppppppppppppp_f________________w  T
     T  wpppppppppppppppf______________________f________________w  T
        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
      TT        
    TTTTTT  TTTTTTTT   TTTT TTTTT TTTTTTTTT   TTT   TTT  T T TTT TT T

    L                   L                       L                   L   
    `,
    configs: {
        '@': {
            includes: ['A'],
            tileConfig: [],
        },
        'w': {
            tileConfig: [
                {texture: 'beton_wall', yShift: () => .2, size: 2},
                {texture: 'beton_wall'},
            ]
        },
        'L': {
            tileConfig: [
                {texture: 'lep', size: 15, format: TileFormat.SPRITE, yShift: () => 8},
            ]
        },
        'f': {
            includes: ['_'],
            tileConfig: [
                {yShift: () => -0.62, geometry: ['fence'], size: 1},
            ]
        },
        F: {
            includes: ['_'],
            tileConfig: [
                {yShift: () => -0.62, geometry: ['fence'], size: 1, facing: () => 90},
            ]
        },
        '_': {
            tileConfig: [
                {isWalkable: true, geometry: ['asphalt'], yShift: () => Math.random() / 8},
                {
                    yShift: () => -0.4,
                    isWalkable: true,
                    geometry: [
                        ...repeat<keyof typeof GEOMETRY_RESOURCES>('grass_01', 30),
                        ...repeat<keyof typeof GEOMETRY_RESOURCES>('grass_02', 30),
                        ...repeat<keyof typeof GEOMETRY_RESOURCES>('grass_03', 10),
                        ...repeat<keyof typeof GEOMETRY_RESOURCES>('grass_04', 2),
                        'bush',
                        // 'bush_02',
                    ],
                    size: 0.12,
                    isHairy: true,
                    facing: () => Math.random() * 360,
                },
            ]
        },
        p: {
            tileConfig: [
                {geometry: ['asphalt'], isWalkable: true},
            ]
        },
        'T': {
            includes: ['_'],
            // tileConfig: [],
            tileConfig: [
                {
                    geometry: ['tree_01', 'tree_02', 'tree_03', 'tree_04'],
                    yShift: () => 0,
                    size: 2,
                    isWalkable: true,
                    facing: () => Math.random() * 360,
                }
            ]
        },
        'A': {
            // spawns: Cat,
            tileConfig: [
                {texture: 'asphalt', yShift: () => 0.05, isWalkable: true}
            ]
        },
        'B': {
            tileConfig : [
                {texture: 'beton_wall', yShift: () => 0.5, size: 1.1},
                ...repeat<TileConfig>({geometry: ['wall']}, 5),
            ]
        }
    }
}