import { PokemonDetails, PokemonItem } from "../types";

export const fetchPokemon = async (): Promise<PokemonItem[]> => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon list");
    }
    const data = await response.json();

    // Map over each Pokemon and fetch additional details
    const pokemonDetailsPromises = data.results.map(
      async (pokemon: PokemonItem) => {
        const detailResponse = await fetch(pokemon.url);
        if (!detailResponse.ok) {
          throw new Error(`Failed to fetch details for ${pokemon.name}`);
        }
        const details:PokemonDetails = await detailResponse.json();
        return {
          ...pokemon,
          types: details.types, // Add the types information to each Pokémon
        };
      }
    );

    // Use Promise.all to wait for all fetches to complete
    return await Promise.all(pokemonDetailsPromises);
  } catch (error){
    console.log(error)
    throw error
  }
};
