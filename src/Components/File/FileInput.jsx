import React from "react";

export default function FileInput(props){

    const hideElem = (e) => {
        const fileInfo = document.getElementById("fileInfo");    
        fileInfo.style.display = "none";

        props.setFileSelected({
            localFile: true,
            onlineExample_1: false,
            onlineExample_2: false,
            onlineExample_3: false,
        });
    }

    
    return(
        <input type = "file" id = "file-input" onChange = {hideElem}/>
    );
}