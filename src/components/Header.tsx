import { useEffect, useState } from "react";
import { Link } from "react-router";

// import PokemonData from "../interface/PokemonData";

const Header = () => {
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
          data.results.map((pokemon: { name: string }) => {
            return pokemon.name.replace(/-/g, " ");
          })
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const input = document.getElementById(
          "searchInput"
        ) as HTMLInputElement;
        input.value = "";
        setFilteredPokemon([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectPokemon = () => {
    const input = document.getElementById("searchInput") as HTMLInputElement;

    setFilteredPokemon([]);
    input.value = "";
  };

  return (
    <header className="sticky top-0 flex w-full bg-danger-light z-[9999] h-[5rem]">
      <nav className="container flex flex-col items-center justify-center space-y-2 mobile:justify-between mobile:flex-row">
        <div className="flex flex-row items-center mobile:flex-col mobile:text-2xl laptop:text-3xl mobile:items-start">
          <Link to="/" className="hover:text-dark">
            <h1 className="flex text-xl font-bold ">Pokedex&nbsp;</h1>
          </Link>
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
        </div>
        <div className="relative text-base font-semibold mobile:text-lg">
          <input
            type="text"
            id="searchInput"
            placeholder="Search a Pokémon..."
            className="w-full p-1 text-center border border-gray-300 rounded-lg shadow-sm mobile:pl-2 mobile:text-left bg-danger-subtle placeholder:text-muted "
            aria-label="Search for a Pokémon"
            onChange={handleSearch}
          />
          {filteredPokemon.length > 0 && (
            <ul
              className="absolute left-0 z-10 w-full mt-2 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 bg-opacity-40"
              aria-label="Search results"
              role="listbox"
            >
              {filteredPokemon.map((pokemon) => (
                <Link key={pokemon} to={`/pokemon/${pokemon}`}>
                  <li
                    tabIndex={-1}
                    onClick={() => handleSelectPokemon()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSelectPokemon();
                      }
                    }}
                    className="p-1 capitalize cursor-pointer hover:bg-danger-subtle mobile:text-left focus:border-2 focus:outline-danger-light focus:bg-danger-subtle backdrop-blur-md"
                    role="option"
                    aria-label={`Select Pokémon: ${pokemon}`}
                  >
                    {pokemon}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
