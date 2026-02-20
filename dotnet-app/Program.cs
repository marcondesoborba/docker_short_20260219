using Microsoft.AspNetCore.Mvc;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Adiciona suporte a CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

builder.Services.AddControllers();

var app = builder.Build();

// Usa o middleware de CORS
app.UseCors();

// Detecta se está rodando localmente (urls contém localhost)
string? connString = app.Configuration.GetConnectionString("DefaultConnection");
var isLocalhost = args.Any(a => a.Contains("localhost", StringComparison.OrdinalIgnoreCase));
if (string.IsNullOrEmpty(connString)) {
    if (isLocalhost) {
        connString = "Host=localhost;Port=5432;Database=mensagensdb;Username=admin;Password=Senha123";
    } else {
        connString = "Host=postgres;Port=5432;Database=mensagensdb;Username=admin;Password=Senha123";
    }
}

app.MapPost("/mensagem", async ([FromBody] MensagemDto dto) =>
{
    await using var conn = new NpgsqlConnection(connString);
    await conn.OpenAsync();
    var cmd = new NpgsqlCommand("INSERT INTO mensagens (nome, mensagem) VALUES (@nome, @mensagem)", conn);
    cmd.Parameters.AddWithValue("@nome", dto.Nome);
    cmd.Parameters.AddWithValue("@mensagem", dto.Mensagem);
    await cmd.ExecuteNonQueryAsync();
    return Results.Ok("Mensagem inserida com sucesso");
});

app.MapGet("/mensagens", async () =>
{
    var mensagens = new List<MensagemDto>();
    await using var conn = new NpgsqlConnection(connString);
    await conn.OpenAsync();
    var cmd = new NpgsqlCommand("SELECT nome, mensagem FROM mensagens", conn);
    await using var reader = await cmd.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
        mensagens.Add(new MensagemDto(reader.GetString(0), reader.GetString(1)));
    }
    return Results.Ok(mensagens);
});

app.Run();

public record MensagemDto(string Nome, string Mensagem);
