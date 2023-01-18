import React, {useEffect, useRef} from "react"
import * as THREE from "three";
import { DIMENSION } from "../enum";
import { axisVectors, axisColors, origin } from "../constant";


export const GenAxisPositionAttrib = (dimension, centerPoint) =>{
    const axisVector = axisVectors[dimension].clone();
    const axisLim = 1000.0; //[-axisLim, axisLim]
    const segLength = 25.0;
    const segNum = Math.floor(axisLim / segLength) * 2 + 1; //node數 = segment數+1
    const axisMinLimPosition = centerPoint.clone().add((axisVector.clone()).multiplyScalar(-axisLim)); // centerPoint -axisLim*axisVector
    
    let vertexPosition = [];

    for(let i = 0; i < segNum; ++i){
        
        // axisMinLimPosition + i*segLength*axisVector
        let currentVertexPosition = (axisVector.clone()).multiplyScalar(i * segLength);     currentVertexPosition.add(axisMinLimPosition);

        vertexPosition.push(...currentVertexPosition.toArray());
    }

    const vertexPosition_typedArray = new Float32Array(vertexPosition);
    const positionAttribute = new THREE.BufferAttribute(vertexPosition_typedArray, 3);

    return positionAttribute;
}




export const GenAxisColorAttrib = (axisColor, verticesNum) =>{

    let vertexColor = [];

    for(let vi = 0; vi < verticesNum; ++vi){
        vertexColor.push(...axisColor.toArray());
    }

    const vertexColor_typedArray = new Float32Array(vertexColor);
    const colorAttribute = new THREE.BufferAttribute(vertexColor_typedArray, 3);

    return colorAttribute;
}

const GenAxisGeometry = (dimension) => {
    
    let axisGeometry = new THREE.BufferGeometry();

    axisGeometry.setAttribute("position", GenAxisPositionAttrib(dimension, origin));
    axisGeometry.setAttribute("color", GenAxisColorAttrib(axisColors[dimension], axisGeometry.attributes.position.count));

    return axisGeometry;
}

const GenAxisMaterial = () =>{

    const axisMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        linewidth: 5.0,
    });

    return axisMaterial;
}

export const GenAxisModel = (dimension) =>{

    const axisModel = new THREE.Line(GenAxisGeometry(dimension), GenAxisMaterial(dimension));
    axisModel.frustumCulled = false;

    return axisModel;
}