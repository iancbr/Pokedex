import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState("");

  const buscarPokemons = (termo = "") => {
    axios
      .get(`http://localhost:8000/api/pokemons/?search=${termo}`)
      .then((res) => setPokemons(res.data))
      .catch((err) => console.error("Erro ao buscar pokémons:", err));
  };

  useEffect(() => {
    buscarPokemons();
  }, []);

  const handleSearchChange = (e) => {
    const termo = e.target.value;
    setBusca(termo);
    buscarPokemons(termo);
  };

  const handleDelete = (id) => {
    setPokemons(pokemons.filter((p) => p.id !== id));
  };

  const handleUpdate = (pokemonAtualizado) => {
    setPokemons(
      pokemons.map((p) =>
        p.id === pokemonAtualizado.id ? pokemonAtualizado : p
      )
    );
  };

  return (
    <div>
      <h2>Pokémons</h2>

      <input
        type="text"
        placeholder="Buscar por nome ou tipo..."
        value={busca}
        onChange={handleSearchChange}
        style={{
          padding: "8px",
          marginBottom: "16px",
          width: "100%",
          maxWidth: "400px",
        }}
      />

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
