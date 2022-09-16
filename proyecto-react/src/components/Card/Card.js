import React from 'react'
import "./Card.css";
import {Link} from 'react-router-dom'
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';


function Card(props) {
let {name, id, poster_path } = props.pelicula



const vermas = () => {
 //console.log("vermas")
 }

  return (
<div className='movie-card'>
      <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={name} />
      <h4 className='nombre'>{name}</h4>
    
      <div className='d-flex'>
        <button className="btn btn-primary" onClick={()=>{props.favorito(props.pelicula)}} >Favoritos</button>
        <button className="btn btn-danger" onClick={()=>props.borrar(id)} >Borrar</button>
        <button className="btn btn-info" onClick={vermas}>Ver Mas</button>
        <Link to={`/movies/id/${id}`} className="btn btn-warning" >Detalle</Link>
      </div>
</div>
  )
}

export default Card
