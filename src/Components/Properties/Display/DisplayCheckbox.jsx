import React from "react";

export default function DisplayCheckbox(props){

    let inputOnChangeHandler = () => {
        
        props.setDisplay((prevDisplay) => {
            const prevDisplay_deepCopy = JSON.parse(JSON.stringify(prevDisplay)); //nested 的 state，要用 deepcopy 才行
            prevDisplay_deepCopy[props.displayType].isChecked = !prevDisplay[props.displayType].isChecked; // 點擊 checkbox 以後，勾選狀態會變相反

            return prevDisplay_deepCopy;
        });
    };


    return(
        <div className = "checkbox-label-container">

            <input 
                type = "checkbox" 
                checked = {props.display[props.displayType].isChecked}
                onChange = {inputOnChangeHandler}
            />

            <label> 
                {props.displayType} 
            </label>

        </div>
        
    );
}