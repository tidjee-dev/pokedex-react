interface PokemonData {
  name: string;
  displayName?: string;
  id: number;
  weight: number;
  height: number;
  image: string;
  cries?: {
    latest: string;
    legacy: string;
  };
  type: { name: string }[];
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export default PokemonData;
