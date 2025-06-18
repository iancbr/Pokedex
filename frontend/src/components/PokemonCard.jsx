import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  margin: 8px;
  background-color: #f0f8ff;
`;

const Button = styled.button`
  margin-right: 8px;
  padding: 6px 12px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 300px;
  margin: 100px auto;
`;

function PokemonCard({ pokemon, onDelete, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState(pokemon.nome);
  const [tipo, setTipo] = useState(pokemon.tipo);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/pokemons/${pokemon.id}/`);
      onDelete(pokemon.id);
    } catch (error) {
      console.error("Erro ao excluir Pokémon:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/pokemons/${pokemon.id}/`, {
        nome,
        tipo,
      });
      onUpdate(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao editar Pokémon:", error);
    }
  };

  return (
    <Card>
      <h3>{pokemon.nome}</h3>
      <p>Tipo: {pokemon.tipo}</p>
      <Button onClick={() => setShowModal(true)}>Editar</Button>
      <Button onClick={handleDelete}>Excluir</Button>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Editar Pokémon</h2>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              style={{ marginBottom: "10px", width: "100%" }}
            />
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              placeholder="Tipo"
              style={{ width: "100%" }}
            />
            <div style={{ marginTop: "12px" }}>
              <Button onClick={handleUpdate}>Salvar</Button>
              <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Card>
  );
}

export default PokemonCard;
