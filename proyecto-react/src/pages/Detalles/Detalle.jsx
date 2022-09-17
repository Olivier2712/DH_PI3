import React from "react";
import { useParams } from "react-router-dom";
import {withRouter} from "react-router-dom";

class Detalle extends React.Component{
    constructor(){
        super()
        this.state = {
            estaCargado: true,
            pelicula: {
                detalleDePelicula: "",
                foto:"",
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
            <div>
                <h1>Detalle de la pelicula{this.state.pelicula.titulo}</h1>
                <img src={this.state.pelicula.foto} height={136} width={136} /> 
            </div>
        )

    }
        
    }

export default withRouter(Detalle)
