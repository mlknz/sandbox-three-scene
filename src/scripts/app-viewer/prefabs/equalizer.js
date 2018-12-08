const eqVert = require('./shaders/equalizer.vert');
const eqFrag = require('./shaders/equalizer.frag');

require('three/examples/js/BufferGeometryUtils');

import config from '../../config.js';

const time = {value: 0};

class Equalizer {
    constructor() {

        const eqGeom = new THREE.BoxGeometry(1, 1, 1);

        const uniforms = {
            map: config.equalizer.map,
            time,
            loudness: config.equalizer.loudness
        };

        uniforms.map.value.anisotropy = false;
        uniforms.map.value.minFilter = THREE.NearestFilter;
        uniforms.map.value.magFilter = THREE.NearestFilter;

        const eqMaterial = new THREE.RawShaderMaterial({
            vertexShader: eqVert,
            fragmentShader: eqFrag,
            uniforms,
            name: 'equalizer',
            transparent: false
        });

        this.mesh = new THREE.Mesh(eqGeom, eqMaterial);
    }

    update(t) {
        time.value = t;
    }
}

export default Equalizer;
