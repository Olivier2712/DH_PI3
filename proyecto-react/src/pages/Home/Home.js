import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import categoria from '../../pages/Detalles/categoria';


class Home extends Component {

  constructor() {
    super();
    this.state = {
      estaCargado: false,
      contenidos: [],
      series: [],
      filterBy: '',
      nexturl: "",
      favoritos: [],
    };
  }

  componentDidMount() {
    this.setState({ favoritos: JSON.parse(localStorage.getItem('favoritos')) || [] })
    const url = "https://api.themoviedb.org/3/movie/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es"
    fetch(url)
      .then((res) => res.json())
      .then(datos => {
        const listaDeContenidos = datos.results.map(contenido => ({ ...contenido, categoria: categoria.MOVIE }))
        return this.setState({
          estaCargado: true,
          contenidos: listaDeContenidos.slice(0, 4), // Profesores: el .slice(0,4) lo saque de una discusion en tmdb ya que no sabia como limitar el contenido que devolvia. (https://www.themoviedb.org/talk/623012ed357c00001b46ae10)
        })
      })
      .catch(err => {
        console.log(err)
      })
    this.setState({ favoritos: JSON.parse(localStorage.getItem('favoritos')) || [] })
    const url2 = "https://api.themoviedb.org/3/tv/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es"
    fetch(url2)
      .then((res) => res.json())
      .then(datos => {
        const listaDeContenidos = datos.results.map(contenido => ({ ...contenido, categoria: categoria.TV }))
        return this.setState({
          estaCargado: true,
          series: listaDeContenidos.slice(0, 4),
        })
      })
      .catch(err => {
        console.log(err)
      })
  }


  filtrarcontenidos(filtro) {




    const url = `${filtro}`
    fetch(url)
      .then((res) => res.json())
      .then(datos => {
        //console.log(datos)
        this.setState({ contenidos: datos.results })

      })
      .catch(err => console.log(err))
  }

  handleChange(e) {
    this.setState({
      filterBy: e.target.value
    }, () => {
      this.filtrarcontenidos(this.state.filterBy)
    })
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
      <section className='contenido_desplegado' style={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#556380" }} >
        <div className='contenedor_titulo_y_boton' style={{ widht: "100%", display: "flex", backgroundColor: "#556380", marginTop: "5%" }}>
          <h1 style={{ width: "80%", paddingLeft: "30%", fontFamily: 'impact', color: "white" }}>P E L I C U L A S </h1>
          <Link className="btn_vermas" to={"/VerTodas/" + categoria.MOVIE} style={{ widht: "20%" }}>Ver todas</Link>
        </div>
        <div className='card-container_peli' style={{ backgroundColor: "#556380", width: "100%", display: "flex", marginBottom: "5%", display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center" }}>
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
        <div className='contenedor_titulo_y_boton' style={{ widht: "100%", display: "flex", backgroundColor: "#556380" }}>
          <h1 style={{ width: "80%", paddingLeft: "30%", fontFamily: 'impact', color: "white" }}>S E R I E S</h1>
          <Link className="btn_vermas" to={"/VerTodas/" + categoria.TV} style={{ widht: "20%" }}>Ver todas</Link>
        </div>
        <div className='card-container_serie' style={{ backgroundColor: "#556380", display: "flex", flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center" }}>

          {
            this.state.estaCargado ? (
              this.state.series.map(contenido => (
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
    )
  }
}
export default withRouter(Home)
