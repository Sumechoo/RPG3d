import wall_stone from './wall_stone.png';
import floor_stone from './floor_stone.png';
import floor_wood from './floor_wood.jpg';
import brick_wall from './brick_wall.jpg';
import window_old from './window_old.jpg';
import grass from './grass.jpeg';
import tall_grass from './tall_grass.png';
import tree from './tree.png';
import fence from './fence.png';
import angel from './angel.png';
import beton_wall from './beton_wall.png';
import asphalt from './asphalt.jpg';
import lep from './lep.png';
import arrow from './arrow.png';
import { TextureLoader, MeshStandardMaterial, SpriteMaterial } from 'three';

const loader = new TextureLoader();

const createTexture = (t: string, transparent = false) => {
    const texture = loader.load(t);

    return new MeshStandardMaterial({
        map: texture,
        transparent,
    });
}

const createSprite = (t: string) => {
    const texture = loader.load(t);

    return new SpriteMaterial({map: texture, transparent: true});
}

export const IMAGE_ASSETS = {
    'wall_stone': createTexture(wall_stone),
    'floor_stone': createTexture(floor_stone),
    'brick_wall': createTexture(brick_wall),
    'floor_wood': createTexture(floor_wood),
    'window_old': createTexture(window_old),
    'grass': createTexture(grass),
    'asphalt': createTexture(asphalt),
    'beton_wall': createTexture(beton_wall),

    'tree': createSprite(tree),
    'angel': createSprite(angel),
    'lep': createSprite(lep),
    'fence': createSprite(fence),
    'tall_grass': createSprite(tall_grass),
    'arrow': createSprite(arrow),
}
