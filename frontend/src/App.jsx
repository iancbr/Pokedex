import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import TipoList from "./pages/TipoList";
import PokemonForm from "./pages/PokemonForm";
import TipoForm from "./pages/TipoForm";

function App() {
  return (
    <Router>
      <div>
        <h1>Pokédex</h1>

        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Pokémons</Link> |{" "}
          <Link to="/tipos">Tipos</Link> |{" "}
          <Link to="/cadastrar">Cadastrar Pokémon</Link> |{" "}
          <Link to="/cadastrar-tipo">Cadastrar Tipo</Link>
        </nav>

        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/tipos" element={<TipoList />} />
          <Route path="/cadastrar" element={<PokemonForm />} />
          <Route path="/cadastrar-tipo" element={<TipoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
