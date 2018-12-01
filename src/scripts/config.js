const device = require('device.js')();

const config = {
    isDesktop: device.desktop(),
    isDebug: window.location.hash.substr(1) === 'debug',
    useDDSTextures: true,
    usePVRTextures: true,

    time: 0,

    renderer: {
        clearColor: 0x141424,
        clearAlpha: true,
        devicePixelRatio: window.devicePixelRatio || 1
    },

    camera: {
        pos: [-1, 1.8, -2.8],
        target: [0, 0, 0],
        near: 0.1,
        far: 1600
    },

    controls: {
        minDistance: 1,
        maxDistance: 500,
        rotateSpeed: 0.18
    },

    grass: {
        swayFrequency: {value: 1},
        swayAmplitude: {value: 0.2},
        vertexSwayAmplitude: {value: 0.1},
        vertexSwayAmplitudeNormal: {value: 0.25}
    },

    water: {
        opacity: {value: 0.9},
        speed: {value: 1.5},
        scale: {value: 0.5},

        detail1: {value: 0.25},
        detail2: {value: 0.25},
        detail3: {value: 1},

        normalMap: {value: null},
        normalMaps: []
    },

    equalizer: {
        map: {value: null},
        loudness: {value: new THREE.Vector4(1, 1, 1, 1)}
    }
};

export default config;
