import React from 'react'
import {Route, Switch} from 'react-router-dom'

import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
function App() {
  return (
  <>     
    <Header titulo= "Music4you" subtitulo="Lo que tus oidos quieren escuchar"/>
    <Switch>
          <Route path="/" exact  >
            <Home />
            </Route>
          {/* <Route path="/about" component={Characters} />
          <Route path="/characters/id/:id" component={CharacterDetails} />
          <Route path="/contact" component={Contact}/>
          <Route component={NotFound}/> */}
        </Switch>
      {/* <Footer />  */}
  </>
  );
}

export default App;
