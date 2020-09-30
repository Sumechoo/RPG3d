import { PerspectiveCamera, Vector3, Vec2 } from "three";
import { degToRad } from "./utils";
import { Creature, CreatureParams } from "./Creature";
import { StepEvent } from "./Stepper";

const forward = new Vector3();

export class PlayerController extends Creature {
    private _camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 60);
    private _newPositionCandidate?: Vector3;
    
    constructor(params: CreatureParams) {
        super({...params});

        this._body = this._camera;

        document.addEventListener('keydown', (event) => {
            this._camera.getWorldDirection(forward);
            this._camera.updateProjectionMatrix();

            const newPositionCandidate = new Vector3(); 
            newPositionCandidate.copy(this.position);

            if(event.key === 'w') newPositionCandidate.add(forward);
            if(event.key === 's') newPositionCandidate.sub(forward);
            if(event.key === 'a') this.rotateY(degToRad(90));
            if(event.key === 'd') this.rotateY(degToRad(-90));

            this._newPositionCandidate = newPositionCandidate;

            document.dispatchEvent(StepEvent);
        });

        this._supportRotation = true;
    }

    protected prepareStepCandidate = () => {
        if(!this._newPositionCandidate) {
            return;
        }

        this.setStepCandidate({x: this._newPositionCandidate.x, y: this._newPositionCandidate.z});
    }

    public getCamera() {
        return this._camera;
    }

    protected interact = (target: Creature) => {
        if(target === this) {
            return;
        }

        target.applyDamage(1000);
    }
}