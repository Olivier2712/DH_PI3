import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/Notfound'
import Favoritos from './pages/Favoritos/Favoritos'
import VerTodas from './pages/VerTodas/VerTodas'
import Footer from './components/Footer/Footer'
import Detalle from './pages/Detalles/Detalle';
import Search from './pages/Search/Search';

function App() {
  return (
    <>
      <Header titulo="Cuevana Salteña" subtitulo="La mejor plataforma de streaming del milenio" />
      <Switch>
        <Route path="/" exact> <Home /> </Route>
        <Route path="/Favoritos"> <Favoritos/> </Route>
        <Route path="/contenidos/Detalle/:contenidoId"><Detalle/></Route>
        <Route path="/VerTodas/:categoria"> <VerTodas/> </Route>
        <Route path="/Search/:consulta"> <Search/> </Route>
        <Route path="*"> < NotFound/> </Route>
        
      </Switch>
      <Footer />
    </>
  );
}

export default App;
