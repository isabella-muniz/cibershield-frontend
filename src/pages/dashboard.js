// frontend/src/pages/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AttackMonitoringPanel from '../components/security/attackmonitoringpanel';
import VulnerabilityScanner from '../components/security/vulnerabilityscanner';
import CredentialManager from '../components/security/credentialmanager';

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('attacks');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Tabs de Navegação */}
          <div className="flex space-x-4 border-b mb-6">
            <button
              onClick={() => setActiveTab('attacks')}
              className={`px-4 py-2 ${
                activeTab === 'attacks'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Monitoramento de Ataques
            </button>
            <button
              onClick={() => setActiveTab('vulnerabilities')}
              className={`px-4 py-2 ${
                activeTab === 'vulnerabilities'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Scanner de Vulnerabilidades
            </button>
            <button
              onClick={() => setActiveTab('credentials')}
              className={`px-4 py-2 ${
                activeTab === 'credentials'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              Gerenciador de Credenciais
            </button>
          </div>

          {/* Conteúdo das Tabs */}
          <div className="mt-6">
            {activeTab === 'attacks' && <AttackMonitoringPanel />}
            {activeTab === 'vulnerabilities' && <VulnerabilityScanner />}
            {activeTab === 'credentials' && <CredentialManager />}
          </div>
        </div>
      </div>
    </div>
  );
}