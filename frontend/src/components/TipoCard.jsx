import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 12px;
  border-radius: 8px;
  margin: 8px;
  background-color: #f7f7f7;
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

function TipoCard({ tipo, onDelete, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [nomeEditado, setNomeEditado] = useState(tipo.nome);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/tipos/${tipo.id}/`);
      onDelete(tipo.id);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.erro) {
        alert(error.response.data.erro);
      } else {
        console.error("Erro ao excluir tipo:", error);
        alert("Erro ao excluir tipo.");
      }
    }
  };

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

  return (
    <Card>
      <h3>{tipo.nome}</h3>
      <Button onClick={() => setShowModal(true)}>Editar</Button>
      <Button onClick={handleDelete}>Excluir</Button>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Editar Tipo</h2>
            <input
              type="text"
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
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

export default TipoCard;
