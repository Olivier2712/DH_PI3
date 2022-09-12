import React, { Component } from 'react'
import Card from '../../components/Card/Card'

class Home extends Component {

    constructor() {
        super();
        this.state = {
          cargando: true,
          personajes: [],
          filterBy: '',
        };
      }
    componentDidMount() {
        const url = "https://thingproxy.freeboard.io/fetch/https://api.deezer.com/chart/0/tracks&top?limit=20   "
        fetch(url)
          .then((res) => res.json())
          .then(datos => {
            console.log(datos)
            return this.setState({
              canciones: datos.results,
            })
          })
          .catch(err => console.log(err))
    }


    render() {
        return (
          <>
            {/* <form>
              <label> Buscar</label>
              <input
                type="search"
                name="Buscar"
                onChange= ""
              /> */}
    
    
            {/* </form> */}
    
    
            <button className='btn btn-primary mb-3 mt-3' onClick={() => this.agregarMas()}>Mas Prsonajes</button>
            {/* <div className='card-container'>
              {this.state.cargando === false ? (
                <p>Cargando</p>
              ) : (
                this.state.personajes.map(personaje => (
                  <Card key={personaje.id} personaje={personaje} />)
                ))
              }
            </div> */}
          </>
        )
      }














    
}

export default Home;
