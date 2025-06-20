import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import TipoList from "./pages/TipoList";
import PokemonForm from "./pages/PokemonForm";
import TipoForm from "./pages/TipoForm";
import styled from "styled-components";

// ------Styled components------
const Container = styled.div`
  padding: 32px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const Titulo = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  color:rgb(0, 0, 0);
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
`;

const NavLink = styled(Link)`
  padding: 10px 16px;
  background-color: #1976d2;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background-color: #125ea3;
  }
`;
// ----------Final styled components -----------

function App() {
  return (
    <Router>
      <Container>
        <Titulo>Pokédex</Titulo>

        {/* Barra de navegação */}
        <Nav>
          <NavLink to="/">Pokémons</NavLink>
          <NavLink to="/tipos">Tipos</NavLink>
          <NavLink to="/cadastrar">Cadastrar Pokémon</NavLink>
          <NavLink to="/cadastrar-tipo">Cadastrar Tipo</NavLink>
        </Nav>
          {/* Definindo as rotas da aplicação */}
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/tipos" element={<TipoList />} />
          <Route path="/cadastrar" element={<PokemonForm />} />
          <Route path="/cadastrar-tipo" element={<TipoForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
