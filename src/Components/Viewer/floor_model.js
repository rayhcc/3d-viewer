import React, {useEffect, useRef} from "react"
import * as THREE from "three";
import { axisVectors, axisColors } from "../constant";
import { DIMENSION } from "../enum";
import { GenAxisPositionAttrib, GenAxisColorAttrib } from "./axis_model";



const GenFloorLineCenterPtSet = (dimension, axisLim, gridSpacing) =>{

    // console.log(axisVectors[dimension]);
    const axisMinLimPoint = (axisVectors[dimension].clone()).multiplyScalar(-axisLim); // centerPoint -axisLim*axisVector

    // console.log("still-2")

    const centerPointNum = Math.floor(axisLim / gridSpacing) * 2 + 1; //node數 = segment數+1

    const centerPointSet = [];

    for(let i = 0; i < centerPointNum; ++i){
        centerPointSet.push(axisMinLimPoint.clone().add(axisVectors[dimension].clone().multiplyScalar(i * gridSpacing))); //axisMinLimPoint + i*gridSpacing*axisVectors[dimension]
    }

    return centerPointSet;
}


const GenFloorLineGeometry = (dimension, centerPoint, lineColor) => {

    const floorGeometry = new THREE.BufferGeometry();

    floorGeometry.setAttribute("position", GenAxisPositionAttrib(dimension, centerPoint));
    floorGeometry.setAttribute("color", GenAxisColorAttrib(lineColor, floorGeometry.attributes.position.count));

    return floorGeometry;
};



const GenFloorLineMaterial = () => {
    
    const floorMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
    })

    return floorMaterial;
};

export function GenFloorModel(upDimension, gridSpacing) {
    
    const floorLineGroup = new THREE.Group();
    const axisLim = 1000.0; //[-axisLim, axisLim]

    for(let di = 1; di <= 2; ++di){ //除了 upDimension 以外的其餘兩個 dimension
        const currentDim = (upDimension + di) % DIMENSION.NUM_DIM;
        const crossDim = (upDimension + di + (di==1 ? 1 : -1)) % DIMENSION.NUM_DIM;
        
        const floorLinesCenterPtSet = GenFloorLineCenterPtSet(crossDim, axisLim, gridSpacing);

        floorLinesCenterPtSet.forEach((centerPt) => {
            const floorLineModel = new THREE.Line(GenFloorLineGeometry(currentDim, centerPt, new THREE.Vector3(0.5, 0.5, 0.5)), GenFloorLineMaterial());
            floorLineModel.frustumCulled = false;

            floorLineGroup.add(floorLineModel);
        })
    }

    return floorLineGroup;
}