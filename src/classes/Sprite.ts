import {Sprite as SpriteParent, Object3D, Vector3, SpriteMaterial} from 'three';

export class Sprite extends Object3D {    
    constructor(position: Vector3, texture: SpriteMaterial, size = 2) {
        super();

        const sprite = new SpriteParent(texture);

        sprite.scale.set(size, size, size);

        this.position.copy(position);

        this.add(sprite);
    }
}