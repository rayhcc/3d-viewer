import React from "react";
import FileSelect from "./File/FileSelect";
import Viewer from "./Viewer/Viewer";
import Properties from "./Properties/Properties";
import PropToggle from "./PoropToggle/PropToggle";


export default function WorkingArea() {

    const [translateX, setTranslateX] = React.useState(0.0);
    const [translateY, setTranslateY] = React.useState(0.0);
    const [translateZ, setTranslateZ] = React.useState(0.0);
    
    const [rotateX, setRotateX] = React.useState(0.0);
    const [rotateY, setRotateY] = React.useState(0.0);
    const [rotateZ, setRotateZ] = React.useState(0.0);

    const [scaleX, setScaleX] = React.useState(1.0);
    const [scaleY, setScaleY] = React.useState(1.0);
    const [scaleZ, setScaleZ] = React.useState(1.0);
    
    let transform = {
        translateX: translateX,
        translateY: translateY,
        translateZ: translateZ,
        
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: rotateZ,

        scaleX: scaleX,
        scaleY: scaleY,
        scaleZ: scaleZ,

        setTranslateX: setTranslateX,
        setTranslateY: setTranslateY,
        setTranslateZ: setTranslateZ,

        setRotateX: setRotateX,
        setRotateY: setRotateY,
        setRotateZ: setRotateZ,

        setScaleX: setScaleX,
        setScaleY: setScaleY,
        setScaleZ: setScaleZ,
    }

    const defaultDisplay = {
        wireframe: {
            isChecked: false,
            showSurface: true,
        },

        floor: {
            isChecked: false,
        },

        axis: {
            isChecked: true,
            showAxis: {
                x: true,
                y: true,
                z: false,
            }
        },
    }

    const [display, setDisplay] = React.useState(defaultDisplay);

    const [modelColor, setModelColor] = React.useState("#aaa");
    const [modelOpacity, setModelOpacity] = React.useState(1.0);
    const [fileSelected, setFileSelected] = React.useState({
        localFile: false,
        onlineExample_1: false,
        onlineExample_2: false,
        onlineExample_3: false,
    });


    return(
        <main className = "working-area">

            <FileSelect setFileSelected = {setFileSelected} transform = {transform}/>
            
            {Object.values(fileSelected).includes(true) && 
                <Viewer 
                    transform = {transform}
                    display = {display}
                    modelColor = {modelColor}
                    modelOpacity = {modelOpacity}
                    fileSelected = {fileSelected}
                />
            }

            {Object.values(fileSelected).includes(true) && 
                <Properties 
                    transform = {transform}
                    display = {display}
                    setDisplay = {setDisplay}
                    modelColor = {modelColor}
                    setModelColor = {setModelColor}
                    modelOpacity = {modelOpacity}
                    setModelOpacity = {setModelOpacity}
                />
            }

            {Object.values(fileSelected).includes(true) &&
                <PropToggle />
            }

        </main>
    );
}