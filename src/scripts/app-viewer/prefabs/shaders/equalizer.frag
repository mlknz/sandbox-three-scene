precision highp float;

uniform float time;
uniform sampler2D map;
uniform vec4 loudness;

varying vec2 vUv;

void main() {
    vec4 map = texture2D(map, vUv);
    vec3 col = map.rgb;

    float info = map.a;

    if (info < 0.07)
    {
        col = vec3(0.2, 0.0, 0.0);
    }
    else if (info > 0.9)
    {
        //
    }
    else if (info < 0.155) // 0.08 to 0.16
    {
        col = mix(vec3(0.2, 0.0, 0.0), col, step((info - 0.075) / 0.08, loudness.x));
    }
    else if (info < 0.235) // 0.16 to 0.24
    {
        col = mix(vec3(0.2, 0.0, 0.0), col, step((info - 0.155) / 0.08, loudness.y));
    }
    else if (info < 0.315) // 0.24 to 0.32
    {
        col = mix(vec3(0.2, 0.0, 0.0), col, step((info - 0.235) / 0.08, loudness.z));
    }
    else if (info < 0.475) // 0.32 to 0.40
    {
        col = mix(vec3(0.2, 0.0, 0.0), col, step((info - 0.315) / 0.08, loudness.w));
    }



    gl_FragColor.rgb = col;
}
