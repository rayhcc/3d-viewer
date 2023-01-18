import React from "react"
import wrenchTool_icon from "./wrench-tool-icon.svg";


export default function PropToggle() {

    const handleClick = (e) => {
        const propertyContainer = document.querySelector(".property-container");
        propertyContainer.classList.toggle("active");
        e.stopPropagation();
    }

    return(
        <button 
            className = "property-toggle  property-button"
            onClick = {handleClick}
        >

            <img
                src = {wrenchTool_icon}
                className = "property-icon"
            />

        </button>
    );
}