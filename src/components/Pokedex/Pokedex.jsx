import { useState } from "react";
import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
//import css
import "./pokedex.css";
import PokemonDetails from "../pokemonDetails/pokemonDetails";

function Pokedex() {

  const[ searchTerm, SetSearchterm]= useState('');

  return (
    <div className="pokedex-wrapper">
       <Search  updateSearchTerm={SetSearchterm}/>
      {(!searchTerm) ?<PokemonList/>:<PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}
    </div>
  );
}

export default Pokedex;