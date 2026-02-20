
import { useState, useEffect } from 'react';

export default function Home() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState('');
  const [mensagens, setMensagens] = useState([]);

  // Função para buscar as últimas 25 mensagens
  const fetchMensagens = async () => {
    try {
      const res = await fetch('http://localhost:5000' + '/mensagens');
      if (res.ok) {
        const data = await res.json();
        setMensagens(data.slice(-25).reverse());
      }
    } catch (err) {
      // Ignora erro de fetch
    }
  };

  useEffect(() => {
    fetchMensagens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    try {
      const res = await fetch('http://localhost:5000' + '/mensagem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, mensagem })
      });
      if (res.ok) {
        setStatus('Mensagem enviada com sucesso!');
        setNome('');
        setMensagem('');
        fetchMensagens();
      } else {
        setStatus('Erro ao enviar mensagem.');
      }
    } catch (err) {
      setStatus('Erro de conexão. ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Enviar Mensagem</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensagem"
          value={mensagem}
          onChange={e => setMensagem(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {status && <p>{status}</p>}
      {/* Tabela de mensagens */}
      <h3 style={{ marginTop: 32 }}>Últimas 25 mensagens</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: 4 }}>Nome</th>
            <th style={{ border: '1px solid #ccc', padding: 4 }}>Mensagem</th>
          </tr>
        </thead>
        <tbody>
          {mensagens.length === 0 && (
            <tr><td colSpan={2} style={{ textAlign: 'center', color: '#888' }}>Nenhuma mensagem encontrada.</td></tr>
          )}
          {mensagens.map((m, i) => (
            <tr key={i}>
              <td style={{ border: '1px solid #ccc', padding: 4 }}>{m.nome}</td>
              <td style={{ border: '1px solid #ccc', padding: 4 }}>{m.mensagem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
