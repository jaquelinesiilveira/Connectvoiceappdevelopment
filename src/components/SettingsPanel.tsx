import { Sun, Moon, Volume2, ArrowLeft } from 'lucide-react';
import { UserSettings } from '../types';

interface SettingsPanelProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
  onClose: () => void;
  brightness: number;
}

export function SettingsPanel({ settings, onSettingsChange, onClose, brightness }: SettingsPanelProps) {
  const handleBrightnessChange = (value: number) => {
    onSettingsChange({ ...settings, brightness: value });
  };

  const handleVoiceChange = (gender: 'female' | 'male') => {
    onSettingsChange({ ...settings, voiceGender: gender });
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: '#FFFFFF',
        filter: `brightness(${brightness}%)`,
      }}
    >
      {/* Header com Botão Voltar */}
      <div className="p-4 sm:p-6 lg:p-8 border-b-5 border-[#FF6600]" style={{ backgroundColor: '#0A2351' }}>
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all hover:scale-110 active:scale-95 border-4 sm:border-5"
            style={{ 
              backgroundColor: '#FF6600',
              borderColor: '#FFFFFF'
            }}
            aria-label="VOLTAR"
          >
            <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" color="#FFFFFF" strokeWidth={3} />
          </button>
          <h2 
            className="uppercase" 
            style={{ 
              color: '#FFFFFF',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 'bold'
            }}
          >
            CONFIGURAÇÕES
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Voice Gender */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-5 border-[#0A2351]">
            <label 
              className="block mb-4 sm:mb-6 uppercase" 
              style={{ 
                color: '#0A2351',
                fontSize: 'clamp(1.125rem, 3vw, 1.75rem)',
                fontWeight: 'bold'
              }}
            >
              <Volume2 className="inline mr-2 sm:mr-3 w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
              TIPO DE VOZ
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
              <button
                onClick={() => handleVoiceChange('female')}
                className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase border-4 sm:border-5"
                style={{
                  backgroundColor: settings.voiceGender === 'female' ? '#FF6600' : '#FFFFFF',
                  color: settings.voiceGender === 'female' ? '#FFFFFF' : '#0A2351',
                  borderColor: '#0A2351',
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  fontWeight: 'bold',
                  boxShadow: settings.voiceGender === 'female' ? '0 4px 0 rgba(10, 35, 81, 0.3)' : 'none'
                }}
              >
                VOZ FEMININA
              </button>
              <button
                onClick={() => handleVoiceChange('male')}
                className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase border-4 sm:border-5"
                style={{
                  backgroundColor: settings.voiceGender === 'male' ? '#FF6600' : '#FFFFFF',
                  color: settings.voiceGender === 'male' ? '#FFFFFF' : '#0A2351',
                  borderColor: '#0A2351',
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  fontWeight: 'bold',
                  boxShadow: settings.voiceGender === 'male' ? '0 4px 0 rgba(10, 35, 81, 0.3)' : 'none'
                }}
              >
                VOZ MASCULINA
              </button>
            </div>
          </div>

          {/* Brightness Control */}
          <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-5 border-[#0A2351]">
            <label 
              className="block mb-4 sm:mb-6 uppercase" 
              style={{ 
                color: '#0A2351',
                fontSize: 'clamp(1.125rem, 3vw, 1.75rem)',
                fontWeight: 'bold'
              }}
            >
              <Sun className="inline mr-2 sm:mr-3 w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
              LUMINOSIDADE: {settings.brightness}%
            </label>
            <input
              type="range"
              min="50"
              max="150"
              value={settings.brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
              className="w-full h-4 sm:h-5 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #0A2351 0%, #FF6600 50%, #0A2351 100%)`,
              }}
            />
            <div className="flex justify-between mt-3 sm:mt-4">
              <span 
                className="uppercase flex items-center gap-2"
                style={{ 
                  color: '#0A2351', 
                  opacity: 0.7,
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                  fontWeight: 'bold'
                }}
              >
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" /> ESCURO
              </span>
              <span 
                className="uppercase flex items-center gap-2"
                style={{ 
                  color: '#0A2351', 
                  opacity: 0.7,
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                  fontWeight: 'bold'
                }}
              >
                <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> CLARO
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div 
            className="p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-5"
            style={{ 
              backgroundColor: '#0A2351', 
              borderColor: '#FF6600',
              color: '#FFFFFF'
            }}
          >
            <h3 
              className="mb-3 sm:mb-4 uppercase"
              style={{
                fontSize: 'clamp(1.125rem, 3vw, 1.75rem)',
                fontWeight: 'bold'
              }}
            >
              SOBRE O CONNECT VOICE
            </h3>
            <p 
              className="opacity-90 mb-3 sm:mb-4"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                lineHeight: '1.6'
              }}
            >
              APLICATIVO DE COMUNICAÇÃO ALTERNATIVA DESENVOLVIDO PARA PESSOAS COM DIFICULDADE DE FALA.
              UTILIZE GESTOS, IMAGENS E VÍDEOS PARA SE COMUNICAR DE FORMA EFICAZ.
            </p>
            <p 
              className="opacity-90"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                lineHeight: '1.6'
              }}
            >
              ESTE APLICATIVO FOI PROJETADO COM CORES ADEQUADAS PARA PESSOAS COM DALTONISMO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
