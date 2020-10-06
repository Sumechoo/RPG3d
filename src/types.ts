import {GEOMETRY_RESOURCES, LevelBuilder} from './classes/LevelBuilder';
import { Creature } from "./classes/Creature";
import { Vec2 } from 'three';

export type LevelAction = (this: LevelBuilder, position: Vec2) => void;

export interface PartConfig {
    includes?: Array<string>;
    spawns?: typeof Creature;
    tileConfig: Array<TileConfig>;
    action?: LevelAction;
}

export interface LevelParams {
    spawnPosition?: Vec2;
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
    geometry?: Array<keyof typeof GEOMETRY_RESOURCES>;
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