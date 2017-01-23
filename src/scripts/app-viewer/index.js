import config from '../config.js';

import SceneManager from './sceneManager';
import Controls from '../controls';
// import Starfield from './prefabs/starfield.js';
import Grass from './prefabs/grass.js';
import Water from './prefabs/water.js';

class AppViewer {
    constructor(renderer) {
        this.renderer = renderer;
        this.renderer.setClearColor(config.renderer.clearColor, config.renderer.clearAlpha);
        this.renderer.setPixelRatio(config.renderer.devicePixelRatio);

        const gl = this.renderer.getContext();
        const aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;

        this.sceneManager = new SceneManager();

        this.camera = new THREE.PerspectiveCamera(60, aspectRatio, config.camera.near, config.camera.far);

        this.sceneReady = false;
        document.addEventListener('sceneReady', this.onSceneReady.bind(this));
    }

    onSceneReady() {
        this.sceneReady = true;
        this.controls = new Controls(this.camera, this.renderer.domElement);
        this.controls.resetCameraOrbit();

        // this.starfield = new Starfield(this.renderer, this.sceneManager.scene);

        const grassMesh = this.sceneManager.scene.getObjectByName('grass_instancedMesh');
        this.grass = new Grass(grassMesh);

        const waterMesh = this.sceneManager.scene.getObjectByName('water');
        this.water = new Water(waterMesh);
    }

    update(dt) {
        if (!this.sceneReady) return;

        config.time += dt;

        this.controls.update(dt);

        this.grass.update(config.time);
        this.water.update(config.time);
        this.renderer.render(this.sceneManager.scene, this.camera);
    }

    resize(width, height) {
        const aspectRatio = width / height;

        if (this.camera.aspect !== aspectRatio) {
            this.camera.aspect = aspectRatio;
            this.camera.updateProjectionMatrix();
        }
    }

    dispose() {
        this.controls.dispose();
        // this.clearScene();
    }

}

export default AppViewer;
