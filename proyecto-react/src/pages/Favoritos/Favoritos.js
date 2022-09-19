import React, { Component } from 'react'
import Card from '../../components/Card/Card'

class Favoritos extends Component {
    constructor(){
        super()
        this.state={
            favoritos:[]
        }
    }

    componentDidMount(){
        this.setState({favoritos: JSON.parse(localStorage.getItem('favoritos'))})
    }

    borrarFav(id) {
      const resto = this.state.favoritos.filter(contenido => contenido.id !== id)
      this.setState({
        favoritos: resto
      })
    }

  render() {
    return (
      <div className='card-container' style={{display:"flex", flexDirection:"row", backgroundColor:"#556380"}}>
        {this.state.favoritos.map( item => (
            <Card 
                key={item.id}
                contenido={item}
                borrar={(contenidoBorrar) => this.borrarFav(contenidoBorrar)}
            />
        ))}
      </div>
    )
  }
}

export default Favoritos