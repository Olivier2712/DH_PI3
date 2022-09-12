import React from 'react'
import "./card.css";
import {Link} from 'react-router-dom'

function Card({cancion}) {
let {image, name, status, gender, id} = cancion

const borrar = () => {
  console.log("borrar")
}

const vermas = () => {
  console.log("vermas")
}

  return (
<div className="character-card mb-4">
      <img src={image} alt={name}/>
      <h4>{name}</h4>
      <p>Status: {status}</p>
      <p>Genero: {gender}</p>
      <div className='d-flex justify-content-end'>
        <button className="btn btn-danger" onClick={borrar}>Borrar</button>
        <button className="btn btn-info" onClick={vermas}>Ver Mas</button>
        <Link to={`/characters/id/${id}`} className="btn btn-warning" >Detalle</Link>
      </div>
</div>
  )
}

export default Card
