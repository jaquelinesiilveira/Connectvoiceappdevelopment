import { useState } from 'react';
import { Plus, Grid3x3 } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import { CommunicationItem, UserSettings } from '../types';
import { speak } from '../utils/speechSynthesis';

interface GesturesSectionProps {
  gestures: CommunicationItem[];
  settings: UserSettings;
  onAddCustom: () => void;
}

export function GesturesSection({ gestures, settings, onAddCustom }: GesturesSectionProps) {
  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', ...new Set(gestures.map(g => g.category).filter(Boolean))];

  const filteredGestures = filter === 'all' 
    ? gestures 
    : gestures.filter(g => g.category === filter);

  const handleSpeak = (text: string) => {
    speak(text, settings.voiceGender);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4" style={{ backgroundColor: '#0A2351' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl" style={{ color: '#FFFFFF' }}>Gestos</h2>
          <button
            onClick={onAddCustom}
            className="px-4 py-2 rounded-lg flex items-center gap-2"
            style={{ backgroundColor: '#FF6600', color: '#FFFFFF' }}
          >
            <Plus size={20} />
            Adicionar
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-lg whitespace-nowrap transition-colors"
              style={{
                backgroundColor: filter === cat ? '#FF6600' : '#FFFFFF',
                color: filter === cat ? '#FFFFFF' : '#0A2351',
              }}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGestures.map((gesture) => (
            <CategoryCard
              key={gesture.id}
              item={gesture}
              onSpeak={handleSpeak}
              brightness={settings.brightness}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
