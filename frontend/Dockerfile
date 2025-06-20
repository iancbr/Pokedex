# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração do projeto para o contêiner
COPY ./package*.json ./
COPY . .

# Instala as dependências do projeto
RUN rm -rf node_modules package-lock.json && npm install --legacy-peer-deps


# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando padrão: inicia o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev"]
