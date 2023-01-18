import React from "react";
import TransformInput_1D from "./TransformInput_1D";

export default function TransformInput_3D(props){

    return(
        <div className = "transform-input-3D-container">
            <label> {props.transformType} </label>
            
            <TransformInput_1D 
                dimension = "X"
                transformType = {props.transformType}
                transform = {props.transform}
            />

            <TransformInput_1D
                dimension = "Y"
                transformType = {props.transformType}
                transform = {props.transform}
            />

            <TransformInput_1D 
                dimension = "Z"
                transformType = {props.transformType}
                transform = {props.transform}
            />
        </div>
    );
}