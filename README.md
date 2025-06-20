# Pokédex Fullstack

Este é um projeto fullstack para cadastro, edição, listagem e exclusão de Pokémons e seus Tipos.

## Tecnologias Utilizadas

* **Frontend**: React + Vite + styled-components
* **Backend**: Django + Django REST Framework
* **Banco de dados**: SQLite
* **Containerização**: Docker + Docker Compose


---
## Rodar o projeto
É necessário clonar o projeto antes de qualquer uma das opções para execução

### Clonar repositório 

```bash
git clone https://github.com/iancbr/Pokedex.git
cd Pokedex

```
## Requisitos para rodar sem Docker

* Python 3.10+
* Node.js 18+
* npm 9+


### Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate #Linux
venv\Scripts\activate # Windows
pip install -r ../requirements.txt
python manage.py runserver
```

>Chamado para backend da Api dos pokémons : `http://localhost:8000/api/pokemons`
>Chamado para backend da Api dos tipos : `http://localhost:8000/api/tipos`

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

> A aplicação estará disponível em: `http://localhost:5173`

---

## Como rodar com Docker

### 1. Certifique-se que possui Docker e Docker Compose instalados.

### 2. Na raiz do projeto (`Pokedex/`), rode:

```bash
docker compose up --build
```

### 3. Acesse:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:8000](http://localhost:8000)

---

## Funcionalidades

* Listagem de Pokémons e Tipos
* Cadastro de novos Pokémons e Tipos
* Edição e exclusão de Pokémons e Tipos
* Filtragem por nome e tipo de Pokémon

---

## Observações

* O sistema é iniciado com os 150 Pokémons originais.
* Os Tipos devem ser cadastrados antes de vincular aos Pokémons.
* Todas as chamadas à API usam `http://localhost:8000/api/...`


