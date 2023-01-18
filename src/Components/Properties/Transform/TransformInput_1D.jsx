import React from "react"

export default function TransformInput_1D(props){ 

    return(
        <div className = "label-input-container">

            <label> 
                {props.dimension} 
            </label>        

            <input 
                type = "number"
                value = {props.transform[props.transformType.toLowerCase() + props.dimension]}
                step = {0.1}
                onChange = {(e) => props.transform[`set${props.transformType}${props.dimension}`](e.target.value)}  // 使用 object["key"] 的方式來呼叫 properties
            />

        </div>
        
    );
}