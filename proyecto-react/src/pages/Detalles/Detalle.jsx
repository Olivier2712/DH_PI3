import React from "react";
import { useParams } from "react-router-dom";
import {withRouter} from "react-router-dom";
import "./Detalle.css";
import BotonFav from "../../components/BotonFav/BotonFav";
import { decodeCategoriaId } from "../../utils/categoriaIdTool";


class Detalle extends React.Component{
    constructor(){
        super()
        this.state = {
            estaCargado: true,
            contenido: {
                detalleDecontenido: "",
                foto:"",
                titulo:"",
                califiacion:"",
                fechaDeEstreno:"",
                duracion:"",
                sinapsis:"",
                generos:[],
                favoritos:[],

            }
        }
    }

    componentDidMount (){
        const contenidoId = this.props.match.params.contenidoId
        const decodeContenidoId= decodeCategoriaId(contenidoId)
        const url =  `https://api.themoviedb.org/3/${decodeContenidoId.categoriaName}/${decodeContenidoId.id}?api_key=c0945689b0a582e110971301d6ea8be2&language=es`

        fetch(url)
            .then(response => response.json()
                .then(data => {
                    console.log(data)
                    this.setState({
                        contenido: {
                            titulo: data.name,
                            detalleDecontenido: data.overview,
                            foto: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
                            califiacion: data.popularity,
                            fechaDeEstreno: data.first_air_date || data.release_date,
                            duracion: data.episode_run_time? data.episode_run_time + 'Episodios' : data.runtime + 'Minutos',
                            sinapsis: data.overview,
                            generos: data.genres.map(genre => genre.name),
                            

                    


                        }, 
                    })
                })
            )
            .catch(error => {
                console.error(error)
            })
            console.log(this.state.contenido)
    }

    handleFavoritos(card) {
        if (this.state.favoritos.some(fav => card.id === fav.id)) {
          // texto agregar a favoritos
          this.setState({ favoritos: this.state.favoritos.filter(item => item.id !== card.id) }, () => {
            localStorage.setItem('favoritos', JSON.stringify(this.state.favoritos))
            // texto quitar de favoritos
          })
          console.log(this.state.favoritos.filter(item => item.id !== card.id))
        } else {
          this.setState({ favoritos: [...this.state.favoritos, card] }, () => {
            localStorage.setItem('favoritos', JSON.stringify(this.state.favoritos))
            // texto quitar de favoritos
          })
        }
      }

    render(){
        return(
            <div className='detalle' >
                <h1 className='nombre-detalle' >{this.state.contenido.titulo}</h1>
                <img className='img-detalle' src={this.state.contenido.foto} height={136} width={136} /> 
                <h2 className='calificacion-detalle' >Calificacion: {this.state.contenido.califiacion}</h2>
                <h2 className='estreno-detalle' >Fecha de estreno: {this.state.contenido.fechaDeEstreno}</h2>
                <h2 className='duracion-detalle' >Duracion: {this.state.contenido.duracion}</h2>
                <h2 className='sinapsis-titulo'> Sinapsis:</h2> <h2 className='sinapsis-detalle' > {this.state.contenido.sinapsis}</h2>
                <h2 className='genero-detalle' >Generos: </h2>
                <ul>
                    {this.state.contenido.generos.map(genero => <li>{genero}</li>)}
                </ul>
                <BotonFav/>
            </div>
        )

    }
        
    }

export default withRouter(Detalle)
