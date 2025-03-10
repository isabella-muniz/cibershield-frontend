import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 flex flex-col">
      {/* Header com navegação */}
      <nav className="p-6" style={{ paddingRight: '50px', paddingLeft: '50px' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="w-64 h-16 relative">
            <Image
              src="/logo-bg.png"
              alt="CyberShield Logo"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/auth')}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:from-green-600 hover:to-green-700"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/register')}
              className="px-6 py-2 border-2 border-green-500 text-white-500 hover:bg-green-500 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Registro
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 flex-grow" style={{ paddingRight: '50px', paddingLeft: '50px' }}>
        {/* Seção Principal */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Proteção Avançada 
            <br />
            Para seu Ambiente Digital
          </h1>

          <p className="text-gray-300 text-xl mb-8">
            Plataforma completa de cibersegurança com monitoramento em tempo real,
            análise de vulnerabilidades e proteção contra ameaças.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/register')}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Começar Agora
            </button>
            <button
              onClick={() => router.push('/auth')}
              className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
            >
              Saiba Mais
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-400" style={{ borderTop: '40px solid transparent', borderBottom: '0px solid transparent' }}>
            Recursos Principais:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Monitoramento de Ataques",
                description: "Dashboard em tempo real com análise de ameaças e logs detalhados de tentativas de invasão.",
                icon: "🛡️"
              },
              {
                title: "Scanner de Vulnerabilidades",
                description: "Identificação proativa de riscos de segurança com relatórios detalhados e recomendações.",
                icon: "🔍"
              },
              {
                title: "Proteção contra Phishing",
                description: "Simulações avançadas e treinamentos personalizados para sua equipe.",
                icon: "🎯"
              },
              {
                title: "Gerenciamento de Credenciais",
                description: "Armazenamento seguro com criptografia AES-256 e verificação de vazamentos.",
                icon: "🔐"
              },
              {
                title: "Sistema de Auditoria",
                description: "SIEM básico com revisão de logs de segurança, monitoramento de falhas e alertas de ataques em tempo real.",
                icon: "📊"
              },
              {
                title: "Monitoramento Dark Web",
                description: "Alertas automáticos sobre vazamentos de dados na Dark Web usando APIs como Have I Been Pwned.",
                icon: "🕵️"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-blue-400 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer novo */}
      <footer className="py-6 border-t border-green-500/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 CyberShield. Todos os Direitos Reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
