import { useEffect, useState } from "react";

const Header = () => {
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000"
        );
        const data = await response.json();
        setPokemonList(
          data.results.map((pokemon: { name: string }) => pokemon.name)
        );
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setError("Failed to load Pokémon data. Please try again later.");
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    if (query.length >= 3) {
      const results = pokemonList.filter((pokemon) =>
        pokemon.toLowerCase().includes(query)
      );
      setFilteredPokemon(results.slice(0, 10));
    } else {
      setFilteredPokemon([]);
    }
  };

  return (
    <header className="flex bg-danger-light h-[5rem] sticky top-0 w-full">
      <nav className="container flex flex-col items-center justify-center space-y-2 mobile:justify-between mobile:flex-row">
        <div>
          <h1 className="flex items-baseline text-xl font-bold mobile:flex-col mobile:text-2xl laptop:text-3xl">
            Pokedex&nbsp;
            <span className="text-sm mobile:text-base">
              by{" "}
              <a
                href="https://github.com/sakakara"
                target="_blank"
                className="nav-link"
              >
                Sakakara
              </a>{" "}
              &{" "}
              <a
                href="https://github.com/tidjee-dev"
                target="_blank"
                className="nav-link"
              >
                Tidjee
              </a>
            </span>
          </h1>
        </div>
        <div className="text-base font-semibold mobile:text-lg">
          <input
            type="text"
            list="pokemon-options"
            placeholder="Search a Pokemon ..."
            className="p-1 rounded-lg placeholder:text-center mobile:placeholder:pl-2 mobile:placeholder:text-left bg-danger-subtle placeholder:text-muted"
            aria-label="Search for a Pokémon"
            onChange={handleSearch}
          />
          <datalist id="pokemon-options">
            {filteredPokemon.map((pokemon) => (
              <option key={pokemon} value={pokemon}>
                {pokemon}
              </option>
            ))}
          </datalist>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </nav>
    </header>
  );
};

export default Header;
