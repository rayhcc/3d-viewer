import React, { useEffect } from "react"
import Material from "./Material/Material";
import PropButton from "./PropButton/PropButton";
import Transform from "./Transform/Transform"
import DisplayInput from "./Display/Display"
import Display from "./Display/Display";
import GenPropButtons from "./PropButton/GenPropButtons"


export default function Properties(props) {

    const [propData, setPropData] = React.useState("Material");


    useEffect(() => {

        const handleClickOutside = (e) => {
            const propertyConatiner = document.querySelector(".property-container");
            // if((e.target !== document.querySelector(".property-toggle")) && (!propertyConatiner.contains(e.target))){
            //     propertyConatiner.classList.remove("active");
            // }
            if(!propertyConatiner.contains(e.target)){
                propertyConatiner.classList.remove("active");
            }
        }

        document.documentElement.addEventListener("click", handleClickOutside);

        return () => {
            document.documentElement.removeEventListener("click", handleClickOutside);
        }

    }, [])


    const GetPropDataComponent = (propData) => {
        switch(propData){
            case "Material":
                return (
                    <Material 
                        modelColor = {props.modelColor}
                        setModelColor = {props.setModelColor}
                        modelOpacity = {props.modelOpacity}
                        setModelOpacity = {props.setModelOpacity}
                    />
                )    
                break;
            
            case "Transform":
                return(
                    <Transform
                        transform = {props.transform}
                    />
                )
                break;
            
            case "Display":
                return(
                    <Display 
                        display = {props.display}
                        setDisplay = {props.setDisplay}
                    />
                );
                break;
        }
    }


    return(
        <div className = "property-container">
            
            <div className = "property-button-container">
                {GenPropButtons(setPropData)}
            </div>


            <div className = "property-data-container">
                {GetPropDataComponent(propData)}
            </div>
        </div>
    );
}