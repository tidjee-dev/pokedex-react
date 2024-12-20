import { useState, useEffect } from "react";
import PokemonData from "../interface/PokemonData";

const PokemonDetails = (
  pokemonName: string
) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async (pokemonName: string) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Pokemon not found."
              : "Failed to fetch Pokemon details."
          );
        }
        const data = await response.json();

        const transformedData: PokemonData = {
          name: data.name,
          displayName: data.name.replace(/-/g, " "),
          id: data.id,
          weight: data.weight,
          height: data.height,
          image: data.sprites.other["official-artwork"].front_default,
          cries: {
            latest: data.cries.latest,
            legacy: data.cries.legacy,
          },
          type: data.types.map((t: { type: { name: string } }) => t.type),
          abilities: data.abilities,
          moves: data.moves,
          stats: data.stats,
        };

        setPokemonData(transformedData);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setError(`Failed to load Pokemon details. Please try again later!`);
      }
    };

    fetchPokemonDetails(pokemonName);
  }, []);

  if (error) {
    return <p className="badge-danger badge-lg">{error}</p>;
  }

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  return { pokemonData, error };
};

export default PokemonDetails;
