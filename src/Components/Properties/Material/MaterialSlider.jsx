import React from "react"
import Slider from '@mui/material/Slider';


export default function MaterialSlider(props){

    

    const handleChane = (event, newValue) => {
        props.setSliderValue(newValue / 100.0);
    };

    

    return(
        <div className = "label-input-container">

            <label> {props.materialType} </label>
            
            <div className = "opacity-slider">
                <Slider 
                    value={props.sliderValue * 100.0}
                    onChange = {handleChane}
                />
            </div>

        </div>
    );
}