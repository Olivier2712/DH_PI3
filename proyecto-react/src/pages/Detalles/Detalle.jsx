import React from "react";
import { useParams } from "react-router-dom";
import {withRouter} from "react-router-dom";
import "./Detalle.css";

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
                genero:"",
                favoritos:[],

            }
        }
    }

    componentDidMount (){
        const contenidoId = this.props.match.params.contenidoId
        const url =  `https://api.themoviedb.org/3/tv/${contenidoId}?api_key=c0945689b0a582e110971301d6ea8be2&language=es`
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
                            fechaDeEstreno: data.first_air_date,
                            duracion: data.episode_run_time,
                            sinapsis: data.overview,
                            genero: data.genres.name,
                            

                    


                        }, 
                    })
                })
            )
            .catch(error => {
                console.error(error)
            })
            console.log(this.state.contenido)
    }

    render(){
        return(
<<<<<<< HEAD
            <div className="detalle">
                <h1 className='nombre-detalle'>{this.state.pelicula.titulo}</h1>
                <img className="img-detalle" src={this.state.pelicula.foto}  /> 
                <h2 className='calificacion-detalle' >Calificacion: {this.state.pelicula.califiacion}</h2>
                <h2 className='estreno-detalle' >Fecha de estreno: {this.state.pelicula.fechaDeEstreno}</h2>
                <h2 className='duracion-detalle' >Duracion: {this.state.pelicula.duracion}</h2>
                <h2 className='sinapsis-titulo'>Sinapsis:</h2> <h2 className='sinapsis-detalle' >{this.state.pelicula.sinapsis}</h2>
                <h2 className='duracion-detalle' >Genero: {this.state.pelicula.genero}</h2>
=======
            <div>
                <h1>{this.state.contenido.titulo}</h1>
                <img src={this.state.contenido.foto} height={136} width={136} /> 
                <h2>Calificacion: {this.state.contenido.califiacion}</h2>
                <h2>Fecha de estreno: {this.state.contenido.fechaDeEstreno}</h2>
                <h2>Duracion: {this.state.contenido.duracion}</h2>
                <h2>Sinapsis: {this.state.contenido.sinapsis}</h2>
                <h2>Genero: {this.state.contenido.genero}</h2>
>>>>>>> a5ac1066ddd11e9c1703fe96d7c610a4f3854ecb
            </div>
        )

    }
        
    }

export default withRouter(Detalle)
