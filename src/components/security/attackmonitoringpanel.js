// frontend/src/components/security/AttackMonitoringPanel.js
import { useState, useEffect } from 'react';

export default function AttackMonitoringPanel() {
  const [attacks, setAttacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001/ws/attacks');
    
    ws.onmessage = (event) => {
      const attack = JSON.parse(event.data);
      setAttacks(prev => [...prev, attack]);
    };

    // Carregar ataques históricos
    fetch('/api/security/attacks')
      .then(res => res.json())
      .then(data => {
        setAttacks(data.attacks);
        setIsLoading(false);
      });

    return () => ws.close();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Monitoramento de Ataques em Tempo Real</h2>
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <div className="space-y-4">
          {attacks.map((attack, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                attack.severity === 'high'
                  ? 'bg-red-100 border-red-500'
                  : attack.severity === 'medium'
                  ? 'bg-yellow-100 border-yellow-500'
                  : 'bg-green-100 border-green-500'
              } border`}
            >
              <div className="font-bold">{attack.type}</div>
              <div>Severidade: {attack.severity}</div>
              <div>Timestamp: {new Date(attack.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}