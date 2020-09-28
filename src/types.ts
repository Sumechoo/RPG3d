import { IMAGE_ASSETS } from "./assets/images";
import { Creature } from "./classes/Creature";

export interface PartConfig {
    includes?: Array<string>;
    spawns?: typeof Creature;
    tileConfig: Array<TileConfig>;
}

export interface Level {
    map: string;
    configs: Record<string, PartConfig>;
}

export enum TileFormat {
    BLOCK,
    SPRITE,
}

export interface TileConfig {
    isWalkable?: boolean;
    isHairy?: boolean;
    yShift?: () => number;
    texture?: keyof typeof IMAGE_ASSETS;
    format?: TileFormat;
    size?: number;
    facing?: () => number;
}

export interface IAnimated {
    animate: VoidFunction;
}