import { WebGL1Renderer, Scene, FogExp2, Object3D, PerspectiveCamera, Vector3, DirectionalLight, AmbientLight, Camera, Color } from "three";
import { LevelBuilder } from "./LevelBuilder";
import { DEMO_LEVEL } from "../levels/DEMO";
import { CatBarn } from "../levels/CatBarn";
import { IAnimated } from "../types";
import { MAP_01 } from "../levels/MAP_01";

const level = DEMO_LEVEL;

export class MainRenderer extends WebGL1Renderer {
  private _scene: Scene;
  private _camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  private _animateTargets: IAnimated[] = [];

  constructor() {
    super();

    this._scene = new Scene();
    this._scene.fog = new FogExp2(0x334488, 0.25);

    this._camera.position.z = 5;
    this._camera.position.x = 2;

    this.setClearColor(0x334488);

    this.add(this._camera);

    const sun = new DirectionalLight(0xaaaaaa, 0.02);

    sun.position.add(new Vector3(1,0,0));
    sun.castShadow = true;

    this.add(sun, new AmbientLight(0x8888ff, 0.3));

    new LevelBuilder(level, this);
  }

  public add(...objects: Object3D[]) {
    this._scene.add(...objects);
  }

  public remove(...objects: Object3D[]) {
    this._scene.remove(...objects);
  }

  public addAnimated(target: IAnimated) {
    this._animateTargets.push(target);
  }

  public removeAnimated(target: IAnimated) {
    this._animateTargets.splice(this._animateTargets.indexOf(target), 1);
  }

  public setMainCamera(camera: PerspectiveCamera) {
    this._camera = camera;
  }

  public animate() {
    this._animateTargets.forEach((target) => target.animate());

    this.render(this._scene, this._camera);
  }
}
