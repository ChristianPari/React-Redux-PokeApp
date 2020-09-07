import React from 'react';
import './App.css';
import { Switch, Route, NavLink, Redirect } from "react-router-dom"
import PokemonList from "./containers/PokemonList"
import Pokemon from "./containers/Pokemon"

function App() {
  return (
    <div className="App">
      <h1 className={"heading"}>PokeList API w/ React-Redux</h1>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
      </nav>
      {/* NavLink creates a link and the path is specified in the "to" property */}
      <Switch>
        <Route path={"/"} exact component={PokemonList} />
        <Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
        <Redirect to={"/"} />
      </Switch>
      {/* Switch allows React to render components depending on what route is being called from the browser */}
      {/* Redirect allows you to set a default route for the React to render to the cilent if the path being searched for does not exist */}
    </div>
  );
}

export default App;
