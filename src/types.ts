import { IMAGE_ASSETS } from "./assets/images";

export interface PartConfig {
    includes?: Array<string>;
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
    yShift?: number;
    texture?: keyof typeof IMAGE_ASSETS;
    format?: TileFormat;
    size?: number;
}