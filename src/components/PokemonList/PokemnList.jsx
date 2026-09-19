import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../pokemon/pokemon";

function PokemonList() {

    const [pokemonList,setpokemonList]=useState([]);
    const [isLoading,setIsLoading] = useState(true);
   const POKEDEX_URL= "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
  async function downloadPokemons() {
    const response = await axios.get(POKEDEX_URL ); //THIS DOWNLOAD LIST OF 20 POKEMONS
    const pokemonResult = response.data.results;  //WE GET THE ARAY OFOKEMON ROMRESULT
    console.log(response.data)
    
    //ITERATING OVER THE ARRAY OF POKEMONS,AND USING THERE URL,TO CREATE AN ARRAY OF PROMIES
    // THAT WILL DOWNLOAD THOSE 20POKEMINS
    const pokemonResultpromise= pokemonResult.map((pokemon) => axios.get(pokemon.url));

    //PASSING THE PROMISE ARRAY TO AXIOS ALL
    const pokemonData =await axios.all(pokemonResultpromise)    //ARRAY OF 20 POKEMON DEATAILD DATA

    console.log(pokemonData);

    //NOW ITERATE  ON THE DTA OF EACH POKEMON, AND EXTRACT ID, NAME ,IMAGE,TYPES
    const pokeListResult = pokemonData.map((pokedata) => {
  const pokemon = pokedata.data;

  return {
    id :pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other
      ? pokemon.sprites.other.dream_world.front_default
      : pokemon.sprites.front_shiny,
    types: pokemon.types
  };
});

    console.log(pokeListResult);
    setpokemonList(pokeListResult);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadPokemons();
  }, []);

  return (
    <>
      <div className="pokemon-list-wrapper">
        <div>Pokemon List </div>
        {(isLoading)?"Loading....": 
         pokemonList.map((p) => <Pokemon name= {p.name} image={ p.image} key={p.id}/>)}
      </div>
    </>
  ); 
}

export default PokemonList;