import PokemonList from "../PokemonList/PokemnList";
import Search from "../Search/Search";
import "./pokedex.css";

function Pokedex() {
  return (
    <div className="Pokedex-wrapper">
      <h1 id="Pokedex-heading">POKEDEX</h1>
      <Search />
      <PokemonList/>
    </div>
  );
}

export default Pokedex;