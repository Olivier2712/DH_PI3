import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom';
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
        return this.setState({
          estaCargado: true,
          contenidos: datos.results.slice(0,4), // Profesores: el .slice(0,4) lo saque de una discusion en tmdb ya que no sabia como limitar el contenido que devolvia. (https://www.themoviedb.org/talk/623012ed357c00001b46ae10)
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
        return this.setState({
          estaCargado: true,
          series: datos.results.slice(0,4),
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  agregarMas() {
    // Logica para agregar mas contenidos
    const url = this.state.nexturl;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          nexturl: data.info.next,
          contenidos: this.state.contenidos.concat(data.results)
        })
          .catch(err => console.log(err))
      })
  }

  filtrarcontenidos(filtro) {




    const url = `https://rickandmortyapi.com/api/character/?name=${filtro}`
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
 handleOnClickRedirecToVerTodas (){
    this.props.history.push('/Favoritos')
  }


  render() {
    return (
      <section className='contenido_desplegado' style={{display:"flex", flexDirection:"column"}} >
        <div className='card-container_peli' style={{ backgroundColor: "lightcyan" }}>
        <h1 style={{width:"80%", paddingLeft:"30%", fontFamily:'monospace'}}>P E L I C U L A S </h1> 
        <button className="btn_vermas" onClick={this.handleOnClickRedirecToVerTodas}>Ver todas</button>
          {
            this.state.estaCargado ? (
              this.state.contenidos.map(contenido => (
                <Card
                  key={contenido.id}
                  contenido={contenido}
                  categoria={categoria.MOVIE}
                  borrar={(contenidoBorrar) => this.borrarTarjeta(contenidoBorrar)}
                  favorito={(contenido) => this.handleFavoritos(contenido)}
                />)
              )
            ) : (
              <Loader></Loader>
            )
          }
        </div>

        <div className='card-container_serie' style={{ backgroundColor: "lightcyan" }}>
        <h1 style={{width:"100%", paddingLeft:"40%", fontFamily:'monospace'}}>S E R I E S</h1>
          {
            this.state.estaCargado ? (
              this.state.series.map(contenido => (
                <Card
                  key={contenido.id}
                  contenido={contenido}
                  categoria={categoria.TV}
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
