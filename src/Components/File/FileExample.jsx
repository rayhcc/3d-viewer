import React from "react";

export default function Example(props){

    const handleClick = () => {
        const fileInfo = document.getElementById("fileInfo");    
        fileInfo.style.display = "none";

        props.setFileSelected({
            localFile: false,
            onlineExample_1: false,
            onlineExample_2: false,
            onlineExample_3: false,

            [`onlineExample_${props.index}`]: true,
        })
    }

    return(
        <button className = "file-example" onClick = {handleClick}>
            Example-{props.index}
        </button>
    );
}