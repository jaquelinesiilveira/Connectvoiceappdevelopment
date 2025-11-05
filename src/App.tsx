import { useState } from 'react';
import { Settings as SettingsIcon, Briefcase, Plus, Hand, Play, Image, MapPin, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { CategoryCard } from './components/CategoryCard';
import { PhraseBuilder } from './components/PhraseBuilder';
import { SettingsPanel } from './components/SettingsPanel';
import { ProfessionalArea } from './components/ProfessionalArea';
import { HomeScreen } from './components/HomeScreen';
import { CommunicationItem, UserSettings } from './types';
import { 
  defaultGestures, 
  defaultVideos, 
  defaultRealImages, 
  defaultFictionalImages
} from './data/defaultContent';
import { speak } from './utils/speechSynthesis';
import logo from 'figma:asset/e2d8f76d36bae0e67f8672c57f84dec40b52cba0.png';

// GIFs de exemplo para gestos (usando Giphy)
const gestureGifs: Record<string, string> = {
  'gesture-yes': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTNmd2lxOGFhNTBzNGd6Zjl4YXJ3ZGNkbWt6dTVkYXdxbWtyOGNmdyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oEdva9BUHPIs2SkGk/giphy.gif',
  'gesture-no': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnJ5YzVxN3VlZmYyaGF3eXVvZXg1bHBqYWh0bWN0Z3JzcnN3b2JzcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fXnRObM8Q0RkOmR5nf/giphy.gif',
  'gesture-hello': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGFhN3NqNGx6dWh0ZGVmcHJ4aGJkNWN4bW1rZGFwNnY3ZDhkajI1ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dzaUX7CAG0Ihi/giphy.gif',
  'gesture-goodbye': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnFpYTB0czVmNWRhMnF3eGN4Z2hwY2J4cGN4MWR5N2Qyb2F3Nnp6ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/m9eG1qVjvN56H0MXt8/giphy.gif',
  'gesture-thanks': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTZ1cXhueGN4aHRnZWRtZWQ4anB0YWJiZHdqeGVsbXFwaW02bWpmNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ZfK4cXKJTTay1Ava29/giphy.gif',
  'gesture-love': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWlwajFqbXBxcWV0YWM1ejduNGg0N2Q5MWRqNzZndnJlYXdhenFsNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Kg2tFStNdUsOmxv2GC/giphy.gif',
};

// Image URLs from Unsplash (TODAS COM PESSOA DE REFERÊNCIA)
const imageUrls: Record<string, string> = {
  // Gestures - Real Actions
  'gesture-please': 'https://images.unsplash.com/photo-1611923973164-e0e5f7f69872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGVhc2UlMjBnZXN0dXJlJTIwaGFuZHN8ZW58MXx8fHwxNzYyMjYxMDg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'gesture-bathroom': 'https://images.unsplash.com/photo-1629546625768-f5836f4798b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRocm9vbSUyMHNpZ24lMjByZXN0cm9vbXxlbnwxfHx8fDE3NjIyNjEwODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'gesture-happy': 'https://images.unsplash.com/photo-1623544762122-845486776243?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHNtaWxpbmclMjBwZXJzb258ZW58MXx8fHwxNzYyMjYxMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'gesture-sad': 'https://images.unsplash.com/photo-1604341841227-6dd5c2255842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWQlMjBwZXJzb24lMjBjcnlpbmd8ZW58MXx8fHwxNzYyMjYxMDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'gesture-pain': 'https://images.unsplash.com/photo-1552081844-512cf156e161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwYWluJTIwaGVhZGFjaGV8ZW58MXx8fHwxNzYyMjYxMDg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'gesture-tired': 'https://images.unsplash.com/photo-1617617922104-510c58382d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJlZCUyMHNsZWVweSUyMHBlcnNvbnxlbnwxfHx8fDE3NjIyNjEwODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'gesture-tv': 'https://images.unsplash.com/photo-1605370590904-c1421f2461ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB3YXRjaGluZyUyMHRlbGV2aXNpb258ZW58MXx8fHwxNzYyMjYxMDg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  // People
  'person-parents': 'https://images.unsplash.com/photo-1628705250580-80b96d4657f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBmYXRoZXIlMjBmYW1pbHklMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIyNjMwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'person-me': 'https://images.unsplash.com/photo-1758598737700-739b306988e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHBvcnRyYWl0JTIwaGFwcHl8ZW58MXx8fHwxNzYyMjYzMDE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'person-grandparents': 'https://images.unsplash.com/photo-1554331292-735256644d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFuZHBhcmVudHMlMjBlbGRlcmx5JTIwY291cGxlfGVufDF8fHx8MTc2MjI2MzAxNHww&ixlib=rb-4.1.0&q=80&w=1080',
  // Videos
  'video-water': 'https://images.unsplash.com/photo-1624392294437-8fc9f876f4d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBkcmlua2luZyUyMHdhdGVyJTIwdHV0b3JpYWx8ZW58MXx8fHwxNzYyMjY1Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'video-eating': 'https://images.unsplash.com/photo-1659352155545-34145aeb8993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBlYXRpbmclMjBmb29kJTIwdHV0b3JpYWx8ZW58MXx8fHwxNzYyMjY1Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'video-brushing': 'https://images.unsplash.com/photo-1584516151140-f79fde30d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBicnVzaGluZyUyMHRlZXRoJTIwaHlnaWVuZXxlbnwxfHx8fDE3NjIyNjU3Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  // Real Images (COM PESSOA DE REFERÊNCIA)
  'water': 'https://images.unsplash.com/photo-1574482582832-7094d1ee93ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHdhdGVyJTIwZHJpbmtpbmd8ZW58MXx8fHwxNzYyMjYwNzY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'food': 'https://images.unsplash.com/photo-1684160244466-b89ef03b7638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMHBsYXRlfGVufDF8fHx8MTc2MjE0MTI0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'bathroom': 'https://images.unsplash.com/photo-1638799869566-b17fa794c4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbXxlbnwxfHx8fDE3NjIxNDAyNDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'bed-person': 'https://images.unsplash.com/photo-1515354861775-b61b15094f3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHN0YW5kaW5nJTIwdGFibGUlMjBmdXJuaXR1cmUlMjBzY2FsZXxlbnwxfHx8fDE3NjIyOTI2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'medicine': 'https://images.unsplash.com/photo-1675851143055-23ae996bb212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMHBpbGxzJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NjIyNTk5MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'phone-person': 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBob2xkaW5nJTIwcGhvbmUlMjBoYW5kJTIwc2NhbGV8ZW58MXx8fHwxNzYyMjkyNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'book': 'https://images.unsplash.com/photo-1660479123634-2c700dfbbbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYm9vayUyMHJlYWRpbmd8ZW58MXx8fHwxNzYyMTY4ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  // Fictional Images (SEMPRE COM PESSOA DE REFERÊNCIA)
  'house-person': 'https://images.unsplash.com/photo-1649186020022-838b4d74b822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzdGFuZGluZyUyMG5lYXIlMjBob3VzZSUyMGJ1aWxkaW5nJTIwc2NhbGV8ZW58MXx8fHwxNzYyMjkyNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'school-person': 'https://images.unsplash.com/photo-1568202083827-a1ea4053d3a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBidWlsZGluZyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjIyNjU3Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'hospital-illustration': 'https://images.unsplash.com/photo-1631507623104-aa66944677aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMG1lZGljYWwlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIyNjU3Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'park-person': 'https://images.unsplash.com/photo-1596675399809-24b47ccdc94d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwYXJrJTIwYmVuY2glMjBvdXRkb29yJTIwc2NhbGV8ZW58MXx8fHwxNzYyMjkyNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'car-person': 'https://images.unsplash.com/photo-1562220737-4ca5a72aa93b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBjYXIlMjBzaXplJTIwcmVmZXJlbmNlfGVufDF8fHx8MTc2MjI5MjYzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'tree-person': 'https://images.unsplash.com/photo-1711118300746-381f34078246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHRyZWUlMjBmb3Jlc3QlMjBzaXplJTIwc2NhbGV8ZW58MXx8fHwxNzYyMjkyNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
};

export default function App() {
  const [showHome, setShowHome] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfessional, setShowProfessional] = useState(false);
  const [settings, setSettings] = useState<UserSettings>({
    voiceGender: 'female',
    brightness: 100,
    fontSize: 'normal',
  });

  const [gestures, setGestures] = useState<CommunicationItem[]>(
    defaultGestures.map(item => ({
      ...item,
      imageUrl: gestureGifs[item.imageUrl || ''] || imageUrls[item.imageUrl || ''] || item.imageUrl,
    }))
  );

  const [videos, setVideos] = useState<CommunicationItem[]>(
    defaultVideos.map(item => ({
      ...item,
      imageUrl: imageUrls[item.imageUrl || ''] || item.imageUrl,
    }))
  );

  const [realImages, setRealImages] = useState<CommunicationItem[]>(
    defaultRealImages.map(item => ({
      ...item,
      imageUrl: imageUrls[item.imageUrl || ''] || item.imageUrl,
    }))
  );

  const [fictionalImages, setFictionalImages] = useState<CommunicationItem[]>(
    defaultFictionalImages.map(item => ({
      ...item,
      imageUrl: imageUrls[item.imageUrl || ''] || item.imageUrl,
    }))
  );

  const allItems = [...gestures, ...videos, ...realImages, ...fictionalImages];

  const handleSpeak = (text: string) => {
    speak(text, settings.voiceGender);
  };

  const handleAddItemFromProfessional = (item: CommunicationItem) => {
    switch (item.type) {
      case 'gesture':
        setGestures(prev => [...prev, item]);
        break;
      case 'video':
        setVideos(prev => [...prev, item]);
        break;
      case 'real-image':
        setRealImages(prev => [...prev, item]);
        break;
      case 'fictional-image':
        setFictionalImages(prev => [...prev, item]);
        break;
    }
  };

  const handleUpdateItem = (updatedItem: CommunicationItem) => {
    switch (updatedItem.type) {
      case 'gesture':
        setGestures(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        break;
      case 'video':
        setVideos(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        break;
      case 'real-image':
        setRealImages(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        break;
      case 'fictional-image':
        setFictionalImages(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        break;
    }
  };

  const handleDeleteItem = (id: string, type: CommunicationItem['type']) => {
    switch (type) {
      case 'gesture':
        setGestures(prev => prev.filter(item => item.id !== id));
        break;
      case 'video':
        setVideos(prev => prev.filter(item => item.id !== id));
        break;
      case 'real-image':
        setRealImages(prev => prev.filter(item => item.id !== id));
        break;
      case 'fictional-image':
        setFictionalImages(prev => prev.filter(item => item.id !== id));
        break;
    }
  };

  if (showHome) {
    return (
      <HomeScreen
        onStart={() => setShowHome(false)}
        brightness={settings.brightness}
      />
    );
  }

  if (showSettings) {
    return (
      <SettingsPanel
        settings={settings}
        onSettingsChange={setSettings}
        onClose={() => setShowSettings(false)}
        brightness={settings.brightness}
      />
    );
  }

  if (showProfessional) {
    return (
      <ProfessionalArea
        onClose={() => setShowProfessional(false)}
        onAddItem={handleAddItemFromProfessional}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
        allItems={allItems}
        brightness={settings.brightness}
      />
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: '#FFFFFF',
        filter: `brightness(${settings.brightness}%)`,
      }}
    >
      {/* Header Limpo e Minimalista */}
      <header className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <img 
            src={logo} 
            alt="CONNECT VOICE" 
            className="h-32 sm:h-36 md:h-40 lg:h-48"
          />
          
          {/* Título Centralizado */}
          <h1 
            className="uppercase tracking-wider absolute left-1/2 transform -translate-x-1/2"
            style={{ 
              color: '#0A2351',
              fontSize: 'clamp(1.25rem, 3vw, 2rem)',
              fontWeight: 'bold',
              letterSpacing: '0.1em'
            }}
          >
            CONNECT VOICE
          </h1>
          
          {/* Botões à Direita */}
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => setShowSettings(true)}
              className="p-3 sm:p-4 rounded-xl transition-all hover:scale-110 active:scale-95"
              style={{ 
                backgroundColor: '#FF6600'
              }}
              aria-label="CONFIGURAÇÕES"
            >
              <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6" color="#FFFFFF" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setShowProfessional(true)}
              className="p-3 sm:p-4 rounded-xl transition-all hover:scale-110 active:scale-95"
              style={{ 
                backgroundColor: '#0A2351'
              }}
              aria-label="ÁREA DO PROFISSIONAL"
            >
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" color="#FFFFFF" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Linha Separadora */}
      <div className="h-0.5 bg-gray-200 max-w-7xl mx-auto mb-6 sm:mb-8" />

      {/* Tabs Responsivas */}
      <Tabs defaultValue="gestures" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TabsList className="grid w-full grid-cols-5 mb-6 sm:mb-8 lg:mb-10 h-auto gap-2 sm:gap-3 lg:gap-4" style={{ backgroundColor: 'transparent' }}>
          <TabsTrigger 
            value="gestures" 
            className="uppercase py-3 px-2 sm:py-4 sm:px-4 lg:py-6 lg:px-6 data-[state=active]:bg-[#FF6600] data-[state=active]:text-white bg-white border-4 sm:border-5 border-[#0A2351] rounded-lg sm:rounded-xl transition-all flex flex-col items-center gap-1 sm:gap-2"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 1.4rem)', fontWeight: 'bold' }}
          >
            <Hand className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" strokeWidth={3} />
            <span className="hidden sm:inline">GESTOS</span>
          </TabsTrigger>
          <TabsTrigger 
            value="videos"
            className="uppercase py-3 px-2 sm:py-4 sm:px-4 lg:py-6 lg:px-6 data-[state=active]:bg-[#FF6600] data-[state=active]:text-white bg-white border-4 sm:border-5 border-[#0A2351] rounded-lg sm:rounded-xl transition-all flex flex-col items-center gap-1 sm:gap-2"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 1.4rem)', fontWeight: 'bold' }}
          >
            <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" strokeWidth={3} />
            <span className="hidden sm:inline">AÇÕES</span>
          </TabsTrigger>
          <TabsTrigger 
            value="real-images"
            className="uppercase py-3 px-2 sm:py-4 sm:px-4 lg:py-6 lg:px-6 data-[state=active]:bg-[#FF6600] data-[state=active]:text-white bg-white border-4 sm:border-5 border-[#0A2351] rounded-lg sm:rounded-xl transition-all flex flex-col items-center gap-1 sm:gap-2"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 1.4rem)', fontWeight: 'bold' }}
          >
            <Image className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" strokeWidth={3} />
            <span className="hidden sm:inline">IMAGENS</span>
          </TabsTrigger>
          <TabsTrigger 
            value="fictional-images"
            className="uppercase py-3 px-2 sm:py-4 sm:px-4 lg:py-6 lg:px-6 data-[state=active]:bg-[#FF6600] data-[state=active]:text-white bg-white border-4 sm:border-5 border-[#0A2351] rounded-lg sm:rounded-xl transition-all flex flex-col items-center gap-1 sm:gap-2"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 1.4rem)', fontWeight: 'bold' }}
          >
            <MapPin className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" strokeWidth={3} />
            <span className="hidden sm:inline">LUGARES</span>
          </TabsTrigger>
          <TabsTrigger 
            value="phrases"
            className="uppercase py-3 px-2 sm:py-4 sm:px-4 lg:py-6 lg:px-6 data-[state=active]:bg-[#FF6600] data-[state=active]:text-white bg-white border-4 sm:border-5 border-[#0A2351] rounded-lg sm:rounded-xl transition-all flex flex-col items-center gap-1 sm:gap-2"
            style={{ fontSize: 'clamp(0.75rem, 2vw, 1.4rem)', fontWeight: 'bold' }}
          >
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" strokeWidth={3} />
            <span className="hidden sm:inline">FRASES</span>
          </TabsTrigger>
        </TabsList>

        {/* GESTOS - GIFs de pessoas fazendo gestos */}
        <TabsContent value="gestures">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {gestures.map((item) => (
              <CategoryCard
                key={item.id}
                item={item}
                onSpeak={handleSpeak}
                brightness={settings.brightness}
              />
            ))}
            <button
              onClick={() => setShowProfessional(true)}
              className="aspect-square rounded-xl sm:rounded-2xl border-4 sm:border-5 border-dashed border-[#0A2351] bg-white hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-3"
            >
              <Plus className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={3} color="#0A2351" />
              <span style={{ color: '#0A2351', fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', fontWeight: 'bold' }}>
                ADICIONAR
              </span>
            </button>
          </div>
        </TabsContent>

        {/* VÍDEOS - Ações */}
        <TabsContent value="videos">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {videos.map((item) => (
              <CategoryCard
                key={item.id}
                item={item}
                onSpeak={handleSpeak}
                brightness={settings.brightness}
              />
            ))}
            <button
              onClick={() => setShowProfessional(true)}
              className="aspect-square rounded-xl sm:rounded-2xl border-4 sm:border-5 border-dashed border-[#0A2351] bg-white hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-3"
            >
              <Plus className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={3} color="#0A2351" />
              <span style={{ color: '#0A2351', fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', fontWeight: 'bold' }}>
                ADICIONAR
              </span>
            </button>
          </div>
        </TabsContent>

        {/* IMAGENS REAIS */}
        <TabsContent value="real-images">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {realImages.map((item) => (
              <CategoryCard
                key={item.id}
                item={item}
                onSpeak={handleSpeak}
                brightness={settings.brightness}
              />
            ))}
            <button
              onClick={() => setShowProfessional(true)}
              className="aspect-square rounded-xl sm:rounded-2xl border-4 sm:border-5 border-dashed border-[#0A2351] bg-white hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-3"
            >
              <Plus className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={3} color="#0A2351" />
              <span style={{ color: '#0A2351', fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', fontWeight: 'bold' }}>
                ADICIONAR
              </span>
            </button>
          </div>
        </TabsContent>

        {/* LUGARES */}
        <TabsContent value="fictional-images">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {fictionalImages.map((item) => (
              <CategoryCard
                key={item.id}
                item={item}
                onSpeak={handleSpeak}
                brightness={settings.brightness}
              />
            ))}
            <button
              onClick={() => setShowProfessional(true)}
              className="aspect-square rounded-xl sm:rounded-2xl border-4 sm:border-5 border-dashed border-[#0A2351] bg-white hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-2 sm:gap-3"
            >
              <Plus className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={3} color="#0A2351" />
              <span style={{ color: '#0A2351', fontSize: 'clamp(0.875rem, 2vw, 1.25rem)', fontWeight: 'bold' }}>
                ADICIONAR
              </span>
            </button>
          </div>
        </TabsContent>

        <TabsContent value="phrases">
          <PhraseBuilder
            availableItems={allItems}
            onSpeak={handleSpeak}
            brightness={settings.brightness}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
