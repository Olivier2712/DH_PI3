import React from 'react'
import "./card.css";
import { Link, Redirect, useHistory } from 'react-router-dom'
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import { converterCategoriaId } from '../../pages/Detalles/categoriaIdTool';
import { Collapse } from 'react-bootstrap';
import AccordionBody from 'react-bootstrap/esm/AccordionBody';




function Card(props) {
  let { name, title, id, poster_path, overview } = props.contenido
  const categoria = props.categoria

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
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{backgroundColor:"#54df0e", color:"white", fontSize:"large", fontWeight:"bold"}}>
                Sinopsis
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
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
