import React, { useState, useEffect } from "react";
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
  const [tipoPrimario, setTipoPrimario] = useState(pokemon.tipo_primario);
  const [tipoSecundario, setTipoSecundario] = useState(pokemon.tipo_secundario || "");
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tipos/")
      .then(res => setTipos(res.data))
      .catch(err => console.error("Erro ao carregar tipos:", err));
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/pokemons/${pokemon.id}/`);
      onDelete(pokemon.id);
    } catch (error) {
      console.error("Erro ao excluir Pokémon:", error);
    }
  };

  const handleUpdate = async () => {
    if (tipoPrimario === tipoSecundario && tipoSecundario !== null) {
      alert("Tipo primário e secundário não podem ser iguais.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/pokemons/${pokemon.id}/`, {
        codigo: pokemon.codigo,  // Preservando o código original
        nome,
        tipo_primario: tipoPrimario,
        tipo_secundario: tipoSecundario === "" ? null : tipoSecundario,
        
      });
      onUpdate(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao editar Pokémon:", error.response?.data || error);
      alert("Erro ao editar Pokémon");
    }
  };

  return (
    <Card>
      <h3>{pokemon.codigo}-{pokemon.nome}</h3>
      <p>Tipo primário: {pokemon.tipo_primario_nome}</p>
      <p>Tipo secundário: {pokemon.tipo_secundario_nome || "null"}</p>
      <p>Código: {pokemon.codigo}</p>

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

            <select
              value={tipoPrimario}
              onChange={(e) => setTipoPrimario(e.target.value)}
              style={{ marginBottom: "10px", width: "100%" }}
            >
              <option value="">Selecione o tipo primário</option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
              ))}
            </select>

            <select
              value={tipoSecundario ?? ""}
              onChange={(e) => setTipoSecundario(e.target.value=== "" ? null : Number(e.target.value))}
              style={{ width: "100%" }}
            >
              <option value="">Nenhum tipo secundário</option>
              {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
              ))}
            </select>

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
