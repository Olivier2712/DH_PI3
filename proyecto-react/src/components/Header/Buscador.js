import buscador from '../Header/buscador.css'
const Buscador = () => {
    return (
        <div style={{display:"flex"}}>
        <form className='form_buscar'>
          <label className="label_buscar">Buscar</label>
          <input
          className='busqueda'
            type="search"
            name="buscar"
            /* onChange={(e) => { this.handleChange(e) }} */
            /* value={this.state.filterBy} */
          />
        </form>
        </div>
    )
}

export default Buscador