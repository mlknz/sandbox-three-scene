const sceneDescription = {
    assets: [
        {
            name: 'test_scene',
            type: 'json',
            path: 'assets/test_scene.json'
        },
        {
            name: 'grassTex',
            type: 'texture',
            path: 'assets/textures/grass.png'
        },
        {
            name: 'groundTex',
            type: 'texture',
            path: 'assets/textures/ground.jpg'
        },
        {
            name: 'waterTex',
            type: 'texture',
            path: 'assets/textures/water_normal.jpg'
        },
        {
            name: 'waterTex2',
            type: 'texture',
            path: 'assets/textures/water_normal.png'
        },
        {
            name: 'eqTex',
            type: 'texture',
            path: 'assets/textures/eq_tex.png'
        }
    ],
    model: {
        children: [
            {
                type: 'asset/json',
                name: 'test_scene',
                properties: {
                    name: 'Scene'
                }
            },
            {
                object: {
                    type: 'AmbientLight',
                    args: 0xaaaaaa
                },
                properties: {
                    name: 'ambientLight'
                }
            },
            {
                object: {
                    type: 'DirectionalLight',
                    args: 0xffffff
                },
                properties: {
                    name: 'directLight',
                    position: {
                        x: -30,
                        y: 20,
                        z: 10
                    }
                }
            },
            {
                object: {
                    type: 'DirectionalLight',
                    args: 0x888888
                },
                properties: {
                    name: 'directLight2',
                    position: {
                        x: 30,
                        y: -30,
                        z: -5
                    }
                }
            }
        ]
    }
};

export default sceneDescription;
