import React from 'react'
import "./Card.css";
import {Link} from 'react-router-dom'
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';


function Card(props) {
let {name, id, poster_path } = props.personaje



const vermas = () => {
  //console.log("vermas")
}

  return (
<div className="character-card mb-4">
      <img src={"https://image.tmdb.org/t/p/w500"+ pelicula.backdrop_path} alt={pelicula.path} />
      <h4>{name}</h4>
      {/* <p>Status: {status}</p>
      <p>Genero: {gender}</p> */}
      <div className='d-flex justify-content-end'>
        <button className="btn btn-primary" onClick={()=>{props.favorito(props.personaje)}} >Favoritos</button>
        <button className="btn btn-danger" onClick={()=>props.borrar(id)} >Borrar</button>
        <button className="btn btn-info" onClick={vermas}>Ver Mas</button>
        <Link to={`/movies/id/${id}`} className="btn btn-warning" >Detalle</Link>
      </div>
</div>
  )
}

export default Card
