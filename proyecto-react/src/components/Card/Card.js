import React from 'react'
import "./card.css";
import { Link, Redirect, useHistory } from 'react-router-dom'
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';


function Card(props) {
  let { name, id, poster_path } = props.pelicula

  const history = useHistory()

  const vermas = () => {
    //console.log("vermas")
  }
  function handleOnClick(){
    history.push("/peliculas/detalle/"+id)
  }

  return (
    <div className='movie-card'>
      <img className="img_card"src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={name} />
      <h4 className='nombre'>{name}</h4>

      <div className='botones'>
        <button className="btn_fav" onClick={() => { props.favorito(props.pelicula) }} >Favoritos</button>
        <button className="btn_borrar" onClick={() => props.borrar(id)} >Borrar</button>
        <button className="btn_vermas" onClick={vermas}>Ver Mas</button>
        <button onClick={handleOnClick} className="btn_detalle" >Detalle</button>
      </div>
    </div>
  )
}

export default Card
