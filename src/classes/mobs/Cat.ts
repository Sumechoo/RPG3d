import { Vector3 } from "three";
import { IMAGE_ASSETS } from "../../assets/images";
import { Creature, CreatureParams } from "../Creature";
import { PathNode } from "../PathFinder";
import { Sprite } from "../Sprite";

export class Cat extends Creature {
    private _nextPathNode?: PathNode;

    constructor(params: CreatureParams) {
        super({
            ...params,
            body: new Sprite(new Vector3(), IMAGE_ASSETS.cat, 1),
        });
    }

    protected prepareStepCandidate = () => {
        this._nextPathNode = this.getPathNextNode();

        if(this._nextPathNode) {
            if(!this.setStepCandidate(this._nextPathNode.position)) {
                this._nextPathNode = undefined;
            }
        } else {
            this.findWayTo({x: 7, y: 16});
        }
    }
}