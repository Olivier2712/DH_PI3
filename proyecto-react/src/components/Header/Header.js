import React from "react";
import Nav from "../nav/Nav";
import "./Header.css";
const Header = ({titulo, subtitulo}) => {
    
    return (

        <div className="header">
            <h1 className="text-center">{titulo}</h1>
            <h2 className="text-center">{subtitulo}</h2>

            <Nav/>
        </div>
        
        
    )
}

export default Header;