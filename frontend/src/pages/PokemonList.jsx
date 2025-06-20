import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import styled from "styled-components";

// ------Styled components------
const Container = styled.div`
  padding: 16px;
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

const InputBusca = styled.input`
  display: block;
  margin: 0 auto 24px auto;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 400px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;
// ----------Final styled components -----------

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [busca, setBusca] = useState("");

  // Função para buscar pokémons com base no termo de busca
  const buscarPokemons = (termo = "") => {
    axios
      .get(`http://localhost:8000/api/pokemons/?search=${termo}`)// Faz a requisição para buscar pokémons
      .then((res) => setPokemons(res.data))// Atualiza o estado com os pokémons filtrados
      .catch((err) => console.error("Erro ao buscar pokémons:", err));
  };

  useEffect(() => {
    buscarPokemons();
  }, []);

  // Função para lidar com a mudança no campo de busca
  // Atualiza o estado de busca e chama a função para buscar pokémons 
  const handleSearchChange = (e) => {
    const termo = e.target.value;
    setBusca(termo);
    buscarPokemons(termo);
  };

  // Função para lidar com a exclusão de um pokémon
  const handleDelete = (id) => {
    setPokemons(pokemons.filter((p) => p.id !== id));
  };
  
  // Função para lidar com a atualização de um pokémon
  const handleUpdate = (pokemonAtualizado) => {
    setPokemons(
      pokemons.map((p) =>
        p.id === pokemonAtualizado.id ? pokemonAtualizado : p
      )
    );
  };

  return (
    <Container>
      <Titulo>Pokémons</Titulo>
      <InputBusca
        type="text"
        placeholder="Buscar por nome ou tipo..."
        value={busca}
        onChange={handleSearchChange}
      />
      <Grid>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default PokemonList;
