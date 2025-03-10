import { useEffect, useState } from "react"; // Importação dos hooks useEffect e useState
import { useRouter } from "next/router"; // Importação do hook useRouter para navegação
import { toast } from "react-toastify"; // Biblioteca para notificações
import "react-toastify/dist/ReactToastify.css"; // Estilos do Toastify
import useMessages from "../hooks/useMessages"; // Hook para mensagens traduzidas
import axiosInstance from "../lib/axiosInstance"; // 🚀 Usa axiosInstance para chamadas API

export default function WelcomePage() {
  const messages = useMessages(); // Hook para mensagens traduzidas
  const [sessionData, setSessionData] = useState(null); // Estado para os dados da sessão
  const [loading, setLoading] = useState(true); // Estado de carregamento inicial
  const [isLoading, setIsLoading] = useState(true); // Estado do ecrã de carregamento
  const router = useRouter(); // Hook para navegação

  // Novo estado para controlar qual funcionalidade está ativa
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // 🚀 Verifica a sessão do utilizador na API
        const { data } = await axiosInstance.get("/api/session", { timeout: 5000 });

        // ❌ Se a sessão for inválida, lança um erro
        if (!data.valid) {
          throw new Error("Sessão inválida");
        }

        // ✅ Atualiza o estado com os dados da sessão
        setSessionData(data); 
      } catch (error) {
        console.error("Erro na API:", error.message || error);

        // Definição da mensagem de erro conforme o tipo de falha
        let errorMessage = messages.error?.server_error;
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = messages.error?.session_not_found;
          } else if (error.response.status === 500) {
            errorMessage = messages.error?.server_error;
          }
        } else if (error.code === "ECONNABORTED") {
          errorMessage = messages.error?.server_timeout;
        } else if (error.message.includes("Network Error")) {
          errorMessage = messages.error?.server_unavailable;
        }

        // Exibe erro e redireciona para a autenticação após 2 segundos
        toast.error(errorMessage);
        setTimeout(() => router.push("/auth"), 2000);
      } finally {
        setLoading(false);
        setTimeout(() => setIsLoading(false), 1000); // 🔹 Simula tempo de carregamento do loading
      }
    };

    checkSession(); // 🚀 Inicia a verificação da sessão ao carregar a página
  }, []);

  // ✅ Função para Logout
  const handleLogout = async () => {
    await axiosInstance.post("/api/logout"); // 🚀 API logout
    toast.info(messages.auth?.logout_success);
    router.push("/auth");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 relative">
      
      {/* 🔹 Ecrã de carregamento antes de exibir os dados */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white mb-4"></div>
          <p className="text-lg font-semibold text-white">A carregar...</p>
        </div>
      )}

      {/* 🔹 Exibição dos dados da sessão e opções do utilizador */}
      {!isLoading && (
        <>
          {loading ? (
            <p className="text-gray-400">{messages.button?.loading}</p>
          ) : sessionData ? (
            <div className="w-full max-w-6xl space-y-8">
              {/* Informações do usuário */}
              <div className="bg-gray-800 text-gray-300 p-4 rounded-md text-sm w-full border border-gray-700 shadow-lg">
                <span className="font-semibold text-blue-400">{messages.welcome?.user_label}</span>
                <pre className="mt-2 break-words whitespace-pre-wrap">{sessionData.user.username}</pre>

                <button
                  onClick={handleLogout}
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                >
                  {messages.auth?.logout_button || "Sair"}
                </button>
              </div>

              {/* Cards das Funcionalidades */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card do Painel de Monitoramento */}
                <div 
                  onClick={() => setActiveFeature('monitoring')}
                  className={`
                    cursor-pointer p-6 rounded-lg transition-all duration-300
                    ${activeFeature === 'monitoring' 
                      ? 'bg-blue-600 transform scale-105' 
                      : 'bg-gray-800 hover:bg-gray-700'}
                    border border-gray-600 hover:border-blue-500
                    shadow-lg hover:shadow-blue-500/20
                  `}
                >
                  <h2 className="text-xl font-bold mb-3 text-blue-400">
                    Painel de Monitoramento de Ataques
                  </h2>
                  <p className="text-gray-300">
                    Monitore ataques em tempo real e analise ameaças ao seu sistema
                  </p>
                </div>

                {/* Card do Scanner */}
                <div 
                  onClick={() => setActiveFeature('scanner')}
                  className={`
                    cursor-pointer p-6 rounded-lg transition-all duration-300
                    ${activeFeature === 'scanner' 
                      ? 'bg-green-600 transform scale-105' 
                      : 'bg-gray-800 hover:bg-gray-700'}
                    border border-gray-600 hover:border-green-500
                    shadow-lg hover:shadow-green-500/20
                  `}
                >
                  <h2 className="text-xl font-bold mb-3 text-green-400">
                    Scanner de Vulnerabilidades Web
                  </h2>
                  <p className="text-gray-300">
                    Identifique vulnerabilidades em sua aplicação web
                  </p>
                </div>

                {/* Card do Gerenciador de Credenciais */}
                <div 
                  onClick={() => setActiveFeature('credentials')}
                  className={`
                    cursor-pointer p-6 rounded-lg transition-all duration-300
                    ${activeFeature === 'credentials' 
                      ? 'bg-purple-600 transform scale-105' 
                      : 'bg-gray-800 hover:bg-gray-700'}
                    border border-gray-600 hover:border-purple-500
                    shadow-lg hover:shadow-purple-500/20
                  `}
                >
                  <h2 className="text-xl font-bold mb-3 text-purple-400">
                    Gerenciador de Credenciais Seguras
                  </h2>
                  <p className="text-gray-300">
                    Gerencie suas credenciais de forma segura e centralizada
                  </p>
                </div>
              </div>

              {/* Área de conteúdo da funcionalidade selecionada */}
              {activeFeature && (
                <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
                  {activeFeature === 'monitoring' && (
                    <div>
                      <h3 className="text-2xl font-bold text-blue-400 mb-4">
                        Painel de Monitoramento de Ataques
                      </h3>
                      {/* Aqui será renderizado o componente de monitoramento */}
                    </div>
                  )}
                  {activeFeature === 'scanner' && (
                    <div>
                      <h3 className="text-2xl font-bold text-green-400 mb-4">
                        Scanner de Vulnerabilidades
                      </h3>
                      {/* Aqui será renderizado o componente do scanner */}
                    </div>
                  )}
                  {activeFeature === 'credentials' && (
                    <div>
                      <h3 className="text-2xl font-bold text-purple-400 mb-4">
                        Gerenciador de Credenciais
                      </h3>
                      {/* Aqui será renderizado o componente de credenciais */}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400">{messages.welcome?.session_expired}</p>
          )}
        </>
      )}
    </div>
  );
}