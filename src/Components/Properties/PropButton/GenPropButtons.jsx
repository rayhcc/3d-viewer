import React from "react";
import PropButton from "./PropButton";

import material_icon from "./button-icon/material-icon.png"
import transform_icon from "./button-icon/transform-icon.png"
import display_icon from "./button-icon/display-icon.png";

export default function GenPropButtons(setPropData){


    const propButtonsInfo = [
        {
            icon: material_icon,
            propType: "Material",
        },
        {
            icon: transform_icon,
            propType: "Transform",
        },
        {
            icon: display_icon,
            propType: "Display",
        },
    ];


    const propButtons = propButtonsInfo.map((buttonInfo) =>(
        <PropButton 
                key = {buttonInfo.propType}
                icon = {buttonInfo.icon} 
                propType = {buttonInfo.propType}
                setPropData = {setPropData}
        />
    ));

    return  propButtons;
}