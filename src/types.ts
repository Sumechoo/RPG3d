import { IMAGE_ASSETS } from "./assets/images";

export interface Level {
    map: string;
    configs: Record<string, Array<TileConfig>>;
}

export interface TileConfig {
    isWalkable?: boolean;
    yShift?: number;
    texture?: keyof typeof IMAGE_ASSETS;
}