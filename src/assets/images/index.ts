import wall_stone from './wall_stone.png';
import floor_stone from './floor_stone.png';
import floor_wood from './floor_wood.jpg';
import brick_wall from './brick_wall.jpg';
import window_old from './window_old.jpg';
import grass from './grass.png';
import actual_grass from './forest_floor.png';
import tall_grass from './tall_grass.png';
import tall_grass_02 from './tall_grass2.png';
import tall_grass_03 from './tall_grass3.png';
import tall_grass_04 from './tall_grass4.png';
import tree from './tree.png';
import tree2 from './tree2.png';
import tree3 from './tree3.png';
import fence from './fence.png';
import angel from './angel.png';
import beton_wall from './beton_wall.png';
import asphalt from './asphalt.jpg';
import lep from './lep.png';
import arrow from './arrow.png';
import cat from './cat.png';
import bush from './bush.png';
import bush2 from './bush2.png';
import stone from './stone.png';
import { TextureLoader, MeshStandardMaterial, NearestFilter, DoubleSide, MeshBasicMaterial, MeshPhysicalMaterial } from 'three';

const loader = new TextureLoader();

const createTexture = (t: string) => {
    const texture = loader.load(t);

    return new MeshPhysicalMaterial({
        map: texture,
        bumpMap: texture,
        bumpScale: 0.1,
        roughnessMap: texture,
    });
}

const createSprite = (t: string) => {
    const texture = loader.load(t);
    texture.flipY = true;
    texture.anisotropy = 8;

    return new MeshPhysicalMaterial({
        map: texture,
        alphaMap: texture,
        alphaTest: 0.09,
        side: DoubleSide,
        dithering: true,
    });
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
    actual_grass: createTexture(actual_grass),


    'tree': createSprite(tree),
    'tree2': createSprite(tree2),
    'tree3': createSprite(tree3),
    bush: createSprite(bush),
    bush2: createSprite(bush2),
    'angel': createSprite(angel),
    'lep': createSprite(lep),
    'fence': createSprite(fence),
    'tall_grass': createSprite(tall_grass),
    'tall_grass_02': createSprite(tall_grass_02),
    'tall_grass_03': createSprite(tall_grass_03),
    'tall_grass_04': createSprite(tall_grass_04),
    'arrow': createSprite(arrow),
    'cat': createSprite(cat),
    'stone': createSprite(stone),
}
