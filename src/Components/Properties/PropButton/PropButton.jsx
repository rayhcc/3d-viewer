import React from "react";


export default function PropButton(props) {

    const handleClick = () =>{
        props.setPropData(props.propType);
    };

    return(
        <button 
            className = "property-button" 
            onClick = {handleClick}
        > 
            <img 
                src = {props.icon} 
                className = "property-icon"
            />

        </button>
    );
}