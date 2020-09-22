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
        const vertical = Math.random() > 0.5;
        const negate = Math.random() > 0.5;

        let shift = Math.ceil(Math.random() - 0.5);

        if(negate) {
            shift = shift * -1;
        }

        if(vertical) {
            this.setStepCandidate({x: this.position.x, y: this.position.z + shift});
        } else {
            this.setStepCandidate({x: this.position.x + shift, y: this.position.z});
        }
    }
}