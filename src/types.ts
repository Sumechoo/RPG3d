import { IMAGE_ASSETS } from "./assets/images";
import {GEOMETRY_RESOURCES} from './classes/LevelBuilder';
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
    geometry?: Array<keyof typeof GEOMETRY_RESOURCES>;
    format?: TileFormat;
    size?: number;
    facing?: () => number;
}

export interface IAnimated {
    animate: VoidFunction;
}

export interface GeometryParams {
    indices: number[];
    normals: number[];
    vertices: number[];
    uvs: number[];
}

export type Preparator = () => GeometryParams;