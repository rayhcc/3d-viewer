// import * as THREE from "three";
import * as THREE from "three";


export const origin = new THREE.Vector3(0.0, 0.0, 0.0);
Object.freeze(origin);

export const axisVectors = [
    new THREE.Vector3(1.0, 0.0, 0.0), //x
    new THREE.Vector3(0.0, 1.0, 0.0), //y
    new THREE.Vector3(0.0, 0.0, 1.0), //z
];
Object.freeze(axisVectors);


export const axisColors = [
    new THREE.Vector3(1.0, 0.0, 0.0), //red   for x-axis
    new THREE.Vector3(0.0, 1.0, 0.0), //green for y-axis
    new THREE.Vector3(0.0, 0.0, 1.0), //blue  for z-axis
];
Object.freeze(axisColors);


