import React from "react";
import { HexColorPicker, HexAlphaColorPicker } from "react-colorful";


export default function ColorPicker(props){

    const colorPickerRef = React.useRef(null);

    React.useEffect(() =>{

        function handleClickOutside(e){
            if(colorPickerRef.current && !colorPickerRef.current.contains(e.target)){
                props.setShowColorPicker((oldVal) => {
                    return !oldVal;
                })
            }
        }

        document.documentElement.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [])


    return(
        <div ref = {colorPickerRef} className = "colorPicker">

            <HexColorPicker 
                color = {props.color} 
                onChange = {(updateColor) => {
                    props.setColor(updateColor);
                }}
            />
            
        </div>
    );
}
