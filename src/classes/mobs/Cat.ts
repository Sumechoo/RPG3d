import { Vector3 } from "three";
import { IMAGE_ASSETS } from "../../assets/images";
import { Creature, CreatureParams } from "../Creature";
import { Sprite } from "../Sprite";

export class Cat extends Creature {
    constructor(params: CreatureParams) {
        super({
            ...params,
            body: new Sprite(new Vector3(), IMAGE_ASSETS.cat, 1),
        });
    }

    protected prepareStepCandidate = () => {
        const nextNode = this.getPathNextNode();

        if(!(nextNode && this.setStepCandidate(nextNode.position))) {
            // this.findWayTo({x: 7, y: 16});
        }
    }
}