import { Plus } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import { CommunicationItem, UserSettings } from '../types';
import { speak } from '../utils/speechSynthesis';

interface RealImagesSectionProps {
  images: CommunicationItem[];
  settings: UserSettings;
  onAddCustom: () => void;
}

export function RealImagesSection({ images, settings, onAddCustom }: RealImagesSectionProps) {
  const handleSpeak = (text: string) => {
    speak(text, settings.voiceGender);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4" style={{ backgroundColor: '#0A2351' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>Imagens Reais</h2>
          <button
            onClick={onAddCustom}
            className="px-4 py-2 rounded-lg flex items-center gap-2"
            style={{ backgroundColor: '#FF6600', color: '#FFFFFF' }}
          >
            <Plus size={20} />
            Adicionar
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <CategoryCard
              key={image.id}
              item={image}
              onSpeak={handleSpeak}
              brightness={settings.brightness}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
