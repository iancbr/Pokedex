import React, { useState } from "react";
import axios from "axios";

function TipoForm() {
  const [nome, setNome] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/tipos/", { nome });
      alert("Tipo cadastrado com sucesso!");
      setNome(""); // limpa o campo após o envio
    } catch (error) {
      console.error("Erro ao cadastrar tipo:", error);
      alert("Erro ao cadastrar tipo.");
    }
  };

  return (
    <div>
      <h2>Cadastrar Tipo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Tipo:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TipoForm;
