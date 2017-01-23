import grassVert from './shaders/grass.vert';
import grassFrag from './shaders/grass.frag';

import config from '../../config.js';

const time = {value: 0};

class Grass {
    constructor(mesh) {
        const uniforms = mesh.material.uniforms;
        uniforms.time = time;
        uniforms.swayFrequency = config.grass.swayFrequency;
        uniforms.swayAmplitude = config.grass.swayAmplitude;
        uniforms.atlasSize = {value: 2};
        uniforms.vertexSwayAmplitude = config.grass.vertexSwayAmplitude;
        uniforms.vertexSwayAmplitudeNormal = config.grass.vertexSwayAmplitudeNormal;

        const grassMaterial = new THREE.RawShaderMaterial({
            uniforms,
            vertexShader: grassVert,
            fragmentShader: grassFrag,
            side: THREE.DoubleSide,
            transparent: true
        });
        grassMaterial.name = 'grass_instanced_custom';
        mesh.material = grassMaterial;
    }

    update(t) {
        time.value = t;
    }

}

export default Grass;
