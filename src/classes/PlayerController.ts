import { PerspectiveCamera, Vector3, Vec2, SpotLight } from "three";
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
        this._supportRotation = true;

        document.addEventListener('keydown', this.listenKeys);
    }

    private listenKeys = (event: KeyboardEvent) => {
        this._camera.getWorldDirection(forward);
        this._camera.updateProjectionMatrix();

        const newPositionCandidate = new Vector3(); 
        newPositionCandidate.copy(this.position);

        if(event.key === 'w') newPositionCandidate.add(forward);
        if(event.key === 's') newPositionCandidate.sub(forward);
        if(event.key === 'a') this.rotateY(degToRad(90));
        if(event.key === 'd') this.rotateY(degToRad(-90));
        if(event.key === 'e') {
            const at = newPositionCandidate.add(forward);

            this._currentLevel.callActionAt({x: at.x, y: at.z});
        }

        this._newPositionCandidate = newPositionCandidate;

        document.dispatchEvent(StepEvent);
    }

    protected prepareStepCandidate = () => {
        if(!this._newPositionCandidate) {
            return;
        }

        this.setStepCandidate({x: this._newPositionCandidate.x, y: this._newPositionCandidate.z});
    }

    public dispose() {
        document.removeEventListener('keydown', this.listenKeys);
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