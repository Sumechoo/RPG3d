import { WebGL1Renderer, Scene, FogExp2, Object3D, PerspectiveCamera, Vector3, Quaternion, DirectionalLight, AmbientLight } from "three";
import { ItemsMap } from "../levels/Items";
import { LevelBuilder } from "./LevelBuilder";
import { approxVector3 } from "./utils";
import { DEMO_LEVEL } from "../levels/DEMO";

const dummy = new Vector3();

const level = DEMO_LEVEL;

export class MainRenderer extends WebGL1Renderer {
  private _scene: Scene;
  private _camera = new PerspectiveCamera(75, 2/1, 0.1, 1000);
  private _cameraTarget?: Object3D;

  constructor() {
    super();

    this._scene = new Scene();
    this._scene.fog = new FogExp2(0x999999, 0.1);

    this._camera.position.z = 5;
    this._camera.position.x = 2;

    this.setClearColor(0xaaaaaa);

    this.add(this._camera);

    const sun = new DirectionalLight(0xaaaaaa, 0.4);

    sun.position.add(new Vector3(1,0,0));

    this.add(sun, new AmbientLight(0x888888, 1));

    new LevelBuilder(level, this);
  }

  public add(...objects: Object3D[]) {
    this._scene.add(...objects);
  }

  public setMainCameraTarget(target: Object3D) {
    this._cameraTarget = target;
  }

  public animate() {
    if (this._cameraTarget) {
      const oldQ = new Quaternion();
      const q: Quaternion = new Quaternion();

      this._cameraTarget.matrixWorld.decompose(dummy, q, dummy);
      this._camera.matrixWorld.decompose(dummy, oldQ, dummy);

      this._camera.rotation.setFromQuaternion(q.slerp(oldQ, Math.random()));
      approxVector3(this._camera.position, this._cameraTarget.position, 6);
    }

    this.render(this._scene, this._camera);
  }
}
