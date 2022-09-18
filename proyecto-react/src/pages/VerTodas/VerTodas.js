import React from "react"
import categoria from "../Detalles/categoria"
import { Link, withRouter } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';

class VerTodas extends React.Component{
    constructor(props){
        super(props)
        this.state = {contenidos:[], estaCargado: false}
        if(this.props.match.categoria){
            const categoriaPagina = this.props.match.categoria
            switch(categoriaPagina){
                case categoria.MOVIE: this.titulo= "Peliculas"; break
                case categoria.TV: this.titulo= "Series"; break
                default: this.titulo = "Sin categoria"; break
            }
        }
        this.titulo = this.props.match.params.categoria && this.props.match.params.categoria === categoria.MOVIE?"Peliculas": "Series"
    }
    
    componentDidMount(){
        const categoriaPagina = this.props.match.params.categoria
        const url = `https://api.themoviedb.org/3/${categoriaPagina}/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es`
    fetch(url)
      .then((res) => res.json())
      .then(datos => {
        const listaDeContenidos = datos.results.map(contenido => ({...contenido,categoria: categoriaPagina}))
        return this.setState({
          estaCargado: true,
          contenidos: listaDeContenidos.slice(0,24), // Profesores: el .slice(0,4) lo saque de una discusion en tmdb ya que no sabia como limitar el contenido que devolvia. (https://www.themoviedb.org/talk/623012ed357c00001b46ae10)
        })
      })
      .catch(err => {
        console.log(err)
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
    
    render(){
        return(
            <div>
                 <section className='contenido_desplegado' style={{display:"flex", flexDirection:"column"}} >
        <div className='card-container_peli' style={{ backgroundColor: "lightcyan" }}>
        <h1 style={{width:"80%", paddingLeft:"30%", fontFamily:'monospace'}}>{this.titulo}</h1> 
        <Link className="btn_vermas" to={"/VerTodas/"+categoria.MOVIE}>Ver todas</Link>
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

export default withRouter (VerTodas)