import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// ------------- Styled components -------------
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
  width: 96%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Botao = styled.button`
  padding: 10px;
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

function PokemonForm() {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [tipo_primario, setTipoPrimario] = useState('');
  const [tipo_secundario, setTipoSecundario] = useState('');
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/tipos/')
      .then(res => setTipos(res.data))
      .catch(err => console.error('Erro ao buscar tipos:', err));
  }, []);

  //-- Função para lidar com o envio do formulário---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se o código é um número positivo
    // e se o nome não está vazio
    // e se o tipo primário foi selecionado
    const novoPokemon = {
      codigo,
      nome,
      tipo_primario,
      tipo_secundario: tipo_secundario || null,// Se não selecionado, envia null
    };

    axios.post('http://localhost:8000/api/pokemons/', novoPokemon)
      .then(() => {
        alert('Pokémon cadastrado com sucesso!');
        setCodigo('');
        setNome('');
        setTipoPrimario('');
        setTipoSecundario('');
      })
      .catch(err => {
        if (err.response?.data) {
          const messages = Object.values(err.response.data).flat().join('\n');
          alert(messages);
        } else {
          alert('Erro ao cadastrar Pokémon');
        }
      });
  };
  //-- Fim da função handleSubmit --

  // Renderiza o formulário de cadastro de Pokémon
  // com campos para código, nome, tipo primário e tipo secundário
  return (
    <Container>
      <Titulo>Cadastrar Pokémon</Titulo>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Código:</Label>
          <Input
            type="number"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Nome:</Label>
          <Input
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Tipo Primário:</Label>
          <Select
            value={tipo_primario}
            onChange={e => setTipoPrimario(e.target.value)}
            required
          >
            <option value="">Selecione um tipo</option>
            {tipos.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Tipo Secundário (opcional):</Label>
          <Select
            value={tipo_secundario}
            onChange={e => setTipoSecundario(e.target.value)}
          >
            <option value="">Nenhum</option>
            {tipos.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </Select>
        </FormGroup>

        <Botao type="submit">Cadastrar</Botao>
      </form>
    </Container>
  );
}

export default PokemonForm;
