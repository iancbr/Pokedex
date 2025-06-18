import React, { useEffect, useState } from "react";
import axios from "axios";
import TipoCard from "../components/TipoCard";

function TipoList() {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/tipos/")
      .then((res) => setTipos(res.data))
      .catch((err) => console.error("Erro ao buscar tipos:", err));
  }, []);

  const handleDelete = (id) => {
    setTipos(tipos.filter((tipo) => tipo.id !== id));
  };

  const handleUpdate = (tipoAtualizado) => {
    setTipos(tipos.map((tipo) =>
      tipo.id === tipoAtualizado.id ? tipoAtualizado : tipo
    ));
  };

  return (
    <div>
      <h2>Tipos</h2>
      {tipos.map((tipo) => (
        <TipoCard
          key={tipo.id}
          tipo={tipo}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default TipoList;
