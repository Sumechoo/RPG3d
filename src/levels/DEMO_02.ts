import { GeometryResourcesMap, Level, TileConfig } from "../types";
import { repeat } from "../classes/utils";
import { DEMO_01 } from "./DEMO_01";

export const DEMO_02: Level = {
    map: `
           T   TTT T T    TTT TT TTTTT T TTT T T TT    T TTT T T
                                                            w
        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwpww
     T  w___________T_________TT____T________T___T___TTT____p__w   T
    T   w_______cccccccccccccccccccccccccccccccccccccccccc__p__w   T
     T  w__TT___cccccccccccccccccccccccccccccccccccccccccc__p__w   T
     T  w_TTT___cccccccccccccccccccccccccccccccccccccccccc__p__w   T
        wTTT____cccccccccccccccccccccccccccccccccccccccccc__p__w    
        w_______cccccccccccccccccccccccccccccccccccccccccc__p__w   T
     T  w_______cccccccccccccccccccccccccccccccccccccccccc__p__w   T
        w_ppppppppppppppppppppppppppppppppppppppppppppppppppp__w   T
     T  w_p_____cccccccccccccccccccccccccccccccccccccccccc_____w      T
     T  w_p_____cccccccccccccccccccccccccccccccccccccccccc_____w   T
     T  w_p_____cccccccccccccccccccccccccccccccccccccccccc_____w   T
     T  wFpFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFwww
        EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT
     T  w_______________________________________________________w  T
        wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
      TT        
    TTTTTT  TTTTTTTT   TTTT TTTTT TTTTTTTTT   TTT   TTT  T T TTT TT T

    L                   L                       L                   L   
    `,
    configs: {
        D: {
            // For debug purpose only
            includes: ['_'],
            tileConfig: [],
            action: function (position) {
                console.info('Debug position:', position);
            }
        },
        E: {
            includes: ['w'],
            tileConfig: [],
            action: function () {
                this.getRenderer().changeLevel(DEMO_01, {spawnPosition: {x: 7, y: 63}});
            }
        },
        c: {
            // includes: ['_'],
            tileConfig: [
                {geometry: ['dirt']},
                {geometry: ['corn'], isWalkable: true, facing: () => Math.random() * 360},
                {
                    isHairy: true,
                    size: 0.05,
                    isWalkable: true,
                    yShift: () => -1.5,
                    geometry: [
                        ...repeat<keyof GeometryResourcesMap>('grass_01', 30),
                        ...repeat<keyof GeometryResourcesMap>('grass_02', 30),
                    ],
                }
            ],
        },
        '@': {
            includes: ['A'],
            tileConfig: [],
        },
        'w': {
            tileConfig: [
                {geometry: ['asphalt'], yShift: () => .2, size: 1.1},
                {geometry: ['asphalt']},
            ]
        },
        'L': {
            includes: ['_'],
            tileConfig: [],
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
                {isWalkable: true, geometry: ['dirt'], yShift: () => Math.random() / 8},
                {
                    yShift: () => -0.4,
                    isWalkable: true,
                    geometry: [
                        ...repeat<keyof GeometryResourcesMap>('grass_01', 30),
                        ...repeat<keyof GeometryResourcesMap>('grass_02', 30),
                        ...repeat<keyof GeometryResourcesMap>('grass_03', 10),
                        ...repeat<keyof GeometryResourcesMap>('grass_04', 2),
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
                {geometry: ['dirt'], isWalkable: true},
                {
                    isHairy: true,
                    size: 0.08,
                    isWalkable: true,
                    yShift: () => -0.5,
                    geometry: [
                        ...repeat<keyof GeometryResourcesMap>('grass_01', 30),
                        ...repeat<keyof GeometryResourcesMap>('grass_02', 30),
                    ],
                },
            ]
        },
        'T': {
            includes: ['_'],
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
            tileConfig: [
                {geometry: ['asphalt'], yShift: () => 0.05, isWalkable: true}
            ]
        },
        'B': {
            tileConfig : [
                {geometry: ['asphalt'], yShift: () => 0.5, size: 1.1},
                ...repeat<TileConfig>({geometry: ['wall']}, 5),
            ]
        }
    }
}