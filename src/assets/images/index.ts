import wall_stone from './wall_stone.png';
import floor_stone from './floor_stone.png';
import floor_wood from './floor_wood.jpg';
import brick_wall from './brick_wall.jpg';
import window_old from './window_old.jpg';
import bodia from './bodia.jpg';
import asphalt from './asphalt.jpg';
import { TextureLoader, MeshBasicMaterial } from 'three';

const loader = new TextureLoader();

const createTexture = (t: string, transparent = false) => {
    const texture = loader.load(t);

    return new MeshBasicMaterial({
        map: texture,
        transparent,
    });
}

export const IMAGE_ASSETS = {
    'wall_stone': createTexture(wall_stone),
    'floor_stone': createTexture(floor_stone),
    'brick_wall': createTexture(brick_wall),
    'floor_wood': createTexture(floor_wood),
    'window_old': createTexture(window_old),
    'bodia': createTexture(bodia),
    'asphalt': createTexture(asphalt),
}
