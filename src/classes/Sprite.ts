import {Sprite as SpriteParent, Object3D, Vector3, SpriteMaterial, PlaneGeometry, Mesh, Material, MeshStandardMaterial, BufferGeometry} from 'three';
import { degToRad } from './utils';

export class Sprite extends Object3D {    
    constructor(position: Vector3, texture: MeshStandardMaterial, size = 1, facing = 0) {
        super();

        const geometry = new PlaneGeometry(size, size, 1, 1);
        const sprite = new Mesh(geometry, texture);
        const buffer = new BufferGeometry();

        buffer.setFromObject(sprite);

        // buffer.

        this.position.copy(position);
        this.rotateY(degToRad(facing));

        this.add(sprite);
    }
}