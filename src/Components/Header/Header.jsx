import React from "react";
import AppLogo from "../../image/AppLogo.png"

export default function Header(){
    
    return(
        <header>
            
            <img className = "app-logo" src = {AppLogo} alt = "App Logo"></img>
            <h1> 3D Viewer </h1>

        </header>
    );
}