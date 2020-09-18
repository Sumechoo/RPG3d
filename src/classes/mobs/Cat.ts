import { Vector3 } from "three";
import { IMAGE_ASSETS } from "../../assets/images";
import { Creature, CreatureParams } from "../Creature";
import { Sprite } from "../Sprite";

let count = 0;

export class Cat extends Creature {
    constructor(params: CreatureParams) {
        super({
            ...params,
            body: new Sprite(new Vector3(), IMAGE_ASSETS.cat, 1),
        });

        count++;

        this.Exp_RANDOM_MOVE();

    }

    private Exp_RANDOM_MOVE = () => {
        const vertical = Math.random() > 0.5;
        const negate = Math.random() > 0.5;

        let shift = Math.ceil((Math.random() * 2)) - 1;

        if(negate) {
            shift = shift * -1;
        }

        if(vertical) {
            this.setPosition({x: this.position.x, y: this.position.z + shift});
        } else {
            this.setPosition({x: this.position.x + shift, y: this.position.z});
        }

        setTimeout(this.Exp_RANDOM_MOVE, 500);
    }
}