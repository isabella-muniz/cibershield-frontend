// frontend/src/components/security/AttackMonitoringPanel.js
import React, { useEffect, useState } from 'react';

export const AttackMonitoringPanel = () => {
  const [attacks, setAttacks] = useState([]);

  useEffect(() => {
    // Conectar ao WebSocket
    const ws = new WebSocket('ws://localhost:3000/api/attacks');

    // Quando uma mensagem é recebida, atualize o estado com o novo ataque
    ws.onmessage = (event) => {
      const attack = JSON.parse(event.data);
      setAttacks((prev) => [...prev, attack]);
    };

    // Fechar a conexão do WebSocket quando o componente for desmontado
    return () => ws.close();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Monitoramento de Ataques</h2>
      <ul>
        {attacks.map((attack, index) => (
          <li key={index}>
            <strong>Tipo:</strong> {attack.type} - <strong>Severidade:</strong> {attack.severity}
          </li>
        ))}
      </ul>
    </div>
  );
};