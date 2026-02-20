# docker_shot

Este projeto é composto por três partes principais:
- **dotnet-app**: Aplicação .NET
- **webapp**: Aplicação Next.js (Node.js)
- **postgresql**: Banco de dados PostgreSQL

## Requisitos
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (para rodar o webapp individualmente)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (para rodar o dotnet-app individualmente)

## Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/marcondesoborba/docker_short_20260219.git
cd docker_short_20260219
```

### 2. Rodar tudo com Docker Compose
```bash
docker-compose up --build
```
Acesse o webapp em http://localhost:3000

---

## Rodando os projetos individualmente

### dotnet-app
```bash
cd dotnet-app
dotnet run
```

### webapp
```bash
cd webapp
npm install
npm run dev
```
Acesse o webapp em http://localhost:3000

### postgresql
O banco de dados é inicializado automaticamente pelo Docker Compose. Para rodar manualmente:
```bash
docker build -t custom-postgres ./postgresql
docker run --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 custom-postgres
```


## Observações
```bash
docker-compose down
```
