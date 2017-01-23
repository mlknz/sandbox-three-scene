const waterVert = require('./shaders/water.vert');
const waterFrag = require('./shaders/water.frag');

require('three/examples/js/BufferGeometryUtils');

import config from '../../config.js';

const time = {value: 0};

class Water {
    constructor(mesh) {
        THREE.BufferGeometryUtils.computeTangents(mesh.geometry);

        config.water.normalMap.value = config.water.normalMaps[0];

        const uniforms = {
            normalMap: config.water.normalMap,
            time,

            lightDir: {value: new THREE.Vector3(1, 1, 1)},
            lightColor: {value: new THREE.Color(0xffffff)},

            opacity: config.water.opacity,
            speed: config.water.speed,
            scale: config.water.scale,

            detail1: config.water.detail1,
            detail2: config.water.detail2,
            detail3: config.water.detail3
        };
        config.water.normalMaps.forEach(tex => {
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.RepeatWrapping;
        });

        const waterMaterial = new THREE.RawShaderMaterial({
            vertexShader: waterVert,
            fragmentShader: waterFrag,
            uniforms,
            transparent: true
        });

        waterMaterial.name = 'water_custom';
        mesh.material = waterMaterial;
    }

    update(t) {
        time.value = t;
    }
}

export default Water;
