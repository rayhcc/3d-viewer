import React from "react"
import FileInput from "./FileInput";
import FileExample from "./FileExample";

export default function FileSelect(props){

    return(
        <div className = "file-input-container" id = "fileInfo">

            <div className = "file-input-local-container">

                <p className = "file-message">
                    請選取 3D 檔案 (僅接受STL格式)
                </p>

                <FileInput 
                    setFileSelected = {props.setFileSelected}
                />

            </div>
            

            <div className = "file-input-onlineExample-container">
                
                <p className = "file-message">
                    或選取下方的線上範例
                </p>

                <div className = "button-example-container">
                    <FileExample 
                        index = {1} 
                        setFileSelected = {props.setFileSelected} 
                    />
                    <FileExample 
                        index = {2}
                        setFileSelected = {props.setFileSelected}
                    />
                    <FileExample 
                        index = {3} 
                        setFileSelected = {props.setFileSelected} 
                    />
                </div>
                
            </div>
        </div>
    );
}