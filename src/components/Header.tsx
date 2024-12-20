import { useEffect, useState } from "react";

const Header = ({ onSearch }: { onSearch: (name: string) => void }) => {
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<string[]>([]);

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

  const handleSelectPokemon = (name: string) => {
    onSearch(name);
    setFilteredPokemon([]);
  };

  return (
    <header className="sticky top-0 flex w-full bg-danger-light z-[9999] h-[5rem]">
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
        {/* <div className="text-base font-semibold mobile:text-lg">
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
              <option
                key={pokemon}
                value={pokemon}
                aria-label={pokemon}
                onClick={() => handleSelectPokemon(pokemon)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSelectPokemon(pokemon);
                  }
                }}
                className="cursor-pointer"
              >
                {pokemon}
              </option>
            ))}
          </datalist>
        </div> */}

        <div className="relative text-base font-semibold mobile:text-lg">
          <input
            type="text"
            placeholder="Search a Pokémon..."
            className="w-full p-1 text-center border border-gray-300 rounded-lg shadow-sm mobile:pl-2 mobile:text-left bg-danger-subtle placeholder:text-muted "
            aria-label="Search for a Pokémon"
            onChange={handleSearch}
          />
          {filteredPokemon.length > 0 && (
            <ul className="absolute left-0 z-10 w-full mt-2 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 bg-opacity-40">
              {filteredPokemon.map((pokemon) => (
                <li
                  key={pokemon}
                  tabIndex={0}
                  onClick={() => handleSelectPokemon(pokemon)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSelectPokemon(pokemon);
                    }
                  }}
                  className="p-1 cursor-pointer hover:bg-danger-subtle mobile:text-left focus:border-2 focus:outline-danger-light focus:bg-danger-subtle backdrop-blur-md"
                >
                  {pokemon}
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
