-- Criação da tabela necessária para o dotnet-app
CREATE TABLE IF NOT EXISTS mensagens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    mensagem TEXT NOT NULL
);
