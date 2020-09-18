import { Level, TileFormat } from "../../types";
import { Creature } from "../../classes/Creature";

export const DEMO_LEVEL: Level = {
    map: `
            T   TTT T T    TTT TT TTTTT T TTT T T TT    T TTT T T

        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
     T  w_____________________________________________________w   T
     T  w___L______________________________L__________________w T
     T  w_________________________________T___________________w
    TT  w_____________________T_______________________________w
    T   w_____________T_______________________________________w   T
    T wwwf_fffffffffffff_fffffffffffffffffffffffffffffffffffffwwww
     wAAAAAAAfAAAAAAAAAAAfAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAwT
     wAAAAAAAfAAAAAAAAAAAfAAAAAAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAw
     TwwwfffffwwwwAAAAAAAf_________________f__________________wwww
    T   w_____w  wfffAffff_________________f__________________wBBBBB
     T  w__T__wwww___Af____________________f__________________wBww
     T  w____________Af____________________f___________________B_w
     T  w____________Af______________T_____f_T_________________B_w
    TT  w____________Af____________T_TT_T_Wffff_ffffW_T________BBBBB
    T   w_______T_T__Af____T______________fAAAAAABBBf____________w  T
     T  w___T__T___T_Af___________________fAAAAAB  Bf____________w   T
     wwww____________Af_________@_________fAAAAAB  BfT___________w    T
     wAAAAAAAAAAAAAAAAf___________________fAAAAAB  Bf____________w
     wwww__________wwwwww_________________fAAAAAB  Bf____________w 
     T  w___T______f________________T_T___fAAAAAABBBf____________w
    T   w_____T____f____f_________________Wff_ffffffW___________w
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
            spawns: Creature,
            tileConfig: [],
        },
        'w': {
            tileConfig: [
                {texture: 'beton_wall'},
            ]
        },
        'L': {
            tileConfig: [
                {texture: 'lep', size: 15, format: TileFormat.SPRITE, yShift: 5},
            ]
        },
        'W': {
            includes: ['w'],
            tileConfig: [
                {texture: 'angel', format: TileFormat.SPRITE, size: 0.8, yShift: -0.2},
            ]
        },
        'f': {
            includes: ['_'],
            tileConfig: [
                {yShift: -2, texture: 'fence', format: TileFormat.SPRITE, size: 1},
            ]
        },
        '_': {
            tileConfig: [
                {isWalkable: true, texture: 'grass', yShift: -1},
                {yShift: -1.3, isWalkable: true, texture: 'tall_grass', format: TileFormat.SPRITE, size: 1},
            ]
        },
        'T': {
            includes: ['_'],
            tileConfig: [
                {texture: 'tree', yShift: 1.8, format: TileFormat.SPRITE, size: 10, isWalkable: true}
            ]
        },
        'A': {
            tileConfig: [
                {texture: 'asphalt', yShift: -0.95, isWalkable: true}
            ]
        },
        'B': {
            includes: ['w'],
            tileConfig : [
                {texture: 'window_old'},
                {texture: 'window_old'},
                {texture: 'window_old'},
                {texture: 'tall_grass', format: TileFormat.SPRITE, size: 0.85, yShift: -0.2},
            ]
        }
    }
}