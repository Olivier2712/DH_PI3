import React from "react";
import { withRouter } from "react-router-dom";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";


class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            contenidos: [],
            estaCargado: false
        }

    }

    componentDidMount() {
        const consulta = this.props.match.params.consulta
        const url = `https://api.themoviedb.org/3/search/multi?api_key=0f9656f2ce0988e0a6ad7ea1f7bb5506&language=en-US&query=${consulta}&page=1&include_adult=false`

        fetch(url)
            .then((res) => res.json())
            .then(datos => {
                console.log(datos.results)
                const contenidoFiltrado = datos.results.map(contenido => ({
                    name: contenido.name,
                    title: contenido.title,
                    poster_path: contenido.poster_path,
                    overview: contenido.overview,
                    categoria: contenido["media_type"],
                    id: contenido.id

                }))
                this.setState({
                    estaCargado: true,
                    contenidos: contenidoFiltrado
                })
                // name, title, id, poster_path, overview, categoria}
                // const listaDeContenidos = datos.results.map(contenido => ({ ...contenido, categoria: categoria.MOVIE }))
                // return this.setState({
                //     estaCargado: true,
                //     contenidos: listaDeContenidos.slice(0, 4), // Profesores: el .slice(0,4) lo saque de una discusion en tmdb ya que no sabia como limitar el contenido que devolvia. (https://www.themoviedb.org/talk/623012ed357c00001b46ae10)
                // })
            })
            .catch(err => {
                console.error(err)
            })
    }

    render() {
        return (
            <div>

                <section className='contenido_desplegado' style={{ display: "flex", flexDirection: "column" }} >
                    <div className='card-container_peli' style={{ backgroundColor: "lightcyan" }}>
                        <h1 style={{ width: "80%", paddingLeft: "30%", fontFamily: 'monospace' }}> S E A R C H  </h1>

                        {
                            this.state.estaCargado ? (
                                this.state.contenidos.map(contenido => (
                                    <Card
                                        key={contenido.id}
                                        contenido={contenido}
                                        borrar={(contenidoBorrar) => this.borrarTarjeta(contenidoBorrar)}
                                        favorito={(contenido) => this.handleFavoritos(contenido)}
                                    />)
                                )
                            ) : (
                                <Loader></Loader>
                            )
                        }
                    </div>
                </section>
            </div>
        )
    }


}

export default withRouter(Search);
