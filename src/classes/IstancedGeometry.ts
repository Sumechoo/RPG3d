import {Object3D, Vector3, Mesh, Material, InstancedBufferGeometry, InstancedMesh, Matrix4, Quaternion, Float32BufferAttribute, Euler, Vec2} from 'three';
import { degToRad } from './utils';

export class InstancedGeometry extends Object3D {   
	public _bufferMesh: InstancedMesh;

	private _bufferedGeometry: InstancedBufferGeometry;
	private _indices: Array<number>;
	private _verticles: Array<number>;
	private _normals: Array<number>;
	private _uvs: Array<number>;

	private _instanceCount = 0;

    constructor(texture: Material, size = 1, facing = 0) {
        super();

		const buffer = new InstancedBufferGeometry();
		
        buffer.setDrawRange(0, 10000);
		this._bufferedGeometry = buffer;

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

		this._indices = [];
		this._verticles = [];
		this._normals = [];
		this._uvs = [];

		// generate vertices, normals and uvs

		for ( let iy = 0; iy < gridY1; iy ++ ) {

			const y = iy * segment_height - height_half;

			for ( let ix = 0; ix < gridX1; ix ++ ) {

				const x = ix * segment_width - width_half;

				this._verticles.push( x, - y, 0 );

				this._normals.push( 0, 0, 1 );

				this._uvs.push( ix / gridX );
				this._uvs.push( 1 - ( iy / gridY ) );

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

				this._indices.push( a, b, d );
				this._indices.push( b, c, d );
			}
        }
        
        var instances = 1;

        const sprite = new InstancedMesh(buffer, texture, 100000);

        var matrix = new Matrix4();
        var offset = new Vector3();
        var orientation = new Quaternion();
        var scale = new Vector3( size, size, size );

        for ( var i = 0; i < instances; i ++ ) {
            offset.set( 
				Math.random() * 20 - 10,
				-0.4,
				Math.random() * 20 - 10,
			);

            orientation.setFromEuler(new Euler(0, degToRad(Math.random() * 360), 0));
            orientation.set( orientation.x, orientation.y, orientation.z, orientation.w ).normalize();

            matrix.compose( offset, orientation, scale );
            sprite.setMatrixAt( i, matrix );
		}
		
        this._bufferMesh = sprite;
        this._bufferMesh.instanceMatrix.needsUpdate = true;

        this.add(sprite);
	}

	public addInstance = (at: Vector3, size = 1, facing = 0) => {
		var matrix = new Matrix4();
        var offset = new Vector3();
        var orientation = new Quaternion();
        var scale = new Vector3( size, size, size );

		const {x, y, z} = at;
		offset.set(x, y, z);

		orientation.setFromEuler(new Euler(0, degToRad(facing), 0));
		orientation.set( orientation.x, orientation.y, orientation.z, orientation.w ).normalize();

		matrix.compose( offset, orientation, scale );
		this._bufferMesh.setMatrixAt( this._instanceCount, matrix );

        this._bufferMesh.instanceMatrix.needsUpdate = true;

		this._instanceCount++;
	}
	
	public finalize = () => {
        this._bufferedGeometry.setIndex( this._indices );
		this._bufferedGeometry.setAttribute( 'position', new Float32BufferAttribute( this._verticles, 3 ) );
		this._bufferedGeometry.setAttribute( 'normal', new Float32BufferAttribute( this._normals, 3 ) );
		this._bufferedGeometry.setAttribute( 'uv', new Float32BufferAttribute( this._uvs, 2 ) );

        this._bufferMesh.instanceMatrix.needsUpdate = true;
	}
}