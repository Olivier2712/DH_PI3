import React, { Component } from 'react'
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';

class Characters extends Component {

  constructor() {
    super();
    this.state = {
      estaCargado: false,
      peliculas: [],
      filterBy: '',
      nexturl: "",
      favoritos: [],
    };
  }

  componentDidMount() {
    this.setState({ favoritos: JSON.parse(localStorage.getItem('favoritos')) || [] })
    const url = "https://api.themoviedb.org/3/tv/top_rated?api_key=c0945689b0a582e110971301d6ea8be2&language=es"
    fetch(url)
      .then((res) => res.json())
        .then(datos => {
          return this.setState({
            estaCargado: true,
            peliculas: datos.results,
          })
        })
      .catch(err => {
        console.log(err)
      })
  }

    agregarMas() {
     // Logica para agregar mas peliculas
     const url = this.state.nexturl;
     fetch(url)
       .then( res => res.json())
       .then( data => {
         console.log(data)
         this.setState({
           nexturl: data.info.next,
           peliculas: this.state.peliculas.concat(data.results)
         })
       .catch( err => console.log(err))
       })
    }

    filtrarpeliculas(filtro){




       const url = `https://rickandmortyapi.com/api/character/?name=${filtro}`
       fetch(url)
           .then((res)=> res.json())
           .then(datos =>{
               //console.log(datos)
               this.setState({peliculas: datos.results})

           })
           .catch( err => console.log(err))
    }

    handleChange(e){
    this.setState({
       filterBy: e.target.value
     },()=>{
       this.filtrarpeliculas(this.state.filterBy)
     })
    }

   borrarTarjeta(id) {
     const resto = this.state.peliculas.filter( pelicula => pelicula.id !== id)
     this.setState({
       peliculas: resto
     })
   }

   handleFavoritos(card){
     if(this.state.favoritos.some(fav => card.id === fav.id)){
     // texto agregar a favoritos
     this.setState({favoritos: this.state.favoritos.filter( item => item.id !== card.id)}, ()=>{
       localStorage.setItem('favoritos', JSON.stringify(this.state.favoritos))
       // texto quitar de favoritos
     })
     console.log(this.state.favoritos.filter( item => item.id !== card.id))
     }else {
       this.setState({favoritos: [...this.state.favoritos, card]}, ()=>{
       localStorage.setItem('favoritos', JSON.stringify(this.state.favoritos))
       // texto quitar de favoritos
     })}
   }

  render() {
    return (
      <>
        <div className='card-container'>
          {
            this.state.estaCargado ? (
              this.state.peliculas.map(pelicula => (
                <Card
                  key={pelicula.id}
                  pelicula={pelicula}
                  borrar={(peliculaBorrar) => this.borrarTarjeta(peliculaBorrar)}
                  favorito={(pelicula) => this.handleFavoritos(pelicula)}
                />)
              )
            ) : (
              <Loader/>
            )
          }
        </div>
      </>
    )
  }
}
export default Characters
