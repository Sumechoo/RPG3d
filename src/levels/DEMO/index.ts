import { Level, TileFormat } from "../../types";

export const DEMO_LEVEL: Level = {
    map: `
            T   TTT T T    TTT TT TTTTT T TTT T T TT    T TTT T T

        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
     T  w_____________________________________________________w   T
     T  w___L______________________________L__________________w T
     T  w_________________________________T___________________w
    TT  w_____________________T_______________________________w
    T   w_____________T_______________________________________w   T
    T wwwfffffffffffffffffffffffffffffffffffffffffffffffffffffwwww
     wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwT
     wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAw
     TwwwfffffwwwwAAAAAAAf________@___________________________wwww
    T   w_____w  wfffAffff____________________________________w
     T  w__T__wwww___A________________________________________wwww
     T  w____________A___________________________________________w
     T  w____________A_______________T_______T___________________w
    TT  w____________A_____________T_TT_T_fffffffffff_T__________w T
    T   w_______T_T__A_____T______________fAAAAAABBBf____________w  T
     T  w___T__T___T_A____________________fAAAAAB  Bf____________w   T
     wwww____________A____________________WAAAAAB  BfT___________w    T
     wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfAAAAAB  Bf____________w
     wwww_________________________________WAAAAAB  Bf____________w 
     T  w___T______TT_____T_________T_T___fAAAAAABBBf____________w
    T   w_____T_________T_________________fffffffffff___________w
     T  w_______________________________________________________w  T
     T  w_______________________________________________________w  T
        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
      TT        
    TTTTTT  TTTTTTTT   TTTT TTTTT TTTTTTTTT   TTT   TTT  T T TTT TT T

    L                   L                       L                   L   
    `,
    configs: {
        '@': [
            {yShift: -1, isWalkable: true, texture: 'grass'},
        ],
        'w': [
            {texture: 'beton_wall'},
        ],
        'L': [
            {texture: 'lep', size: 15, format: TileFormat.SPRITE, yShift: 5},
        ],
        'W': [
            {texture: 'beton_wall', yShift: -0.5},
            {texture: 'angel', format: TileFormat.SPRITE, size: 0.6, yShift: -0.8},
        ],
        'f': [
            {isWalkable: true, texture: 'grass', yShift: -1},
            {yShift: -1.2, texture: 'fence', format: TileFormat.SPRITE, size: 1},
        ],
        '_': [
            {isWalkable: true, texture: 'grass', yShift: -1},
            {yShift: -1.2, isWalkable: true, texture: 'tall_grass', format: TileFormat.SPRITE, size: 1},
        ],
        'T': [
            {isWalkable: true, texture: 'grass', yShift: -1},
            {texture: 'tree', yShift: 1.8, format: TileFormat.SPRITE, size: 7, isWalkable: true}
        ],
        'A': [
            {texture: 'asphalt', yShift: -0.95, isWalkable: true}
        ],
        'B': [
            {texture: 'beton_wall'},
            {texture: 'window_old'},
            {texture: 'window_old'},
        ]
    }
}