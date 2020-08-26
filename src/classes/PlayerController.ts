import { Object3D, PerspectiveCamera, Vector3 } from "three";
import { degToRad } from "./utils";
import { LevelBuilder } from "./LevelBuilder";

const forward = new Vector3();

export class PlayerController extends Object3D {
    private _camera = new PerspectiveCamera(75, 2/1, 0.1, 1000);
    private _currentLevel: LevelBuilder;
    
    constructor(level: LevelBuilder) {
        super();

        this._currentLevel = level;

        document.addEventListener('keydown', (event) => {
            this._camera.getWorldDirection(forward);

            const newPositionCandidate = new Vector3(); 
            newPositionCandidate.copy(this.position);

            if(event.key === 'w') newPositionCandidate.add(forward);
            if(event.key === 's') newPositionCandidate.sub(forward);
            if(event.key === 'a') this.rotateY(degToRad(90));
            if(event.key === 'd') this.rotateY(degToRad(-90));

            if (this._currentLevel.isTileWalkable(newPositionCandidate.x, newPositionCandidate.z)) {
                this.position.copy(newPositionCandidate);
            }
        });

        this.add(this._camera);
    }

    public getCamera() {
        return this._camera;
    }
}