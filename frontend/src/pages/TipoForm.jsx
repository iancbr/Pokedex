import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


// ------Styled components------
const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 32px;
  border-radius: 12px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #1976d2;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Botao = styled.button`

  padding: 10px;;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #125ea3;
  }
`;
// ----------Final styled components -----------


function TipoForm() {
  const [nome, setNome] = useState('');
  
  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/tipos/', { nome })
      .then(() => {
        alert('Tipo cadastrado com sucesso!');
        setNome('');
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao cadastrar tipo');
      });
  };
  //-- Fim da função handleSubmit---


  return (
    <Container>
      <Titulo>Cadastrar Tipo</Titulo>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </FormGroup>
        <Botao type="submit">Cadastrar</Botao>
      </form>
    </Container>
  );
}

export default TipoForm;
