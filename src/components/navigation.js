// frontend/src/components/Navigation.js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home link */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-white font-bold cursor-pointer">
                Security Dashboard
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/security-dashboard">
                <span className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium ${
                  router.pathname === '/security-dashboard'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}>
                  Painel de Segurança
                </span>
              </Link>
              
              <Link href="/security-dashboard?tab=attacks">
                <span className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium ${
                  router.query.tab === 'attacks'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}>
                  Monitoramento de Ataques
                </span>
              </Link>

              <Link href="/security-dashboard?tab=vulnerabilities">
                <span className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium ${
                  router.query.tab === 'vulnerabilities'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}>
                  Scanner de Vulnerabilidades
                </span>
              </Link>

              <Link href="/security-dashboard?tab=credentials">
                <span className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium ${
                  router.query.tab === 'credentials'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}>
                  Gerenciador de Credenciais
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Abrir menu principal</span>
              {/* Ícone do menu (pode ser substituído por um ícone de sua preferência) */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/security-dashboard">
              <span className={`cursor-pointer block px-3 py-2 rounded-md text-base font-medium ${
                router.pathname === '/security-dashboard'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}>
                Painel de Segurança
              </span>
            </Link>

            <Link href="/security-dashboard?tab=attacks">
              <span className={`cursor-pointer block px-3 py-2 rounded-md text-base font-medium ${
                router.query.tab === 'attacks'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}>
                Monitoramento de Ataques
              </span>
            </Link>

            <Link href="/security-dashboard?tab=vulnerabilities">
              <span className={`cursor-pointer block px-3 py-2 rounded-md text-base font-medium ${
                router.query.tab === 'vulnerabilities'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}>
                Scanner de Vulnerabilidades
              </span>
            </Link>

            <Link href="/security-dashboard?tab=credentials">
              <span className={`cursor-pointer block px-3 py-2 rounded-md text-base font-medium ${
                router.query.tab === 'credentials'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}>
                Gerenciador de Credenciais
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;