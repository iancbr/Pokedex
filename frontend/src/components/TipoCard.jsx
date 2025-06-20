import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactDOM from "react-dom";


// ------Styled components------
const Card = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 16px;
  background-color:rgb(240, 248, 255);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

// -------Final styled components-----

function TipoCard({ tipo, onDelete, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [nomeEditado, setNomeEditado] = useState(tipo.nome);

  // ------Função para lidar com a exclusão do tipo------
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/tipos/${tipo.id}/`);
      onDelete(tipo.id);
    } catch (error) {
      if (error.response?.data?.erro) { 
        alert(error.response.data.erro);
      } else { 
        console.error("Erro ao excluir tipo:", error); 
        alert("Erro ao excluir tipo.");
      }
    }
  };
  // ------ FIM Função para lidar com a exclusão do tipo------

  // ------Função para lidar com a atualização do tipo------
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/tipos/${tipo.id}/`, {
        nome: nomeEditado,
      });
      onUpdate(response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao editar tipo:", error);
    }
  };
  // ------ FIM Função para lidar com a atualização do tipo------

  const modal = (
    <ModalOverlay onClick={() => setShowModal(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: "16px", textAlign: "center" }}>Editar Tipo</h2>
        <Input
          type="text"
          value={nomeEditado}
          onChange={(e) => setNomeEditado(e.target.value)}
        />
        <div style={{ textAlign: "center" }}>
          <Button onClick={handleUpdate}>Salvar</Button>
          <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );

  return (
    <Card>
      <h3>{tipo.nome}</h3>
      <div>
        <Button onClick={() => setShowModal(true)}>Editar</Button>
        <Button onClick={handleDelete}>Excluir</Button>
      </div>
      {showModal && ReactDOM.createPortal(modal, document.body)}
    </Card>
  );
}

export default TipoCard;
