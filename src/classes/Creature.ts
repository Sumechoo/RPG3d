import { Object3D, Vec2, Vector3, Quaternion } from "three";
import { IAnimated } from "../types";
import { approxVector3, setInMatrix } from "./utils";
import { LevelBuilder } from "./LevelBuilder";
import { Sprite } from "./Sprite";
import { IMAGE_ASSETS } from "../assets/images";
import { PathNode } from "./PathFinder";

export interface CreatureParams {
    body?: Object3D;
    supportRotation?: boolean;
    position: Vec2;
    level: LevelBuilder;
}

const dummy = new Vector3();

interface Candidate {
    old: Vec2;
    new: Vec2;
}

export class Creature extends Object3D implements IAnimated {
    protected _body: Object3D;
    protected _currentLevel: LevelBuilder;
    protected _supportRotation: boolean;
    protected _stepCandidate?: Candidate;

    private _pathToFollow: Array<PathNode> = [];

    constructor(params: CreatureParams) {
        super();

        this._currentLevel = params.level;
        this._body = params.body ?? new Sprite(new Vector3(), IMAGE_ASSETS.cat, 1);
        this._supportRotation = !!params.supportRotation;

        this.setPosition(params.position);

        document.addEventListener('sysStep', this.doStep);
    }

    public setStepCandidate({x, y}: Vec2) {
        if(!this._currentLevel.isTileWalkable(x,y)) {
            return false;
        }

        this._currentLevel.lockPosition(x, y);

        const oldX = this.position.x;
        const oldY = this.position.z;

        if(x === oldX && y === oldY) {
            return false;
        }

        this._stepCandidate = {
            new: {x, y},
            old: {x: oldX, y: oldY},
        };

        return true;
    }

    protected getPathNextNode = () => {
        const nextNode = this._pathToFollow[0];

        if(!nextNode) {
            return;
        }

        this._pathToFollow = this._pathToFollow.splice(1, this._pathToFollow.length);

        return nextNode;
    }

    protected findWayTo = (position: Vec2) => {
        this._pathToFollow = this._currentLevel.getPath({
            x: this.position.x,
            y: this.position.z,
        }, position);
    }

    protected prepareStepCandidate = () => {};

    protected doStep = () => {
        this._currentLevel.lockPosition(this.position.x, this.position.z);
        this.prepareStepCandidate();

        if (!this._stepCandidate) {
            return;
        }
        
        this.setPosition(this._stepCandidate.new);
    }

    public setPosition({x, y}: Vec2): boolean {
        const old = this._stepCandidate?.old ?? {x: 0, y: 0};

        this.position.set(x, this.position.y, y);
        this._currentLevel.unlockPosition(old.x, old.y);
        this._currentLevel.lockPosition(x, y);

        this._stepCandidate = undefined;

        return true;
    }

    public getBody = () => {
        return this._body;
    }

    public animate = () => {
        if(this._supportRotation) {
            const oldQ = new Quaternion();
            const q: Quaternion = new Quaternion();

            this.matrixWorld.decompose(dummy, q, dummy);
            this._body.matrixWorld.decompose(dummy, oldQ, dummy);

            this._body.rotation.setFromQuaternion(q.slerp(oldQ, Math.random()));
        }

        approxVector3(this._body.position, this.position, 4);
    }
}