import React from "react";
import Home from './Components/Home/Home.js'
import { Route, Switch } from "react-router-dom";
import Dogos from './Components/Dogos/Dogos.js'
import Navbar from './Components/Navbar/Navbar.js'
import DogDetail from './Components/DogDetail/DogDetail.js'
import Create from './Components/Create/Create.js'
import NotFound from './Components/NotFound/NotFound.js'
import Musica from './Components/Musica/Musica.js'

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/" component={Navbar} />
      </Switch>
      <Switch>
        <Route exact path="/" component={null} />
        <Route exact path="/create" component={Create} />
        <Route path="/dogos" component={Dogos} />
        <Route component={NotFound}></Route>
      </Switch>
      <Route path="/dogos/:id" component={DogDetail} />
      <Musica />
    </>
  );
}

export default App;
