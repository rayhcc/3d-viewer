import React from "react";
import ColorPicker from "./ColorPicker";
import Material_Input from "./Material_Input";
import MaterialSlider from "./MaterialSlider";



export default function Material(props) {

    const [showColorPicker, setShowColorPicker] = React.useState(false);
    const [color, setColor] = React.useState(props.modelColor);
    const [sliderValue, setSliderValue] = React.useState(props.modelOpacity);


    return(
        <div className = "data-container material-container">

            <Material_Input 
                materialType = "Color"
                showColorPicker = {showColorPicker}
                color = {color}
                onClick = {() => setShowColorPicker(true)}
            />

            {showColorPicker && 
                <ColorPicker 
                    showColorPicker = {showColorPicker} 
                    setShowColorPicker = {setShowColorPicker}
                    color = {color}
                    setColor = {setColor}
                />
            }

            <MaterialSlider 
                materialType = "Opacity"
                sliderValue = {sliderValue}
                setSliderValue = {setSliderValue}
            />

            <button 
                className = "material-apply"
                onClick = {() => {
                    props.setModelColor(color);
                    props.setModelOpacity(sliderValue);
                }}
            > 
                Apply 
            </button>

        </div>
    );
}