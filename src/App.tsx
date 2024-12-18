import { useState } from "react";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import PokemonCard from "./components/PokemonCard";

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const handleSelectPokemon = (name: string | null) => {
    setSelectedPokemon(name);
  };

  return (
    <div className="grid grid-rows-[5rem_auto_5rem] gap-6 min-h-screen">
      <Header onSearch={(name) => handleSelectPokemon(name)} />
      <main className="container relative flex flex-col items-center justify-center gap-6">
        {selectedPokemon ? (
          <PokemonCard
            name={selectedPokemon}
            onBack={() => handleSelectPokemon(null)}
          />
        ) : (
          <PokemonList onSelect={handleSelectPokemon} />
        )}
      </main>
    </div>
  );
}
