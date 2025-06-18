import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoPokemon = {
      codigo,
      nome,
      tipo_primario: tipo_primario,
      tipo_secundario: tipo_secundario || null, // envia null se vazio
    };


    axios.post('http://localhost:8000/api/pokemons/', novoPokemon)
      .then(res => {
        alert('Pokémon cadastrado com sucesso!');
        setCodigo('');
        setNome('');
        setTipoPrimario('');
        setTipoSecundario('');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          const messages = Object.values(err.response.data).flat().join('\n');
          alert(messages);
        } else {
          console.error(err);
          alert('Erro ao cadastrar Pokémon');
        }
      });
  };

  return (
    <div>
      <h2>Cadastrar Pokémon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Código:</label>
          <input
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
            required
            type="number"
          />
        </div>
        <div>
          <label>Nome:</label>
          <input value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Tipo Primário:</label>
          <select value={tipo_primario} onChange={e => setTipoPrimario(e.target.value)} required>
            <option value="">Selecione um tipo</option>
            {tipos.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Tipo Secundário (opcional):</label>
          <select value={tipo_secundario} onChange={e => setTipoSecundario(e.target.value)}>
            <option value="">Nenhum</option>
            {tipos.map(t => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default PokemonForm;
