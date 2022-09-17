import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/Notfound'
import Favoritos from './pages/Favoritos/Favoritos'
import VerTodas from './pages/Ver_todas/VerTodas'
import Footer from './components/Footer/Footer'
import Detalle from './pages/Detalles/Detalle';

function App() {
  return (
    <>
      <Header titulo="Movies4you" subtitulo="Lo que tus ojos quieren ver" />
      <Switch>
        <Route path="/" exact> <Home /> </Route>
        <Route path="/Favoritos"> <Favoritos/> </Route>
        <Route path="/Peliculas/Detalle/:peliculaId"><Detalle/></Route>
        <Route path="/VerTodas"> <VerTodas/> </Route>
        <Route path="*"> < NotFound/> </Route>
        


        {/* <Route path="/" component={Characters} /> */}
        {/* <Route path="/characters/id/:id" component={CharacterDetails} />
          <Route path="/contact" component={Contact}/>
          <Route component={NotFound}/> */}
      </Switch>
      <Footer />
    </>
  );
}

export default App;
