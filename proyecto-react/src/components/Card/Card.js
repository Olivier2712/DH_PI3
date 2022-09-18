import React from 'react'
import "./card.css";
import { Link, Redirect, useHistory } from 'react-router-dom'
import { converterCategoriaId } from '../../pages/Detalles/categoriaIdTool';




function Card(props) {
  let { name, title, id, poster_path, overview, categoria } = props.contenido
  const collapseId = "collapse"+id
  const history = useHistory()

  const vermas = () => {
    //console.log("vermas")
  }
  function handleOnClick() {
    const categoriaId = converterCategoriaId(categoria, id)
    history.push("/contenidos/detalle/" + categoriaId)
  }

  return (
    <div className='movie-card'>
      <img className="img_card" src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={name} />
      <h4 className='nombre'>{name} {title}</h4>

      <div className='botones'>
        <button className="btn_fav" onClick={() => { props.favorito(props.contenido) }} >Favoritos</button>
        <button className="btn_borrar" onClick={() => props.borrar(id)} >Borrar</button>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item" style={{marginRight:"10px"}}>
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#"+collapseId} aria-expanded="true" aria-controls="collapseOne" style={{backgroundColor:"#54df0e", color:"white", fontSize:"large", fontWeight:"bold"}}>
                Sinopsis
              </button>
            </h2>
            <div id={collapseId} className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body" style={{background:"black", color:"white", fontWeight:"bold"}}>
              {overview}
              </div>
            </div>
          </div>
          <button onClick={handleOnClick} className="btn_detalle" >Detalle</button>
        </div>
      </div>
    </div>
  )
}

export default Card
