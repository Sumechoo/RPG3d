import { Object3D, BoxGeometry, Mesh, Vector3, Material } from "three";

export class Block extends Object3D {
    private _geometry: BoxGeometry;
    private _mesh: Mesh;
    
    constructor(position: Vector3, texture: Material) {
        super();

        this._geometry = new BoxGeometry(1,1,1);
        this._mesh = new Mesh(this._geometry, texture);

        this.position.copy(position);

        this.add(this._mesh);
    }

    public dispose() {
        this._geometry.dispose();
    }
}