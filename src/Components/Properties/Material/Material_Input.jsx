import React from "react";
import ColorPicker from "./ColorPicker";


export default function Material_Input(props){

    const backgroundStyle = {
        backgroundColor: props.color,
    }

    return(
        <div className = "label-input-container">

            <label> {props.materialType} </label>
            <input 
                type = "button"
                style = {backgroundStyle}
                onClick = {props.onClick} //color 點了要用 color-picker，texture 點了要 load file
            />

        </div>
    );
}