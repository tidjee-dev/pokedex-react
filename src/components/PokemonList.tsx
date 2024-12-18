import { useEffect, useState } from "react";
import PokemonData from "../interface/PokemonData"; // Assuming you have this interface for Pokémon data

const PokemonList = ({ onSelect }: { onSelect: (name: string) => void }) => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<number>(50);
  const loadMoreThreshold = 20;

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000"
        );
        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(
            async (pokemon: { name: string; url: string; id: number }) => {
              const urlParts = pokemon.url.split("/");
              pokemon.id = parseInt(urlParts[urlParts.length - 2]);
              return {
                name: pokemon.name,
                displayName:
                  pokemon.name.charAt(0).toUpperCase() +
                  pokemon.name.slice(1).replace("-", " "),
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
              };
            }
          )
        );
        setPokemonList(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setError("Failed to load Pokémon data. Please try again later.");
      }
    };

    fetchPokemonList();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 100
    ) {
      setVisibleItems((prev) => prev + loadMoreThreshold);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (error) {
    return <p className="badge-lg badge-danger">{error}</p>;
  }

  return (
    <div className="z-0 grid w-full grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
      {pokemonList.slice(0, visibleItems).map((pokemon) => (
        <div
          key={pokemon.name}
          onClick={() => onSelect(pokemon.name)}
          className="p-4 transition-all border rounded-lg cursor-pointer hover:shadow-lg"
        >
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="object-contain w-full mb-2"
          />
          <h3 className="text-lg font-medium text-center">
            {pokemon.displayName}
          </h3>
        </div>
      ))}
      {visibleItems < pokemonList.length && (
        <div className="mt-4 text-center col-span-full">
          <p className="">Scroll to load more...</p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
