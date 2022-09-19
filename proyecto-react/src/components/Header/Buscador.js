import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import buscador from '../Header/buscador.css'
const Buscador = () => {
  const [buscar, setBuscar] = useState("")
  const history = useHistory()

  function handleOnChange(event) {
    setBuscar(event.target.value)
  }

  function handleOnSubmit(event) {
    event.preventDefault()
    if (buscar === "") {
      return
    }
    if (buscar.includes(" ")) {
      alert("Todavia no se pueden buscar palabras con espacios")
      return
    }
    alert(buscar)
    history.push("/Search/" + buscar)

  }
  return (
    <div style={{ display: "flex" }}>
      <form className='form_buscar' onSubmit={handleOnSubmit} style={{ alignItems: "flex-end" }}>
        <label className="label_buscar">Buscar</label>
        <input
          onChange={handleOnChange}
          className='busqueda'
          type="search"
          name="buscar"
          value={buscar}
        />
      </form>
    </div>
  )
}

export default Buscador