import { useState } from 'react';
import { Lock, Plus, Trash2, ArrowLeft, Upload, Edit2, X } from 'lucide-react';
import { CommunicationItem } from '../types';

interface ProfessionalAreaProps {
  onAddItem: (item: CommunicationItem) => void;
  onUpdateItem: (item: CommunicationItem) => void;
  onDeleteItem: (id: string, type: CommunicationItem['type']) => void;
  allItems: CommunicationItem[];
  onClose: () => void;
  brightness: number;
}

export function ProfessionalArea({ onAddItem, onUpdateItem, onDeleteItem, allItems, onClose, brightness }: ProfessionalAreaProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<CommunicationItem | null>(null);
  const [filterType, setFilterType] = useState<'all' | CommunicationItem['type']>('all');
  const [newItem, setNewItem] = useState({
    text: '',
    audioText: '',
    type: 'gesture' as CommunicationItem['type'],
    category: '',
    imageUrl: '',
  });

  const handleLogin = () => {
    // Mock authentication - in production, use proper authentication
    if (password === 'profissional123') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing && editingItem) {
          setEditingItem({ ...editingItem, imageUrl: reader.result as string });
        } else {
          setNewItem({ ...newItem, imageUrl: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    if (!newItem.text || !newItem.audioText) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const item: CommunicationItem = {
      id: `custom-${Date.now()}`,
      text: newItem.text,
      audioText: newItem.audioText,
      type: newItem.type,
      category: newItem.category || undefined,
      imageUrl: newItem.imageUrl || undefined,
      isCustom: true,
    };

    onAddItem(item);
    setNewItem({ text: '', audioText: '', type: 'gesture', category: '', imageUrl: '' });
    setShowAddForm(false);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;
    
    if (!editingItem.text || !editingItem.audioText) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    onUpdateItem(editingItem);
    setEditingItem(null);
  };

  const startEditing = (item: CommunicationItem) => {
    setEditingItem({ ...item });
    setShowAddForm(false);
  };

  const cancelEditing = () => {
    setEditingItem(null);
  };

  const filteredItems = filterType === 'all' 
    ? allItems 
    : allItems.filter(item => item.type === filterType);

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{ 
          backgroundColor: '#FFFFFF',
          filter: `brightness(${brightness}%)`,
        }}
      >
        <div className="w-full max-w-md">
          {/* Botão Voltar */}
          <button
            onClick={onClose}
            className="mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all hover:scale-110 active:scale-95 border-4 sm:border-5"
            style={{ 
              backgroundColor: '#FF6600',
              borderColor: '#0A2351'
            }}
            aria-label="VOLTAR"
          >
            <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" color="#FFFFFF" strokeWidth={3} />
          </button>

          <div className="text-center mb-8">
            <div 
              className="inline-flex p-6 sm:p-8 rounded-full mb-6 border-5"
              style={{ 
                backgroundColor: '#0A2351',
                borderColor: '#FF6600'
              }}
            >
              <Lock className="w-12 h-12 sm:w-16 sm:h-16" color="#FFFFFF" strokeWidth={3} />
            </div>
            <h2 
              className="mb-3 uppercase"
              style={{ 
                color: '#0A2351',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 'bold'
              }}
            >
              ÁREA DO PROFISSIONAL
            </h2>
            <p 
              className="uppercase"
              style={{ 
                color: '#0A2351', 
                opacity: 0.7,
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 'bold'
              }}
            >
              DIGITE A SENHA PARA ACESSAR
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="SENHA"
              className="w-full px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl outline-none border-4 sm:border-5 uppercase"
              style={{ 
                borderColor: '#0A2351',
                color: '#0A2351',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 'bold'
              }}
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 sm:px-6 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase border-4 sm:border-5"
              style={{ 
                backgroundColor: '#FF6600', 
                borderColor: '#0A2351',
                color: '#FFFFFF',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 'bold',
                boxShadow: '0 4px 0 rgba(10, 35, 81, 0.3)'
              }}
            >
              ENTRAR
            </button>
            <p 
              className="text-center"
              style={{ 
                color: '#0A2351', 
                opacity: 0.5,
                fontSize: 'clamp(0.75rem, 2vw, 1rem)'
              }}
            >
              senha demo: profissional123
            </p>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
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
                fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
                fontWeight: 'bold'
              }}
            >
              ÁREA DO PROFISSIONAL
            </h2>
          </div>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingItem(null);
            }}
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 transition-all hover:scale-105 active:scale-95 uppercase border-4 sm:border-5"
            style={{ 
              backgroundColor: '#FF6600',
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: 'bold'
            }}
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
            NOVO ITEM
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Formulário de Adicionar */}
          {showAddForm && (
            <div 
              className="mb-6 sm:mb-8 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-5"
              style={{ borderColor: '#0A2351', backgroundColor: '#FFFFFF' }}
            >
              <h3 
                className="mb-4 sm:mb-6 uppercase" 
                style={{ 
                  color: '#0A2351',
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 'bold'
                }}
              >
                ADICIONAR NOVO ITEM
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label 
                    className="block mb-2 sm:mb-3 uppercase" 
                    style={{ 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    TIPO
                  </label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value as CommunicationItem['type'] })}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl outline-none border-4 sm:border-5 uppercase"
                    style={{ 
                      borderColor: '#0A2351', 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    <option value="gesture">GESTO (GIF/VÍDEO)</option>
                    <option value="video">AÇÃO (VÍDEO)</option>
                    <option value="real-image">IMAGEM REAL</option>
                    <option value="fictional-image">LUGAR</option>
                  </select>
                </div>

                <div>
                  <label 
                    className="block mb-2 sm:mb-3 uppercase" 
                    style={{ 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    TEXTO DE EXIBIÇÃO *
                  </label>
                  <input
                    type="text"
                    value={newItem.text}
                    onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl outline-none border-4 sm:border-5"
                    style={{ 
                      borderColor: '#0A2351', 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                    }}
                    placeholder="EX: OLÁ"
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2 sm:mb-3 uppercase" 
                    style={{ 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    TEXTO PARA ÁUDIO *
                  </label>
                  <input
                    type="text"
                    value={newItem.audioText}
                    onChange={(e) => setNewItem({ ...newItem, audioText: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl outline-none border-4 sm:border-5"
                    style={{ 
                      borderColor: '#0A2351', 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                    }}
                    placeholder="ex: olá"
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2 sm:mb-3 uppercase" 
                    style={{ 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    IMAGEM/GIF (OPCIONAL)
                  </label>
                  <div className="flex items-center gap-3">
                    <label 
                      className="flex-1 px-4 py-3 sm:py-4 rounded-xl border-4 sm:border-5 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 transition-all hover:scale-105 active:scale-95 uppercase"
                      style={{ 
                        borderColor: '#0A2351',
                        backgroundColor: '#FF6600',
                        color: '#FFFFFF',
                        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                        fontWeight: 'bold'
                      }}
                    >
                      <Upload className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                      ENVIAR IMAGEM
                      <input
                        type="file"
                        accept="image/*,.gif"
                        onChange={(e) => handleImageUpload(e, false)}
                        className="hidden"
                      />
                    </label>
                    {newItem.imageUrl && (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-4" style={{ borderColor: '#0A2351' }}>
                        <img src={newItem.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleAddItem}
                    className="flex-1 px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase border-4 sm:border-5"
                    style={{ 
                      backgroundColor: '#FF6600',
                      borderColor: '#0A2351',
                      color: '#FFFFFF',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 0 rgba(10, 35, 81, 0.3)'
                    }}
                  >
                    ADICIONAR
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase border-4 sm:border-5"
                    style={{ 
                      backgroundColor: '#0A2351',
                      borderColor: '#FF6600',
                      color: '#FFFFFF',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Formulário de Edição */}
          {editingItem && (
            <div 
              className="mb-6 sm:mb-8 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border-5"
              style={{ borderColor: '#FF6600', backgroundColor: '#FFFFFF' }}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 
                  className="uppercase" 
                  style={{ 
                    color: '#0A2351',
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                    fontWeight: 'bold'
                  }}
                >
                  EDITAR ITEM
                </h3>
                <button
                  onClick={cancelEditing}
                  className="p-2 rounded-lg transition-all hover:scale-110 active:scale-95"
                  style={{ color: '#0A2351' }}
                >
                  <X className="w-6 h-6" strokeWidth={3} />
                </button>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label 
                    className="block mb-2 sm:mb-3 uppercase" 
                    style={{ 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    TIPO: {editingItem.type === 'gesture' ? 'GESTO' : editingItem.type === 'video' ? 'AÇÃO' : editingItem.type === 'real-image' ? 'IMAGEM REAL' : 'LUGAR'}
                  </label>
                </div>

                <div>
                  <label 
                    className="block mb-2 sm:mb-3 uppercase" 
                    style={{ 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    TEXTO DE EXIBIÇÃO *
                  </label>
                  <input
                    type="text"
                    value={editingItem.text}
                    onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl outline-none border-4 sm:border-5"
                    style={{ 
                      borderColor: '#0A2351', 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2 sm:mb-3 uppercase" 
                    style={{ 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    TEXTO PARA ÁUDIO *
                  </label>
                  <input
                    type="text"
                    value={editingItem.audioText}
                    onChange={(e) => setEditingItem({ ...editingItem, audioText: e.target.value })}
                    className="w-full px-4 py-3 sm:py-4 rounded-xl outline-none border-4 sm:border-5"
                    style={{ 
                      borderColor: '#0A2351', 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                    }}
                  />
                </div>

                <div>
                  <label 
                    className="block mb-2 sm:mb-3 uppercase" 
                    style={{ 
                      color: '#0A2351',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    IMAGEM/GIF
                  </label>
                  <div className="flex items-center gap-3">
                    <label 
                      className="flex-1 px-4 py-3 sm:py-4 rounded-xl border-4 sm:border-5 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 transition-all hover:scale-105 active:scale-95 uppercase"
                      style={{ 
                        borderColor: '#0A2351',
                        backgroundColor: '#FF6600',
                        color: '#FFFFFF',
                        fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                        fontWeight: 'bold'
                      }}
                    >
                      <Upload className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                      ALTERAR IMAGEM
                      <input
                        type="file"
                        accept="image/*,.gif"
                        onChange={(e) => handleImageUpload(e, true)}
                        className="hidden"
                      />
                    </label>
                    {editingItem.imageUrl && (
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-4" style={{ borderColor: '#0A2351' }}>
                        <img src={editingItem.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleUpdateItem}
                    className="flex-1 px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase border-4 sm:border-5"
                    style={{ 
                      backgroundColor: '#FF6600',
                      borderColor: '#0A2351',
                      color: '#FFFFFF',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 0 rgba(10, 35, 81, 0.3)'
                    }}
                  >
                    SALVAR ALTERAÇÕES
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase border-4 sm:border-5"
                    style={{ 
                      backgroundColor: '#0A2351',
                      borderColor: '#FF6600',
                      color: '#FFFFFF',
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 'bold'
                    }}
                  >
                    CANCELAR
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filtros */}
          <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setFilterType('all')}
              className="px-4 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95 uppercase border-3 sm:border-4"
              style={{
                backgroundColor: filterType === 'all' ? '#FF6600' : '#FFFFFF',
                color: filterType === 'all' ? '#FFFFFF' : '#0A2351',
                borderColor: '#0A2351',
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                fontWeight: 'bold'
              }}
            >
              TODOS
            </button>
            <button
              onClick={() => setFilterType('gesture')}
              className="px-4 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95 uppercase border-3 sm:border-4"
              style={{
                backgroundColor: filterType === 'gesture' ? '#FF6600' : '#FFFFFF',
                color: filterType === 'gesture' ? '#FFFFFF' : '#0A2351',
                borderColor: '#0A2351',
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                fontWeight: 'bold'
              }}
            >
              GESTOS
            </button>
            <button
              onClick={() => setFilterType('video')}
              className="px-4 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95 uppercase border-3 sm:border-4"
              style={{
                backgroundColor: filterType === 'video' ? '#FF6600' : '#FFFFFF',
                color: filterType === 'video' ? '#FFFFFF' : '#0A2351',
                borderColor: '#0A2351',
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                fontWeight: 'bold'
              }}
            >
              AÇÕES
            </button>
            <button
              onClick={() => setFilterType('real-image')}
              className="px-4 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95 uppercase border-3 sm:border-4"
              style={{
                backgroundColor: filterType === 'real-image' ? '#FF6600' : '#FFFFFF',
                color: filterType === 'real-image' ? '#FFFFFF' : '#0A2351',
                borderColor: '#0A2351',
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                fontWeight: 'bold'
              }}
            >
              IMAGENS
            </button>
            <button
              onClick={() => setFilterType('fictional-image')}
              className="px-4 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95 uppercase border-3 sm:border-4"
              style={{
                backgroundColor: filterType === 'fictional-image' ? '#FF6600' : '#FFFFFF',
                color: filterType === 'fictional-image' ? '#FFFFFF' : '#0A2351',
                borderColor: '#0A2351',
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                fontWeight: 'bold'
              }}
            >
              LUGARES
            </button>
          </div>

          {/* Lista de Itens */}
          <div>
            <h3 
              className="mb-4 sm:mb-6 uppercase" 
              style={{ 
                color: '#0A2351',
                fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
                fontWeight: 'bold'
              }}
            >
              ITENS CADASTRADOS ({filteredItems.length})
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 sm:p-5 rounded-xl border-4 sm:border-5"
                  style={{ borderColor: '#0A2351', backgroundColor: '#FFFFFF' }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1">
                    {item.imageUrl && (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-3" style={{ borderColor: '#0A2351' }}>
                        <img src={item.imageUrl} alt={item.text} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p 
                        className="uppercase mb-1"
                        style={{ 
                          color: '#0A2351',
                          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                          fontWeight: 'bold'
                        }}
                      >
                        {item.text}
                      </p>
                      <p 
                        className="uppercase"
                        style={{ 
                          color: '#0A2351', 
                          opacity: 0.6,
                          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
                        }}
                      >
                        {item.type === 'gesture' ? 'GESTO' : item.type === 'video' ? 'AÇÃO' : item.type === 'real-image' ? 'IMAGEM' : 'LUGAR'}
                        {item.category && ` • ${item.category}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(item)}
                      className="p-2 sm:p-3 rounded-lg transition-all hover:scale-110 active:scale-95 border-3 sm:border-4"
                      style={{ 
                        backgroundColor: '#0A2351',
                        borderColor: '#FF6600',
                        color: '#FFFFFF' 
                      }}
                      aria-label="EDITAR"
                    >
                      <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Tem certeza que deseja excluir "${item.text}"?`)) {
                          onDeleteItem(item.id, item.type);
                        }
                      }}
                      className="p-2 sm:p-3 rounded-lg transition-all hover:scale-110 active:scale-95 border-3 sm:border-4"
                      style={{ 
                        backgroundColor: '#FF6600',
                        borderColor: '#0A2351',
                        color: '#FFFFFF' 
                      }}
                      aria-label="EXCLUIR"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                    </button>
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <p 
                  className="text-center py-8 uppercase"
                  style={{ 
                    color: '#0A2351', 
                    opacity: 0.5,
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    fontWeight: 'bold'
                  }}
                >
                  NENHUM ITEM ENCONTRADO
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
