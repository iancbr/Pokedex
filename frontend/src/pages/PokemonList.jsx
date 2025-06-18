import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/pokemons/")
      .then((res) => setPokemons(res.data))
      .catch((err) => console.error("Erro ao buscar pokémons:", err));
  }, []);

  const handleDelete = (id) => {
    setPokemons(pokemons.filter((p) => p.id !== id));
  };

  const handleUpdate = (pokemonAtualizado) => {
    setPokemons(pokemons.map((p) =>
      p.id === pokemonAtualizado.id ? pokemonAtualizado : p
    ));
  };

  return (
    <div>
      <h2>Pokémons</h2>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default PokemonList;
