import axios from "axios";
// axios API se data fetch/download karne ke liye use hota hai

import { useEffect, useState } from "react";
// useState data ko store/update karne ke liye
// useEffect component load hone ya kisi state ke change hone par function chalane ke liye

import Pokemon from "../pokemon/pokemon";
// Pokemon component ko import kar rahe hain
// Har Pokemon ka name aur image is component ko pass karenge
import "./PokemonList.css";


function PokemonList() {

    // const [pokemonList, setpokemonList] = useState([]);
    // // pokemonList ke andar hum API se aaye Pokemon ka data store karenge
    // // starting mein empty array hai []

    // const [isLoading, setIsLoading] = useState(true);
    // // Ye check karega ki data abhi load ho raha hai ya nahi
    // // starting mein true hai, matlab loading chal rahi hai


    // const [pokedexUrl, setPokedexUrl] = useState(
    //     "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
    // );
    // // Ye current API URL ko store karega
    // // Is URL se 20 Pokemon ki list milegi
    // // setPokedexUrl ki help se hum Next/Previous par URL change karenge


    // const [prevurl, setPrevurl] = useState();
    // // API se previous page ka URL yahan store hoga
    // // Agar previous page nahi hai to ye undefined hoga


    // const [nexturl, setNexturl] = useState();
    // // API se next page ka URL yahan store hoga
    // // Agar next page nahi hai to ye undefined hoga


    const[pokemonListState, setpokemonListState]= useState({
       pokemonList:[],
       isLoading: true,
       pokedexUrl: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
       nexturl: '',
       prevurl: '',

    })


    async function downloadPokemons() {

        // setIsLoading(true);
        setpokemonListState({...pokemonListState, isLoading:true});
        // Jab bhi Pokemon download honge, loading true kar do


        const response = await axios.get(pokemonListState.pokedexUrl);
        // Ye current pokedexUrl par API request bhej raha hai
        // await ka matlab API ka response aane tak wait karo

 
        //THIS DOWNLOAD LIST OF 20 POKEMONS
        // Ye API se 20 Pokemon ki basic list download karta hai


        const pokemonResult = response.data.results;
        // API ke response mein results ke andar Pokemon ki list hoti hai
        // Isme Pokemon ka name aur URL milta hai


        //WE GET THE ARAY OF POKEMON FROM RESULT
        // Hume results ke andar se Pokemon ka array mil gaya


        console.log(response.data);
        // API ka complete response console mein dekhne ke liye


        // setpokemonListState();
        // API se previous page ka URL nikal kar prevurl mein store kar rahe hain


        setpokemonListState((state)=>({
            ...state, 

            nexturl:response.data.next,
             prevurl:response.data.previous
             

        }));
        // API se next page ka URL nikal kar nexturl mein store kar rahe hain


        //ITERATING OVER THE ARRAY OF POKEMONS,AND USING THERE URL,TO CREATE AN ARRAY OF PROMIES
        // Har Pokemon ke URL ko use karke uska detailed data download karenge


        // THAT WILL DOWNLOAD THOSE 20POKEMINS
        // Ye 20 Pokemon ke liye 20 API requests create karega


        const pokemonResultpromise = pokemonResult.map((pokemon) =>
            axios.get(pokemon.url)
        );
        // pokemonResult ke har Pokemon par map chalega
        // Har Pokemon ke URL par axios.get() request jayegi
        // Isse promises ka array banega


        //PASSING THE PROMISE ARRAY TO AXIOS ALL
        // Ab saare promises ko axios.all() mein pass kar rahe hain


        const pokemonData = await axios.all(pokemonResultpromise);
        // axios.all() saari 20 API requests complete hone ka wait karega
        // Complete hone ke baad detailed Pokemon data milega


        //ARRAY OF 20 POKEMON DEATAILD DATA
        // Ab pokemonData mein 20 Pokemon ka detailed data hai


        console.log(pokemonData);
        // Detailed Pokemon data console mein check karne ke liye


        //NOW ITERATE ON THE DATA OF EACH POKEMON, AND EXTRACT ID, NAME ,IMAGE,TYPES
        // Ab hum har Pokemon ke detailed data par map laga rahe hain
        // Aur sirf wahi data nikalenge jo hume chahiye:
        // ID, NAME, IMAGE aur TYPES


        const pokeListResult = pokemonData.map((pokedata) => {

            const pokemon = pokedata.data;
            // Axios ke response ke andar actual Pokemon data data property mein hota hai
            // Isliye pokedata.data ko pokemon variable mein store kar rahe hain


            return {
                id: pokemon.id,
                // Pokemon ki unique ID


                name: pokemon.name,
                // Pokemon ka naam


                image: pokemon.sprites.other
                    ? pokemon.sprites.other.dream_world.front_default
                    : pokemon.sprites.front_shiny,
                // Agar dream_world image available hai to usko use karo
                // Agar available nahi hai to front_shiny image use karo


                types: pokemon.types
                // Pokemon ke types store kar rahe hain

                

            };
        });


        console.log(pokeListResult);
        // Final clean Pokemon data console mein check karne ke liye


        setpokemonListState((state)=>({
            ...state,
            pokemonList:pokeListResult,
             isLoading:false
            }));
        // Ab final Pokemon data ko pokemonList state mein store kar rahe hain
        // Data load ho gaya, isliye loading ko false kar diya
    }


    useEffect(() => {
        downloadPokemons();
        // Component load hone par downloadPokemons() function chalega

    }, [pokemonListState.pokedexUrl]);
    // Jab bhi pokedexUrl change hoga
    // downloadPokemons() dobara chalega
    // Isi wajah se Next/Previous button kaam karega


    return (
        <>
            <div className="pokemon-list-wrapper">

                <div className="pokemon-wrapper">

                    {pokemonListState.isLoading
                        ? "Loading...."
                        // Agar isLoading true hai to Loading.... show hoga

                        :pokemonListState.pokemonList.map((p) => (
                            <Pokemon
    name={p.name}
    // Pokemon ka name Pokemon component ko bhej rahe hain

    image={p.image}
    // Pokemon ki image Pokemon component ko bhej rahe hain

    id={p.id}
    // Pokemon ki ID Pokemon component ko bhej rahe hain

    key={p.id}
    // React ko har Pokemon ki unique ID de rahe hain
/>
                        ))
                    }

                </div>


                <div className="controles">

    <button
        disabled={!pokemonListState.prevurl}
        // Agar previous URL nahi hai to button disabled rahega
        onClick={() => {
            const urltoset = pokemonListState.prevurl;
            setpokemonListState({...pokemonListState, pokedexUrl: urltoset});
        }}
        // Previous button click hone par
        // pokedexUrl ko previous URL se replace karenge
    >
        previous
    </button>


    <button
        disabled={!pokemonListState.nexturl}
        // Agar next URL nahi hai to button disabled rahega
        onClick={() => {
            const urltoset = pokemonListState.nexturl;
            setpokemonListState({...pokemonListState, pokedexUrl: urltoset});
        }}
        // Next button click hone par
        // pokedexUrl ko next URL se replace karenge
    >
        next
    </button>

</div>

            </div>
        </>
    );
}

export default PokemonList;
// PokemonList component ko doosri file mein import karne ke liye export kar rahe hain