import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Carrega os tipos da API
    axios.get('http://localhost:8000/api/types/')
      .then(res => setTypes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPokemon = {
      name,
      type
    };

    axios.post('http://localhost:8000/api/pokemons/', newPokemon)
      .then(res => {
        alert('Pokémon cadastrado com sucesso!');
        setName('');
        setType('');
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao cadastrar Pokémon');
      });
  };

  return (
    <div>
      <h2>Cadastrar Pokémon</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Tipo:</label>
          <select value={type} onChange={e => setType(e.target.value)} required>
            <option value="">Selecione um tipo</option>
            {types.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default PokemonForm;
