import React from "react";
import Nav from "../nav/Nav";
import "./Header.css";
import Buscador from "./Buscador"

const Header = ({titulo, subtitulo}) => {
    
    return (

        <div className="header">
            <h1 className="text-center">{titulo}</h1>

            <Nav/>
        </div>
        
        
    )
}

export default Header;