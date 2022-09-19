import React from "react";
import Nav from "../nav/Nav";
import "./Header.css";
import Buscador from "./Buscador"

const Header = ({ titulo, subtitulo }) => {

    return (

        <div className="header">
            <h1 className="text-center" style={{ fontFamily: "impact" }}>{titulo}</h1>
            <Buscador />
            <Nav />
        </div>


    )
}

export default Header;