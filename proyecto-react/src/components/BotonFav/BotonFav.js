import React from 'react'
import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';


function BotonFav(props) {
  

  return (

      <div className='botones'>
        <button className="btn_fav" onClick={() => { props.favorito(props.contenido) }} >Favoritos</button>
      </div>
    
  )
}

export default BotonFav
