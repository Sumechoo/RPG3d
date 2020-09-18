import { Object3D, Vec2, Vector3 } from "three";
import { IAnimated } from "../types";
import { approxVector3, setInMatrix } from "./utils";
import { LevelBuilder } from "./LevelBuilder";
import { Sprite } from "./Sprite";
import { IMAGE_ASSETS } from "../assets/images";

export interface CreatureParams {
    body?: Object3D;
    supportRotation?: boolean;
    position: Vec2;
    level: LevelBuilder;
    positionMatrix: boolean[][];
}

export class Creature extends Object3D implements IAnimated {
    protected _body: Object3D;
    protected _currentLevel: LevelBuilder;

    protected _supportRotation: boolean;

    private _positionMatrixRef: boolean[][] = [];

    constructor(params: CreatureParams) {
        super();

        this._currentLevel = params.level;
        this._body = params.body ?? new Sprite(new Vector3(), IMAGE_ASSETS.cat, 1);
        this._supportRotation = !!params.supportRotation;
        this._positionMatrixRef = params.positionMatrix;

        this.lockPosition(params.position.x, params.position.y);
        this.setPosition(params.position, true);
    }

    public setPosition({x, y}: Vec2, force = false, log = false): boolean {
        if(!this._currentLevel.isTileWalkable(x,y, log) && !force) {
            return false;
        }

        const oldX = this.position.x;
        const oldY = this.position.z;

        this.lockPosition(x, y);
        this.position.set(x, this.position.y, y);
        this.unlockPosition(oldX, oldY);

        return true;
    }

    private lockPosition = (x: number, y: number) => {
        setInMatrix(x, y, false, this._positionMatrixRef);
    }

    private unlockPosition = (x: number, y: number) => {
        setInMatrix(x, y, true, this._positionMatrixRef);
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