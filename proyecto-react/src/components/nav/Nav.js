import React from "react";
import {links} from "./links"
import {NavLink} from 'react-router-dom'

import './Nav.css'

export default function Nav() {
  return (

<nav className="navbar navbar-expand-lg" style={{backgroundColor:"lightcyan"}}>
  <div className="container-fluid">
      <ul className="navbar-nav">
        {links.map(link => (
          <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to={link.url}> {link.name} </NavLink>
        </li>
        ))}
      </ul>

    
    </div>

</nav>
  )
}
