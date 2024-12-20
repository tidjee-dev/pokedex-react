import { useParams, useNavigate } from "react-router";

import fetchPokemonDetails from "../api/fetchPokemonDetails";

import { IoMdArrowRoundBack } from "react-icons/io";

const PokemonCard = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const pokemonData = fetchPokemonDetails(name!);
  console.log("pokemonData:", pokemonData);

  return (
    <div className="container p-4 mx-auto mt-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-4 btn-danger btn"
      >
        <IoMdArrowRoundBack /> Back to List
      </button>
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-semibold capitalize">
          {pokemonData.displayName}{" "}
          <span className="text-gray-500">#{pokemonData.id}</span>
        </h2>
        <img
          src={pokemonData.image}
          alt={pokemonData.name}
          className="mx-auto mb-4 rounded-lg shadow-md"
        />
        <p className="mb-2 text-lg text-gray-700">
          <strong>Height:</strong> {pokemonData.height / 10} m
        </p>
        <p className="mb-4 text-lg text-gray-700">
          <strong>Weight:</strong> {pokemonData.weight / 10} kg
        </p>
      </div>

      {pokemonData.moves.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-lg font-semibold">Moves:</p>
          <ul className="text-gray-600 list-disc list-inside">
            {pokemonData.moves.slice(0, 10).map((m, index) => (
              <li key={index} className="inline-block mr-2">
                {m.move.name}
                {index < pokemonData.moves.length - 1 ? ", " : ""}
              </li>
            ))}
            {pokemonData.moves.length > 10 && <p>... and more</p>}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <p className="mb-2 text-lg font-semibold">Types:</p>
        <ul className="text-gray-600 list-disc list-inside">
          {pokemonData.type.map((t, index) => (
            <li key={index}>{t.name}</li>
          ))}
        </ul>
      </div>

      {pokemonData.cries && (
        <div className="mb-4">
          <p className="mb-2 text-lg font-semibold">Cries:</p>
          <ul className="flex flex-wrap justify-around w-full text-gray-600">
            {pokemonData.cries.latest && (
              <li className="w-full max-w-80">
                <strong className="block w-full text-center">Latest:</strong>
                <audio controls preload="none" className="w-full">
                  <source src={pokemonData.cries.latest} type="audio/mpeg" />
                </audio>
              </li>
            )}

            {pokemonData.cries.legacy && (
              <li className="w-full mt-4 max-w-80 tablet:m-0">
                <strong className="block w-full text-center">Legacy:</strong>
                <audio controls preload="none" className="w-full">
                  <source src={pokemonData.cries.legacy} type="audio/mpeg" />
                </audio>
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <p className="mb-2 text-lg font-semibold">Abilities:</p>
        <ul className="text-gray-600 list-disc list-inside">
          {pokemonData.abilities.map((a, index) => (
            <li key={index}>{a.ability.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 text-lg font-semibold">Stats:</p>
        <ul className="text-gray-600 list-disc list-inside">
          {pokemonData.stats.map((s, index) => (
            <li key={index}>
              {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonCard;
