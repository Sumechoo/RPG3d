import {Object3D, Vector3, Mesh, Material, InstancedBufferGeometry, InstancedMesh, Matrix4, Quaternion, Float32BufferAttribute, Euler, Vec2, MeshDepthMaterial, MeshBasicMaterial, RGBADepthPacking, MeshPhysicalMaterial, PlaneGeometry} from 'three';
import { PreparePlaneGeomentry } from './GeometryPreparators';
import { degToRad } from './utils';

export class InstancedGeometry extends Object3D {   
	public _bufferMesh: InstancedMesh;

	private _bufferedGeometry: InstancedBufferGeometry;
	private _indices: Array<number>;
	private _verticles: Array<number>;
	private _normals: Array<number>;
	private _uvs: Array<number>;
	private _cross: boolean;

	private _instanceCount = 0;

	private _size: number;

    constructor(texture: any, size = 1, count = 200, cross = false, shadow = true, preparator = PreparePlaneGeomentry) {
        super();

		const buffer = new InstancedBufferGeometry();

		this._size = size;
		this._bufferedGeometry = buffer;
		this._cross = cross;
        
		var instances = 1;
		
		const {
			indices,
			normals,
			uvs,
			vertices,
		} = preparator();

		this._indices = indices;
		this._normals = normals;
		this._uvs = uvs;
		this._verticles = vertices;

        const sprite = new InstancedMesh(buffer, texture, count);

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

		sprite.receiveShadow = true;
		sprite.castShadow = shadow;

		sprite.customDepthMaterial = new MeshDepthMaterial({
			map: texture.map,
			depthPacking: RGBADepthPacking,
			alphaTest: 0.3,
		});
		
        this._bufferMesh = sprite;
        this._bufferMesh.instanceMatrix.needsUpdate = true;

        this.add(sprite);
	}

	public dispose = () => {
		this._instanceCount = 0;
		this._bufferedGeometry.dispose();
	}

	public addInstance = (at: Vector3, size = 1, facing = 0) => {

		size = Math.max(size, this._size);

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

		if (this._cross) {
			orientation.setFromEuler(new Euler(0, degToRad(facing + 90), 0));
			orientation.set( orientation.x, orientation.y, orientation.z, orientation.w ).normalize();
			matrix.compose( offset, orientation, scale );	
		
			this._bufferMesh.setMatrixAt( this._instanceCount + 1, matrix );
        	this._bufferMesh.instanceMatrix.needsUpdate = true;
		}

		this._instanceCount += this._cross ? 2 : 1;
	}
	
	public finalize = () => {
        this._bufferedGeometry.setIndex( this._indices );
		this._bufferedGeometry.setAttribute( 'position', new Float32BufferAttribute( this._verticles, 3 ) );
		this._bufferedGeometry.setAttribute( 'normal', new Float32BufferAttribute( this._normals, 3 ) );
		this._bufferedGeometry.setAttribute( 'uv', new Float32BufferAttribute( this._uvs, 2 ) );

		this._bufferMesh.instanceMatrix.needsUpdate = true;		
	}
}