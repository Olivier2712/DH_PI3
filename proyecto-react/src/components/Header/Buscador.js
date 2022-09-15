const Buscador = () => {
    return (
        <div style={{alignSelf:"baseline"}}>
        <form>
          <label style={{backgroundColor:"blue", borderRadius:"10px"}}>Buscar</label>
          <input
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