import { WebGL1Renderer, Scene, FogExp2, Object3D, PerspectiveCamera, Vector3, DirectionalLight, AmbientLight } from "three";
import { LevelBuilder } from "./LevelBuilder";
import { approxVector3 } from "./utils";
import { DEMO_LEVEL } from "../levels/DEMO";
import { IAnimated } from "../types";

const level = DEMO_LEVEL;

export class MainRenderer extends WebGL1Renderer {
  private _scene: Scene;
  private _camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  private _cameraTarget?: Object3D;

  private _animateTargets: IAnimated[] = [];

  constructor() {
    super();

    this._scene = new Scene();
    this._scene.fog = new FogExp2(0xaaaaaa, 0.20);

    this._camera.position.z = 5;
    this._camera.position.x = 2;

    this.setClearColor(0xbbbbbbb);

    this.add(this._camera);

    const sun = new DirectionalLight(0xaaaaaa, 0.08);

    sun.position.add(new Vector3(1,0,0));

    this.add(sun, new AmbientLight(0x888888, 0.8));

    new LevelBuilder(level, this);
  }

  public add(...objects: Object3D[]) {
    this._scene.add(...objects);
  }

  public addAnimated(target: IAnimated) {
    this._animateTargets.push(target);
  }

  public setMainCameraTarget(target: Object3D) {
    this._cameraTarget = target;
  }

  public animate() {
    if (this._cameraTarget) {
      this._camera.rotation.copy(this._cameraTarget.rotation);
      approxVector3(this._camera.position, this._cameraTarget.position, 6);
    }

    this._animateTargets.forEach((target) => target.animate());

    this.render(this._scene, this._camera);
  }
}
