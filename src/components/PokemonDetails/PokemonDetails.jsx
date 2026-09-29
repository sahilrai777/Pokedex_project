import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./pokemonDetails.css";

function PokemonDetails({ pokemonName }) {
  const { id } = useParams();
  const [pokemon, setpokemon] = useState({});

  async function downloadpokemon() {
    let response;

    if (pokemonName) {
      response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
    } else {
      response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
    }

    const pokemonOfSameTypes = await axios.get(
      `https://pokeapi.co/api/v2/type/${response.data.types[0].type.name}`
    );

    setpokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
      similarPokemons: pokemonOfSameTypes.data.pokemon,
    });
  }

  useEffect(() => {
    downloadpokemon();
  }, [id, pokemonName]);

  return (
    <div className="pokemon-details-wrapper">
      <img
        className="pokemon-details-image"
        src={pokemon.image}
      />

      <div className="pokemon-details-name">
        Name: <span>{pokemon.name}</span>
      </div>

      <div className="pokemon-details-height">
        Height:<span>{pokemon.height}</span>
      </div>

      <div className="pokemon-details-weight">
        Weight: <span>{pokemon.weight}</span>
      </div>

      <div className="pokemons-details-type">
        {pokemon.types &&
          pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>

      {pokemon.types && pokemon.similarPokemons && (
        <div>
          more {pokemon.types[0]} type pokemons

          <ul>
            {pokemon.similarPokemons.map((p) => (
              <li key={p.pokemon.url}>{p.pokemon.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;