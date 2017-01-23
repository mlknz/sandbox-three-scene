import defaultVert from '../materialDecorator/shaders/default.vert';
import starfieldGeneratorFrag from '../materialDecorator/shaders/starfieldGenerator.frag';

import starfieldVert from '../materialDecorator/shaders/starfield.vert';
import defaultFrag from '../materialDecorator/shaders/default.frag';

import config from '../../config.js';

class Starfield {
    constructor(renderer, scene) {
        this.renderer = renderer;

        const starfieldMap = this.generateStarfieldMap();
        const planeGeom = new THREE.PlaneBufferGeometry(1, 1, 30, 30);

        const starfieldMaterial = new THREE.RawShaderMaterial({
            uniforms: {
                radius: {value: 500},
                map: {value: starfieldMap},
                brightness: {value: 1}
            },
            vertexShader: starfieldVert,
            fragmentShader: defaultFrag
        });
        const mesh = new THREE.Mesh(planeGeom, starfieldMaterial);
        scene.add(mesh);
        mesh.frustumCulled = false;

        this.starfieldMaterial = starfieldMaterial;
    }

    updateBrightness(val) {
        this.starfieldMaterial.uniforms.brightness.value = val;
    }

    generateStarfieldMap() {
        const renderWidth = config.isDesktop ? 2048 : 1024;
        const renderHeight = config.isDesktop ? 1024 : 512;
        const rtTexture = new THREE.WebGLRenderTarget(
            renderWidth,
            renderHeight,
            {minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat}
        );

        const material = new THREE.ShaderMaterial({
            uniforms: {
                offsetRepeat: {value: new THREE.Vector4(0, 0, 1, 1)}
            },
            vertexShader: defaultVert,
            fragmentShader: starfieldGeneratorFrag
        });

        const cameraRTT = new THREE.OrthographicCamera(renderWidth / -2, renderWidth / 2, renderHeight / 2, renderHeight / -2, -10000, 10000);
        cameraRTT.position.z = 10;

        const sceneRTT = new THREE.Scene();

        const plane = new THREE.PlaneBufferGeometry(renderWidth, renderHeight);
        const quad = new THREE.Mesh(plane, material);
        sceneRTT.add(quad);

        this.renderer.render(sceneRTT, cameraRTT, rtTexture, true);

        return rtTexture.texture;
    }

}

export default Starfield;
