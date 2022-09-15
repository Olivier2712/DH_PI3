import React from "react";
import Nav from "../nav/Nav";
import "./Header.css";
import Buscador from "./Buscador"

const Header = ({titulo, subtitulo}) => {
    
    return (

        <div className="header">
            <h1 className="text-center">{titulo}</h1>
            <h2 className="text-center">{subtitulo}</h2>

            <Nav/>
            <Buscador> buscador </Buscador>
        </div>
        
        
    )
}

export default Header;