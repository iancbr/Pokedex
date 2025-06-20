# define python 3.10 como imagem base no contêiner
FROM python:3.10

# define app como diretório de trabalho
WORKDIR /app

# Copia todos arquivos do back para o app
COPY . .

# Instala as dependências do sistema
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

# Rodar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
