import React from "react";
import DisplayCheckbox from "./DisplayCheckbox";


export default function Display(props){

    const displayKeys = Object.keys(props.display);
    const displayCheckboxes = displayKeys.map((key) => {
        return(
            <DisplayCheckbox
                key = {key}
                displayType = {key}
                display = {props.display}
                setDisplay = {props.setDisplay}
            />
        );
    });


    return(
        <form className = "data-container">
            
            {displayCheckboxes}

        </form>
    );
}