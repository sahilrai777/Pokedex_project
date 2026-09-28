import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./pokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setpokemon] = useState({});

  async function downloadpokemon() {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    setpokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadpokemon();
  }, [id]);

  return (
    <div className="pokemon-details-wrapper">
      <div className="pokemon-details-name">
        Name: <span>{pokemon.name}</span>
      </div>

      <img
        className="pokemon-details-image"
        src={pokemon.image}
        alt={pokemon.name}
      />

      <div className="pokemon-details-height">Height:<span>{pokemon.height}</span> </div>
      <div className="pokemon-details-weight">Weight: <span>{pokemon.weight}</span></div>

      <div className="pokemons-details-type">
        {pokemon.types && pokemon.types?.map((t) => (
          <div key={t}>{t}</div>
        ))}
      </div>
    </div>
  );
}

export default PokemonDetails;