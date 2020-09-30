import { WebGL1Renderer, Scene, FogExp2, Object3D, PerspectiveCamera, Vector3, DirectionalLight, AmbientLight, Camera, Color, WebGLRenderer, ReinhardToneMapping, ACESFilmicToneMapping, Vector2, CameraHelper, PCFSoftShadowMap, BasicShadowMap, PCFShadowMap } from "three";
import { LevelBuilder } from "./LevelBuilder";
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {SSAOPass} from 'three/examples/jsm/postprocessing/SSAOPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import { DEMO_LEVEL } from "../levels/DEMO";
import { CatBarn } from "../levels/CatBarn";
import { IAnimated } from "../types";
import { MAP_01 } from "../levels/MAP_01";

const level = DEMO_LEVEL;

export class MainRenderer extends WebGLRenderer {
  private _scene: Scene;
  private _camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

  private _animateTargets: IAnimated[] = [];

  private _sun: DirectionalLight;
  private _sunHelper?: CameraHelper;

  constructor() {
    super({
      antialias: true,
    });

    this.toneMapping = ReinhardToneMapping;
    this._scene = new Scene();
    this._scene.fog = new FogExp2(0x4b8bfd, 0.02);

    this.setClearColor(0x4b8bfd);

    this._sun = new DirectionalLight(0xf1ba4a, 10);

    this._sun.position.set(400, 5, 30);

    this.shadowMap.enabled = true;
    this.shadowMap.type = PCFSoftShadowMap;

    this._sun.castShadow = true;
    this._sun.shadow.bias = 0;
    this._sun.shadow.camera.top = 15;
    this._sun.shadow.camera.bottom = -15;
    this._sun.shadow.camera.left = 15;
    this._sun.shadow.camera.right = -15;

    this._sun.shadow.mapPass = new Vector2(4048, 4048);

    this._sunHelper = new CameraHelper(this._sun.shadow.camera);

    this.add(this._sun, new AmbientLight(0x4b8bfd, 1));

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

    const cameraWorldPosition = this._camera.position.clone();

    this._sun.position.set(
      cameraWorldPosition.x - 18,
      cameraWorldPosition.y + 14,
      cameraWorldPosition.z - 5,
    );
    this._sun.target = this._camera;

    this.render(this._scene, this._camera);
  }
}
