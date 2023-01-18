import React from "react";
import TransformInput_3D from "./TransformInput_3D";




export default function Transform(props){

    return(
        <form className = "data-container">
        
            <TransformInput_3D
                transformType = "Translate"
                transform = {props.transform}
            />

            <TransformInput_3D
                transformType = "Rotate"
                transform = {props.transform}
            />

            <TransformInput_3D
                transformType = "Scale"
                transform = {props.transform}
            />

        </form>
    );
}