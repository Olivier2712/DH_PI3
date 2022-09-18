import React from "react";
import { useParams } from "react-router-dom";
import {withRouter} from "react-router-dom";
import "./Detalle.css";

class Detalle extends React.Component{
    constructor(){
        super()
        this.state = {
            estaCargado: true,
            pelicula: {
                detalleDePelicula: "",
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
        const peliculaId = this.props.match.params.peliculaId
        const url =  `https://api.themoviedb.org/3/tv/${peliculaId}?api_key=c0945689b0a582e110971301d6ea8be2&language=es`
        fetch(url)
            .then(response => response.json()
                .then(data => {
                    console.log(data)
                    this.setState({
                        pelicula: {
                            titulo: data.name,
                            detalleDePelicula: data.overview,
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
            console.log(this.state.pelicula)
    }

    render(){
        return(
            <div className="detalle">
                <h1 className='nombre-detalle'>{this.state.pelicula.titulo}</h1>
                <img className="img-detalle" src={this.state.pelicula.foto}  /> 
                <h2 className='calificacion-detalle' >Calificacion: {this.state.pelicula.califiacion}</h2>
                <h2 className='estreno-detalle' >Fecha de estreno: {this.state.pelicula.fechaDeEstreno}</h2>
                <h2 className='duracion-detalle' >Duracion: {this.state.pelicula.duracion}</h2>
                <h2 className='sinapsis-titulo'>Sinapsis:</h2> <h2 className='sinapsis-detalle' >{this.state.pelicula.sinapsis}</h2>
                <h2 className='duracion-detalle' >Genero: {this.state.pelicula.genero}</h2>
            </div>
        )

    }
        
    }

export default withRouter(Detalle)
