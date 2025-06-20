import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import styled from "styled-components";

// ------------- Styled components -------------

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 16px;
  background-color:rgb(240, 248, 255);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;  
  max-width: 300px;
  &:hover {
    transform: scale(1.02);
  }
`;

const Button = styled.button`
  margin: 8px 4px 0 0;
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  background-color:rgb(25, 118, 210);
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color:rgb(18, 94, 163);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
`;
// ----------Final styled components -----------


function PokemonCard({ pokemon, onDelete, onUpdate }) {
  const [showModal, setShowModal] = useState(false); 
  const [nome, setNome] = useState(pokemon.nome); 
  const [tipoPrimario, setTipoPrimario] = useState(pokemon.tipo_primario);
  const [tipoSecundario, setTipoSecundario] = useState(pokemon.tipo_secundario || "");
  const [tipos, setTipos] = useState([]);

  // Carrega os tipos de Pokémon ao montar o componente
  // usado para garantir que a lista de tipos esteja sempre atualizada
  useEffect(() => {
    axios.get("http://localhost:8000/api/tipos/")
      .then(res => setTipos(res.data))
      .catch(err => console.error("Erro ao carregar tipos:", err));
  }, []);

  //------- Função para excluir o Pokémon --------
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/pokemons/${pokemon.id}/`);
      onDelete(pokemon.id);
    } catch (error) {
      console.error("Erro ao excluir Pokémon:", error); 
    }
  };
  //------- FIM Função para excluir o Pokémon -------

  //------- Função para atualizar o Pokémon -------
  const handleUpdate = async () => {
    if (tipoPrimario === tipoSecundario && tipoSecundario !== null) { // Verifica se os tipos são iguais
      alert("Tipo primário e secundário não podem ser iguais.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/pokemons/${pokemon.id}/`, {
        codigo: pokemon.codigo, // Mantém o código original
        nome,
        tipo_primario: tipoPrimario,
        tipo_secundario: tipoSecundario === "" ? null : tipoSecundario, // Converte para null se vazio
      });
      onUpdate(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao editar Pokémon:", error.response?.data || error); 
      alert("Erro ao editar Pokémon");
    }
  };
  //------- FIM Função para atualizar o Pokémon -------

  const modal = (
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
          onChange={(e) =>
            setTipoSecundario(e.target.value === "" ? null : Number(e.target.value))
          }
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
  );

  return (
    <>
      <Card>
        <h3>{pokemon.codigo} - {pokemon.nome}</h3>
        <p><strong>Tipo primário:</strong> {pokemon.tipo_primario_nome}</p>
        <p><strong>Tipo secundário:</strong> {pokemon.tipo_secundario_nome || "Nenhum"}</p>

        <Button onClick={() => setShowModal(true)}>Editar</Button>
        <Button onClick={handleDelete}>Excluir</Button>
      </Card>

      {showModal && ReactDOM.createPortal(modal, document.body)}
    </>
  );
}

export default PokemonCard;
