import { Link } from "react-router";
import { useEffect, useState } from "react";
import PokemonData from "../interface/PokemonData";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<number>(20);
  const loadMoreThreshold = 20;

  useEffect(() => {
    const fetchPokemonList = async (limit: number = 1025) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );

        const data = await response.json();
        const pokemonData = await Promise.all(
          data.results.map(
            async (pokemon: { name: string; url: string; id: number }) => {
              const urlParts = pokemon.url.split("/");
              pokemon.id = parseInt(urlParts[urlParts.length - 2]);
              return {
                id: pokemon.id,
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

    fetchPokemonList(visibleItems + loadMoreThreshold);
  }, [visibleItems]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 500
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

  if (!pokemonList.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="z-0 grid w-full grid-cols-1 gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
      {pokemonList.slice(0, visibleItems).map((pokemon) => (
        <div
          key={pokemon.id}
          className="p-4 transition-all border rounded-lg cursor-pointer hover:shadow-lg"
        >
          <Link to={`/pokemon/${pokemon.name}`}>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="object-contain w-full mb-2"
            />
            <h3 className="text-lg font-medium text-center">
              {pokemon.displayName}
            </h3>
          </Link>
        </div>
      ))}

      {visibleItems < pokemonList.length && (
        <div className="mt-4 text-center col-span-full">
          <p>Scroll to load more...</p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
