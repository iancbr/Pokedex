import React, { useState } from 'react';
import axios from 'axios';

function TipoForm() {
  const [nome, setNome] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/tipos/', { nome })
      .then(res => {
        alert('Tipo cadastrado com sucesso!');
        setNome('');
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao cadastrar tipo');
      });
  };

  return (
    <div>
      <h2>Cadastrar Tipo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TipoForm;
