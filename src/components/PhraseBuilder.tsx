import { useState } from 'react';
import { Volume2, X, Trash2 } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import { CommunicationItem, PhraseBuilderItem } from '../types';
import { playAddSound, playRemoveSound, playClearSound, playSpeakSound } from '../utils/soundEffects';

interface PhraseBuilderProps {
  availableItems: CommunicationItem[];
  onSpeak: (text: string) => void;
  brightness: number;
}

export function PhraseBuilder({ availableItems, onSpeak, brightness }: PhraseBuilderProps) {
  const [selectedItems, setSelectedItems] = useState<PhraseBuilderItem[]>([]);

  const handleSelect = (item: CommunicationItem) => {
    // SOM DE ADICIONAR
    playAddSound();
    
    setSelectedItems(prev => [...prev, {
      id: `${item.id}-${Date.now()}`,
      text: item.audioText,
      imageUrl: item.imageUrl,
    }]);
  };

  const handleRemoveItem = (id: string) => {
    // SOM DE REMOVER
    playRemoveSound();
    
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSpeakPhrase = () => {
    const phrase = selectedItems.map(item => item.text).join(' ');
    if (phrase) {
      // SOM DE FALAR
      playSpeakSound();
      onSpeak(phrase);
    }
  };

  const handleClear = () => {
    // SOM DE LIMPAR
    playClearSound();
    
    setSelectedItems([]);
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Phrase Display Area */}
      <div 
        className="rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-4 sm:border-5 min-h-32"
        style={{ 
          backgroundColor: '#FFFFFF',
          borderColor: '#0A2351'
        }}
      >
        <h2 
          className="uppercase mb-4" 
          style={{ 
            color: '#0A2351',
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            fontWeight: 'bold'
          }}
        >
          MINHA FRASE
        </h2>
        
        {selectedItems.length === 0 ? (
          <p 
            className="uppercase"
            style={{ 
              color: '#0A2351', 
              opacity: 0.5, 
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: 'bold'
            }}
          >
            CLIQUE NOS CARDS ABAIXO PARA CONSTRUIR SUA FRASE
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-3 sm:border-4"
                style={{ 
                  backgroundColor: '#FF6600', 
                  color: '#FFFFFF',
                  borderColor: '#0A2351',
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  fontWeight: 'bold'
                }}
              >
                <span className="uppercase">{item.text}</span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="hover:opacity-80 transition-opacity"
                  aria-label={`REMOVER ${item.text}`}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button
          onClick={handleSpeakPhrase}
          disabled={selectedItems.length === 0}
          className="flex-1 px-6 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 sm:gap-4 disabled:opacity-50 transition-all hover:scale-105 active:scale-95 uppercase border-4 sm:border-5"
          style={{ 
            backgroundColor: '#FF6600', 
            borderColor: '#0A2351',
            color: '#FFFFFF',
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            fontWeight: 'bold',
            boxShadow: selectedItems.length > 0 ? '0 4px 0 rgba(10, 35, 81, 0.3)' : 'none'
          }}
        >
          <Volume2 className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
          FALAR FRASE
        </button>
        <button
          onClick={handleClear}
          disabled={selectedItems.length === 0}
          className="px-6 sm:px-8 py-4 sm:py-6 rounded-xl sm:rounded-2xl disabled:opacity-50 transition-all hover:scale-105 active:scale-95 border-4 sm:border-5 flex items-center justify-center gap-2"
          style={{ 
            backgroundColor: '#FFFFFF', 
            color: '#0A2351',
            borderColor: '#0A2351'
          }}
          aria-label="LIMPAR FRASE"
        >
          <Trash2 className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
          <span 
            className="uppercase hidden sm:inline"
            style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              fontWeight: 'bold'
            }}
          >
            LIMPAR
          </span>
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {availableItems.map((item) => (
          <CategoryCard
            key={item.id}
            item={item}
            onSpeak={onSpeak}
            onSelect={handleSelect}
            brightness={brightness}
          />
        ))}
      </div>
    </div>
  );
}
