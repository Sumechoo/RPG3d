import { Object3D, Vec2 } from "three";
import { IAnimated } from "../types";
import { approxVector3 } from "./utils";

interface CreatureParams {
    body: Object3D;
}

export class Creature extends Object3D implements IAnimated {
    private _body: Object3D;

    constructor(params: CreatureParams) {
        super();

        this._body = params.body;
    }

    public setPosition({x, y}: Vec2) {
        this.position.set(x, this.position.y, y);        
    }

    public animate = () => {
        this._body.rotation.copy(this.rotation);
        approxVector3(this._body.position, this.position, 6);
    }
}