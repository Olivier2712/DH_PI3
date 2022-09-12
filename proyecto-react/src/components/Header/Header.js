import React from "react";
import Nav from "../nav/Nav";

const Header = ({titulo, subtitulo}) => {
    
    return (
        <>
            <h1 className="text-center">{titulo}</h1>
            <h2 className="text-center">{subtitulo}</h2>

           <Nav/>
        </>
    )
}

export default Header;