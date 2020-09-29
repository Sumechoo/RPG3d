import {Object3D, Vector3, Mesh, Material, InstancedBufferGeometry, InstancedMesh, Matrix4, Quaternion, Float32BufferAttribute, Euler} from 'three';
import { degToRad } from './utils';

export class Sprite extends Object3D {   
    public _bufferMesh: Mesh;
    
    constructor(position: Vector3, texture: Material, size = 1, facing = 0) {
        super();

        const buffer = new InstancedBufferGeometry();

        const width = 1;
		const height = 1;

		const width_half = width / 2;
		const height_half = height / 2;

		const gridX = Math.floor( 1 );
		const gridY = Math.floor( 1 );

		const gridX1 = gridX + 1;
		const gridY1 = gridY + 1;

		const segment_width = width / gridX;
		const segment_height = height / gridY;

		// buffers

		const indices:  Array<number> = [];
		const vertices:  Array<number> = [];
		const normals:  Array<number> = [];
		const uvs: Array<number> = [];

		// generate vertices, normals and uvs

		for ( let iy = 0; iy < gridY1; iy ++ ) {

			const y = iy * segment_height - height_half;

			for ( let ix = 0; ix < gridX1; ix ++ ) {

				const x = ix * segment_width - width_half;

				vertices.push( x, - y, 0 );

				normals.push( 0, 0, 1 );

				uvs.push( ix / gridX );
				uvs.push( 1 - ( iy / gridY ) );

			}

		}

		// indices

		for ( let iy = 0; iy < gridY; iy ++ ) {

			for ( let ix = 0; ix < gridX; ix ++ ) {

				const a = ix + gridX1 * iy;
				const b = ix + gridX1 * ( iy + 1 );
				const c = ( ix + 1 ) + gridX1 * ( iy + 1 );
				const d = ( ix + 1 ) + gridX1 * iy;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );
			}
        }
        
        var instances = 1;

        buffer.setDrawRange(0, 10000);

        const sprite = new InstancedMesh(buffer, texture, instances);

        var matrix = new Matrix4();
        var offset = new Vector3();
        var orientation = new Quaternion();
        var scale = new Vector3( size, size, size );

        for ( var i = 0; i < instances; i ++ ) {
            const {x, y, z} = position;
            offset.set( x,y,z );

            orientation.setFromEuler(new Euler(0, degToRad(facing), 0));
            orientation.set( orientation.x, orientation.y, orientation.z, orientation.w ).normalize();

            matrix.compose( offset, orientation, scale );
            sprite.setMatrixAt( i, matrix );
        }

        buffer.setIndex( indices );
		buffer.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ) );
		buffer.setAttribute( 'normal', new Float32BufferAttribute( normals, 3 ) );
		buffer.setAttribute( 'uv', new Float32BufferAttribute( uvs, 2 ) );

        sprite.instanceMatrix.needsUpdate = true;

        this._bufferMesh = sprite;

        this.add(sprite);
    }
}