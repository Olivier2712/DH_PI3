import React from "react";
import Nav from "../nav/Nav";
import "./Header.css";
import Buscador from "./Buscador"

const Header = ({titulo, subtitulo}) => {
    
    return (

        <div className="header">
            <h1 className="text-center">{titulo}</h1>
            <h4 className="text-center">{subtitulo}</h4>

            <Nav/>
        </div>
        
        
    )
}

export default Header;