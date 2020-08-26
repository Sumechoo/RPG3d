import { Vector3 } from "three";

export const degToRad = (deg: number) => deg * (Math.PI/180);

export const getInMatrix = <T>(x: number, y: number, matrix: T[][]): T | undefined => {
    x = Math.round(x);
    y = Math.round(y);
    
    if(matrix[x]) {
        return matrix[x][y];
    }
}

export const setInMatrix = <T>(x: number, y: number, value: T, matrix: T[][]) => {
    if (matrix[x]) {
        matrix[x][y] = value;
    } else {
        const array = [];
        array[y] = value;

        matrix[x] = array;
    }
}

export const approxVector3 = (a: Vector3, b: Vector3, speed = 5) => {
    a.x += (b.x - a.x) / speed;
    a.z += (b.z - a.z) / speed;
}