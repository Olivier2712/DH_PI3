import React from "react"
import categoria from "../Detalles/categoria"
import { Link, withRouter } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';

class VerTodas extends React.Component {
  constructor(props) {
    super(props)
    this.state = { contenidos: [], estaCargado: false, masPopulares: false }
    if (this.props.match.categoria) {
      const categoriaPagina = this.props.match.categoria
      switch (categoriaPagina) {
        case categoria.MOVIE: this.titulo = "Peliculas"; break
        case categoria.TV: this.titulo = "Series"; break
        default: this.titulo = "Sin categoria"; break
      }
    }
    this.titulo = this.props.match.params.categoria && this.props.match.params.categoria === categoria.MOVIE ? "Peliculas" : "Series"
    this.handleChange_masPopulares = this.handleChange_masPopulares.bind(this)
  }

  componentDidMount() {
    const categoriaPagina = this.props.match.params.categoria
    const url = `https://api.themoviedb.org/3/${categoriaPagina}/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es`
    fetch(url)
      .then((res) => res.json())
      .then(datos => {
        const listaDeContenidos = datos.results.map(contenido => ({ ...contenido, categoria: categoriaPagina }))
        return this.setState({
          estaCargado: true,
          contenidos: listaDeContenidos.slice(0, 24), // Profesores: el .slice(0,4) lo saque de una discusion en tmdb ya que no sabia como limitar el contenido que devolvia. (https://www.themoviedb.org/talk/623012ed357c00001b46ae10)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  filtrarcontenidos(filtro) {
    const categoriaPagina = this.props.match.params.categoria
    const urlMasPopular = `https://api.themoviedb.org/3/${categoriaPagina}/popular?api_key=c0945689b0a582e110971301d6ea8be2&language=es`
    const urlComun = `https://api.themoviedb.org/3/${categoriaPagina}/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es`
    const url = filtro === false ? urlMasPopular : urlComun

    fetch(url)
      .then((res) => res.json())
      .then(datos => {
        //console.log(datos)
        this.setState({ contenidos: datos.results })

      })
      .catch(err => console.log(err))
    // alert(this.state.masPopulares) 
    // console.log(this.state)
  }

  handleChange_masPopulares(e) {
    this.setState({ masPopulares: !this.state.masPopulares }, this.filtrarcontenidos(this.state.masPopulares))
    console.log(this.state.masPopulares)
  }




  borrarTarjeta(id) {
    const resto = this.state.contenidos.filter(contenido => contenido.id !== id)
    this.setState({
      contenidos: resto
    })
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
  handleOnClickRedirecToVerTodas() {
    this.props.history.push('/Favoritos')
  }

  render() {
    return (
      <div>
        <section className='contenido_desplegado' style={{ display: "flex", flexDirection: "row" }} >
          <div className='card-container_peli' style={{ backgroundColor: "#556380", display: "flex", flexDirection: "row", flexWrap: 'wrap' }}>
            <h1 style={{ fontFamily: 'impact', color:"white" }}>{this.titulo}</h1>
            <div style={{ display: "flex", width: "100%", }}>
              <form className="form_vermas">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={this.handleChange_masPopulares} checked={this.state.masPopulares}/>
                  <label class="form-check-label" for="flexSwitchCheckDefault" style={{fontFamily: 'impact', color:"white", fontSize:"large"}}>Mas populares</label>
                </div>

              </form>
            </div>
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

export default withRouter(VerTodas)