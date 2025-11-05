import { useState, useRef, useEffect } from 'react';
import { Volume2, X, RotateCcw } from 'lucide-react';
import { CommunicationItem } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryCardProps {
  item: CommunicationItem;
  onSpeak: (text: string) => void;
  onSelect?: (item: CommunicationItem) => void;
  brightness: number;
}

export function CategoryCard({ item, onSpeak, onSelect, brightness }: CategoryCardProps) {
  const [showLargeView, setShowLargeView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef(0);

  // ÁUDIO AUTOMÁTICO ao tocar/clicar
  const handleAutoPlay = () => {
    setIsPlaying(true);
    onSpeak(item.audioText);
    
    // Feedback visual por 2 segundos
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const handleClick = () => {
    clickCountRef.current += 1;

    // Cancelar timeout anterior se existir
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Se for duplo clique
    if (clickCountRef.current === 2) {
      clickCountRef.current = 0;
      setShowLargeView(true);
      return;
    }

    // Se for clique simples
    clickTimeoutRef.current = setTimeout(() => {
      if (clickCountRef.current === 1) {
        // TOCA ÁUDIO AUTOMATICAMENTE
        handleAutoPlay();
        
        // Adiciona à frase se tiver onSelect
        if (onSelect) {
          onSelect(item);
        }
      }
      clickCountRef.current = 0;
    }, 300);
  };

  // Limpar timeout ao desmontar
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`relative rounded-xl sm:rounded-2xl overflow-hidden transition-all cursor-pointer ${
          isPlaying ? 'scale-105 ring-8 ring-[#FF6600] animate-pulse' : 'hover:scale-105 active:scale-95'
        }`}
        style={{
          backgroundColor: '#FFFFFF',
          border: '5px solid #0A2351',
          boxShadow: isPlaying ? '0 8px 0 rgba(255, 102, 0, 0.6)' : '0 4px 0 rgba(10, 35, 81, 0.3)',
          filter: `brightness(${brightness}%)`,
        }}
        onClick={handleClick}
      >
        <div className="p-3 sm:p-4 lg:p-6 flex flex-col items-center gap-2 sm:gap-3 lg:gap-4">
          {/* GESTOS - GIFs animados */}
          {item.type === 'gesture' && item.imageUrl && (
            <div className="w-full aspect-square rounded-lg overflow-hidden border-3 sm:border-4 border-[#0A2351]">
              <img
                src={item.imageUrl}
                alt={item.text}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* VÍDEOS/AÇÕES - Imagens com botão play */}
          {item.type === 'video' && (
            <div className="w-full aspect-square flex items-center justify-center rounded-lg border-3 sm:border-4 border-[#0A2351] relative overflow-hidden">
              {item.imageUrl ? (
                <>
                  <img
                    src={item.imageUrl}
                    alt={item.text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0A2351] bg-opacity-30 pointer-events-none">
                    <div className="p-4 sm:p-5 lg:p-6 rounded-full border-3 sm:border-4 border-white" style={{ backgroundColor: '#FF6600' }}>
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ backgroundColor: '#0A2351' }} className="w-full h-full flex items-center justify-center">
                  <div className="p-4 sm:p-5 lg:p-6 rounded-full border-3 sm:border-4 border-white" style={{ backgroundColor: '#FF6600' }}>
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* IMAGENS REAIS E LUGARES */}
          {(item.type === 'real-image' || item.type === 'fictional-image') && item.imageUrl && (
            <div className="w-full aspect-square rounded-lg overflow-hidden border-3 sm:border-4 border-[#0A2351]">
              <ImageWithFallback
                src={item.imageUrl}
                alt={item.text}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Texto */}
          <span 
            className="w-full text-center uppercase" 
            style={{ 
              color: '#0A2351',
              fontSize: 'clamp(0.875rem, 2.5vw, 1.5rem)',
              fontWeight: 'bold',
              lineHeight: '1.2'
            }}
          >
            {item.text}
          </span>

          {/* BOTÃO GRANDE DE REPETIR ÁUDIO */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAutoPlay();
            }}
            className="w-full p-3 sm:p-4 lg:p-5 rounded-xl transition-all hover:scale-105 active:scale-95 border-3 sm:border-4 flex items-center justify-center gap-2 sm:gap-3"
            style={{ 
              backgroundColor: '#FF6600',
              borderColor: '#0A2351',
              boxShadow: '0 4px 0 rgba(10, 35, 81, 0.3)'
            }}
            aria-label={`OUVIR ${item.text}`}
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" color="#FFFFFF" strokeWidth={3} />
            <span
              className="uppercase"
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(0.75rem, 2vw, 1.125rem)',
                fontWeight: 'bold'
              }}
            >
              OUVIR
            </span>
          </button>
        </div>

        {/* Indicador de áudio tocando */}
        {isPlaying && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <div 
              className="p-2 sm:p-3 rounded-full animate-pulse"
              style={{ backgroundColor: '#FF6600' }}
            >
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" color="#FFFFFF" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>

      {/* Modal de Visualização Grande - DUPLO CLIQUE */}
      {showLargeView && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          style={{
            backgroundColor: 'rgba(10, 35, 81, 0.95)',
          }}
          onClick={() => setShowLargeView(false)}
        >
          <div 
            className="relative max-w-6xl w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setShowLargeView(false)}
              className="absolute -top-8 -right-8 sm:-top-12 sm:-right-12 p-4 sm:p-5 lg:p-6 rounded-full transition-all hover:scale-110 active:scale-95 border-4 sm:border-5 z-10"
              style={{
                backgroundColor: '#FF6600',
                borderColor: '#FFFFFF'
              }}
            >
              <X className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" color="#FFFFFF" strokeWidth={3} />
            </button>

            {/* Conteúdo */}
            <div 
              className="rounded-2xl sm:rounded-3xl overflow-hidden border-5 sm:border-8 w-full"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#FF6600'
              }}
            >
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col items-center">
                {/* Imagem/GIF Grande */}
                <div 
                  className="w-full flex items-center justify-center mb-6 sm:mb-8 lg:mb-10" 
                  style={{ 
                    height: '60vh',
                  }}
                >
                  {item.type === 'gesture' && item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.text}
                      className="max-w-full max-h-full object-contain rounded-xl border-4 sm:border-5 border-[#0A2351]"
                    />
                  )}
                  {item.type === 'video' && item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.text}
                      className="max-w-full max-h-full object-contain rounded-xl border-4 sm:border-5 border-[#0A2351]"
                    />
                  )}
                  {(item.type === 'real-image' || item.type === 'fictional-image') && item.imageUrl && (
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.text}
                      className="max-w-full max-h-full object-contain rounded-xl border-4 sm:border-5 border-[#0A2351]"
                    />
                  )}
                </div>

                {/* Texto e Botão de Áudio */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 w-full">
                  <h2 
                    className="uppercase text-center flex-1"
                    style={{
                      color: '#0A2351',
                      fontSize: 'clamp(1.75rem, 6vw, 3.5rem)',
                      fontWeight: 'bold',
                      lineHeight: '1.2'
                    }}
                  >
                    {item.text}
                  </h2>
                  <button
                    onClick={() => onSpeak(item.audioText)}
                    className="p-5 sm:p-6 lg:p-8 rounded-full transition-all hover:scale-110 active:scale-95 border-4 sm:border-5 flex-shrink-0"
                    style={{ 
                      backgroundColor: '#FF6600',
                      borderColor: '#0A2351',
                      boxShadow: '0 6px 0 rgba(10, 35, 81, 0.3)'
                    }}
                    aria-label={`FALAR ${item.text}`}
                  >
                    <Volume2 className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16" color="#FFFFFF" strokeWidth={3} />
                  </button>
                </div>

                {/* Instrução */}
                <p 
                  className="text-center mt-6 sm:mt-8 uppercase"
                  style={{
                    color: '#0A2351',
                    opacity: 0.6,
                    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                    fontWeight: 'bold'
                  }}
                >
                  CLIQUE FORA PARA FECHAR
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
