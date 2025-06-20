import React, { useEffect, useState } from "react";
import axios from "axios";
import TipoCard from "../components/TipoCard";
import styled from "styled-components";

// ------Styled components------
const Container = styled.div`
  padding: 16px;
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
`;
// ----------Final styled components -----------

function TipoList() {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tipos/")
      .then((res) => setTipos(res.data))
      .catch((err) => console.error("Erro ao buscar tipos:", err));
  }, []);


  // Função para deletar um tipo
  const handleDelete = (id) => {
    setTipos(tipos.filter((tipo) => tipo.id !== id));
  };

  // Função para atualizar um tipo
  const handleUpdate = (tipoAtualizado) => {
    setTipos(tipos.map((tipo) =>
      tipo.id === tipoAtualizado.id ? tipoAtualizado : tipo 
    ));
  };

  return (
    <Container>
      <Titulo>Tipos</Titulo>
      <Grid>
        {tipos.map((tipo) => (
          <TipoCard
            key={tipo.id}
            tipo={tipo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </Grid>
    </Container>
  );
}

export default TipoList;
