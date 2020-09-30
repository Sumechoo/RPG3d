import { Vec2, Vector3 } from "three";
import { PathNode } from "./PathFinder";

export const degToRad = (deg: number) => deg * (Math.PI/180);

export const getInMatrix = <T>(x: number, y: number, matrix: T[][]): T | undefined => {
    x = Math.round(x);
    y = Math.round(y);
    
    return matrix[x] ? matrix[x][y] : undefined;
}

export const setInMatrix = <T>(x: number, y: number, value: T, matrix: T[][]) => {
    x = Math.round(x);
    y = Math.round(y);
    
    if (matrix[x]) {
        matrix[x][y] = value;
    } else {
        const array = [];
        array[y] = value;

        matrix[x] = array;
    }
}

export const repeat = <T>(thing: T, times = 1): T[] => {
    const repeated: T[] = [];
    
    for(let i = 0; i < times; i++) {
        repeated.push(thing);
    }

    return repeated;
}

export const toVector3 = (position: Vec2): Vector3 => {
    // берем ху з аргумєнта позішон
    const {x, y} = position;
    
    // вертаєм новосозданий вектор з цими каардінатами
    return new Vector3(x, 0, y);
}

export const approxVector3 = (a: Vector3, b: Vector3, speed = 5) => {
    a.x += (b.x - a.x) / speed;
    a.z += (b.z - a.z) / speed;
}

export function matrixToNodes (matrix: boolean[][]) {
    const nodes: Array<PathNode> = [];
    const height = matrix.length;
    let width = -1;

    matrix.forEach(({length}) => width = width < length ? length : width);

    for(let x = 0; x < height; x++) {
        for(let y = 0; y < width; y++) {
            nodes.push({
                position: {x, y},
                walkable: !!getInMatrix(x, y, matrix),
            });
        }
    }

    return nodes;
}