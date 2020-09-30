import { Level, TileConfig, TileFormat } from "../../types";
import {Cat} from '../../classes/mobs/Cat';
import { repeat } from "../../classes/utils";
import { GEOMETRY_RESOURCES } from "../../classes/LevelBuilder";

export const DEMO_LEVEL: Level = {
    map: `
            T   TTT T T    TTT TT TTTTT T TTT T T TT    T TTT T T

        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
     T  w_____________________________________________________w   T
     T  w___L______________________________L__________________w T
     T  w_________________________________T___________________w
    TT  w_____________________T_______________________________w
    T   w_____________T_______________________________________w   T
    T wwwF_FFFFFFFFFFFFF_FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFwwww
     wAAAAAAAAAAAAAAAAAAAAAAAAAAAA@AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwT
     wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw
     TwwwFFFFFwwwwAAAAAAAfFFFFFFFFFFFFFFFFFFFFFFFF_____AAAAAAAwwww
    T   w_____w  wFFFAFFFF_________________f___________AAAAAAAwBBBBB
     T  w__T__wwww___Af____________________f___________AAAAAAAwBww
     T  w____________Af____________________f___________AAAAAAAAB_w
     T  w____________Af______________T_____f_T_________________B_w
    TT  w____________Af____________T_TT_T_wFFFF_FFFFw_T________BBBBB
    T   w_______T_T__Af____T______________fAAAAAABBBf____________w  T
     T  w___T__T___T_Af____________T____T_fAAAAAB  Bf____________w   T
     wwww____________Af______________T__T_fAAAAAB  BfT___________w    T
     wAAAAAAAAAAAAAAAAf_____________T___T_fAAAAAB  Bf____________w
     wwww__________wwwwww_________T_____T_fAAAAAB  Bf____________w 
     T  w___T______f________________T_T_T_fAAAAAABBBf____________w
    T   w_____T____f____f_______________T_wFF_FFFFFFw___________w
     T  w__________f____f______________________f________________w  T
     T  w_______________f______________________f________________w  T
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
                {texture: 'beton_wall', yShift: () => 1},
            ]
        },
        'L': {
            tileConfig: [
                {texture: 'lep', size: 15, format: TileFormat.SPRITE, yShift: () => 4},
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
                        'bush',
                    ],
                    size: 0.12,
                    isHairy: true,
                    facing: () => Math.random() * 360,
                },
            ]
        },
        'T': {
            includes: ['_'],
            tileConfig: [
                {
                    geometry: ['tree_01', 'tree_02', 'tree_03'],
                    yShift: () => 1.8,
                    size: 6,
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
                ...repeat<TileConfig>({geometry: ['wall']}, 3),
            ]
        }
    }
}