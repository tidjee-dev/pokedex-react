import { useEffect, useState } from "react";
import PokemeonData from "../interface/PokemonData";

import { IoMdArrowRoundBack } from "react-icons/io";

const PokemonCard = ({
  name,
  onBack,
}: {
  name: string;
  onBack: () => void;
}) => {
  const [pokemonData, setPokemonData] = useState<PokemeonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setError("Failed to load Pokémon details. Please try again later.");
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (error) {
    return <p className="badge-danger">{error}</p>;
  }

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button
        onClick={onBack}
        className="absolute top-0 flex items-center gap-2 left-4 btn-sm btn-danger"
      >
        <IoMdArrowRoundBack />
        Back to List
      </button>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">{pokemonData.name}</h2>
        <img src={pokemonData.image} alt={pokemonData.name} />
        <p>Height: {pokemonData.height / 10} m</p>
        <p>Weight: {pokemonData.weight / 10} kg</p>
      </div>
    </>
  );
};

export default PokemonCard;
