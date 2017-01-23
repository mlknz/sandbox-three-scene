precision highp float;

uniform float time;
uniform sampler2D normalMap;
uniform vec3 lightDir;
uniform vec3 lightColor;

uniform float opacity;
uniform float speed;
uniform float scale;
uniform float detail1;
uniform float detail2;
uniform float detail3;

varying vec2 vUv;
varying vec3 vEyeSurfaceLocal;

const vec3 color = vec3(0.3, 0.4, 0.5);
const vec3 cLightReflDir = vec3(0.02, 0.9992, 0.02);
const float constSpecPow = 2.;
const float specPow = 64.;

vec3 getWaterNormal(sampler2D map, vec2 uv) {
    float t = time * speed * 0.01;

    // 2 lookups should be enough with proper tuning
    vec4 tex1 = texture2D(map, uv*2. + vec2(6., 3.)*t);
    vec4 tex2 = texture2D(map, uv*1.5 + vec2(5., -4.)*t);
    vec4 tex3 = texture2D(map, uv + vec2(-1.8, 1.6)*t);

    vec3 wave = vec3(tex1 * detail1 + tex2 * detail2 + tex3 * detail3);
    wave.z *= 0.25;

    return normalize(wave);
}

void main() {
    vec3 normal = getWaterNormal(normalMap, vUv);

    vec3 lightRefl = normalize(reflect(normalize(lightDir), normal));

    float constSpecTerm = max(0.0, dot(normal, cLightReflDir));
    float specTerm = max(0.0, dot(normalize(vEyeSurfaceLocal), lightRefl));

    float specular1 = ((pow(constSpecTerm, constSpecPow) - .5) * 1.5 + .5) * .15;
    float specular2 = pow(specTerm, specPow) * .2;

    gl_FragColor = vec4(min(color + lightColor * (specular1 + specular2), 1.0), opacity);
}
