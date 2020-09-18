import { Object3D, Vec2, Vector3 } from "three";
import { IAnimated } from "../types";
import { approxVector3 } from "./utils";
import { LevelBuilder } from "./LevelBuilder";
import { Sprite } from "./Sprite";
import { IMAGE_ASSETS } from "../assets/images";

export interface CreatureParams {
    body?: Object3D;
    supportRotation?: boolean;
    position: Vec2;
    level: LevelBuilder;
}

export class Creature extends Object3D implements IAnimated {
    protected _body: Object3D;
    protected _currentLevel: LevelBuilder;

    protected _supportRotation: boolean;

    constructor(params: CreatureParams) {
        super();

        this.setPosition(params.position);

        this._currentLevel = params.level;
        this._body = params.body ?? new Sprite(new Vector3(), IMAGE_ASSETS.arrow, 1);
        this._supportRotation = !!params.supportRotation;
    }

    public setPosition({x, y}: Vec2) {
        this.position.set(x, this.position.y, y);
    }

    public getBody = () => {
        return this._body;
    }

    public animate = () => {
        if(this._supportRotation) {
            this._body.rotation.copy(this.rotation);
        }
        approxVector3(this._body.position, this.position, 6);
    }
}