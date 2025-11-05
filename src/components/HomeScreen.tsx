import logo from 'figma:asset/e2d8f76d36bae0e67f8672c57f84dec40b52cba0.png';

interface HomeScreenProps {
  onStart: () => void;
  brightness: number;
}

export function HomeScreen({ onStart, brightness }: HomeScreenProps) {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: '#FFFFFF',
        filter: `brightness(${brightness}%)`,
      }}
    >
      {/* Header com barra laranja */}
      <div 
        className="p-4 sm:p-6 lg:p-8 border-b-8 sm:border-b-10" 
        style={{ 
          backgroundColor: '#0A2351',
          borderBottomColor: '#FF6600'
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <h2 
            className="uppercase text-center" 
            style={{ 
              color: '#FFFFFF',
              fontSize: 'clamp(1.5rem, 5vw, 3rem)',
              fontWeight: 'bold',
              letterSpacing: '0.05em'
            }}
          >
            BEM-VINDO
          </h2>
        </div>
      </div>

      {/* Content - Logo e Nome */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="max-w-3xl w-full flex flex-col items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Logo */}
          <div 
            className="rounded-3xl sm:rounded-4xl p-6 sm:p-8 lg:p-12 border-8 sm:border-10"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#0A2351',
              boxShadow: '0 8px 0 rgba(10, 35, 81, 0.3)'
            }}
          >
            <img 
              src={logo} 
              alt="CONNECT VOICE" 
              className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto"
            />
          </div>

          {/* Nome do App */}
          <h1 
            className="uppercase text-center tracking-wider"
            style={{ 
              color: '#0A2351',
              fontSize: 'clamp(2rem, 7vw, 4.5rem)',
              fontWeight: 'bold',
              lineHeight: '1.1'
            }}
          >
            CONNECT VOICE
          </h1>

          {/* Botão Iniciar */}
          <button
            onClick={onStart}
            className="px-12 sm:px-16 lg:px-20 py-6 sm:py-8 lg:py-10 rounded-2xl sm:rounded-3xl transition-all hover:scale-105 active:scale-95 border-6 sm:border-8 uppercase"
            style={{ 
              backgroundColor: '#FF6600',
              borderColor: '#0A2351',
              color: '#FFFFFF',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 'bold',
              boxShadow: '0 8px 0 rgba(10, 35, 81, 0.4)',
              letterSpacing: '0.05em'
            }}
          >
            INICIAR
          </button>

          {/* Descrição */}
          <p 
            className="text-center uppercase max-w-2xl mx-auto px-4"
            style={{
              color: '#0A2351',
              opacity: 0.7,
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              fontWeight: 'bold',
              lineHeight: '1.4'
            }}
          >
            APLICATIVO DE COMUNICAÇÃO ALTERNATIVA
          </p>
        </div>
      </div>
    </div>
  );
}
