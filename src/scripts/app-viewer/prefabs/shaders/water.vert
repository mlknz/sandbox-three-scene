precision highp float;

attribute vec3 position;
attribute vec4 tangent;
attribute vec3 normal;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

uniform float scale;

varying vec2 vUv;
varying vec3 vEyeSurfaceLocal;

void main() {
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;

    vec3 n = normalize(normalMatrix * normal);
    vec3 t = normalize(normalMatrix * tangent.xyz);
    vec3 b = cross(n, t) * tangent.w; // tangent.w is expected to be +-1 for orientation

    vEyeSurfaceLocal = (worldPos - cameraPosition) * mat3(t, b, n); // reverse mult order: mat3 is transposed
    vUv = worldPos.zx * scale;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
