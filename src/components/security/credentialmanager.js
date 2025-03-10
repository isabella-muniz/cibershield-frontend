// frontend/src/components/security/CredentialManager.js
import { useState, useEffect } from 'react';

export default function CredentialManager() {
  const [credentials, setCredentials] = useState([]);
  const [newCredential, setNewCredential] = useState({
    name: '',
    username: '',
    password: '',
    type: 'website'
  });

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await fetch('/api/security/credentials');
      const data = await response.json();
      setCredentials(data.credentials);
    } catch (error) {
      console.error('Erro ao carregar credenciais:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/security/credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCredential),
      });

      if (response.ok) {
        setNewCredential({
          name: '',
          username: '',
          password: '',
          type: 'website'
        });
        fetchCredentials();
      }
    } catch (error) {
      console.error('Erro ao salvar credencial:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gerenciador de Credenciais</h2>
      
      {/* Formulário para adicionar nova credencial */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            value={newCredential.name}
            onChange={(e) => setNewCredential({...newCredential, name: e.target.value})}
            placeholder="Nome da credencial"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={newCredential.username}
            onChange={(e) => setNewCredential({...newCredential, username: e.target.value})}
            placeholder="Usuário"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={newCredential.password}
            onChange={(e) => setNewCredential({...newCredential, password: e.target.value})}
            placeholder="Senha"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <select
            value={newCredential.type}
            onChange={(e) => setNewCredential({...newCredential, type: e.target.value})}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="website">Website</option>
            <option value="database">Banco de Dados</option>
            <option value="api">API</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Adicionar Credencial
        </button>
      </form>

      {/* Lista de credenciais */}
      <div className="space-y-4">
        {credentials.map((cred, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow rounded-lg"
          >
            <div className="font-bold">{cred.name}</div>
            <div>Tipo: {cred.type}</div>
            <div>Usuário: {cred.username}</div>
            <div>
              <button
                onClick={() => {/* Implementar visualização segura da senha */}}
                className="text-blue-500 hover:text-blue-600"
              >
                Mostrar Senha
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}