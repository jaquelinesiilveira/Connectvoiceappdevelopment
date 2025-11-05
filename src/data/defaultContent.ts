import { CommunicationItem } from '../types';

// ==================== GESTOS (VÍDEOS/GIFS DE PESSOAS FAZENDO GESTOS) ====================

export const defaultGestures: CommunicationItem[] = [
  { id: 'g1', text: 'SIM', audioText: 'Sim', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-yes' },
  { id: 'g2', text: 'NÃO', audioText: 'Não', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-no' },
  { id: 'g3', text: 'OLÁ', audioText: 'Olá', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-hello' },
  { id: 'g4', text: 'TCHAU', audioText: 'Tchau', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-goodbye' },
  { id: 'g5', text: 'OBRIGADO', audioText: 'Obrigado', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-thanks' },
  { id: 'g6', text: 'POR FAVOR', audioText: 'Por favor', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-please' },
  { id: 'g7', text: 'AJUDA', audioText: 'Preciso de ajuda', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-please' },
  { id: 'g8', text: 'FELIZ', audioText: 'Estou feliz', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-happy' },
  { id: 'g9', text: 'TRISTE', audioText: 'Estou triste', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-sad' },
  { id: 'g10', text: 'DOR', audioText: 'Estou com dor', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-pain' },
  { id: 'g11', text: 'AMOR', audioText: 'Te amo', type: 'gesture', category: 'GESTOS', imageUrl: 'gesture-love' },
];

// ==================== VÍDEOS DE AÇÕES ====================

export const defaultVideos: CommunicationItem[] = [
  { id: 'v1', text: 'BEBER ÁGUA', audioText: 'Quero beber água', type: 'video', category: 'AÇÕES', imageUrl: 'video-water' },
  { id: 'v2', text: 'COMER', audioText: 'Quero comer', type: 'video', category: 'AÇÕES', imageUrl: 'video-eating' },
  { id: 'v3', text: 'IR AO BANHEIRO', audioText: 'Preciso ir ao banheiro', type: 'video', category: 'AÇÕES', imageUrl: 'gesture-bathroom' },
  { id: 'v4', text: 'ESCOVAR DENTES', audioText: 'Vou escovar os dentes', type: 'video', category: 'AÇÕES', imageUrl: 'video-brushing' },
  { id: 'v5', text: 'TOMAR BANHO', audioText: 'Vou tomar banho', type: 'video', category: 'AÇÕES', imageUrl: 'gesture-bathroom' },
  { id: 'v6', text: 'DORMIR', audioText: 'Quero dormir', type: 'video', category: 'AÇÕES', imageUrl: 'gesture-tired' },
  { id: 'v7', text: 'ASSISTIR TV', audioText: 'Quero assistir televisão', type: 'video', category: 'AÇÕES', imageUrl: 'gesture-tv' },
  { id: 'v8', text: 'BRINCAR', audioText: 'Quero brincar', type: 'video', category: 'AÇÕES', imageUrl: 'gesture-happy' },
];

// ==================== IMAGENS REAIS (COM PESSOA DE REFERÊNCIA) ====================

export const defaultRealImages: CommunicationItem[] = [
  { id: 'ri1', text: 'ÁGUA', audioText: 'Água', type: 'real-image', category: 'OBJETOS', imageUrl: 'water' },
  { id: 'ri2', text: 'COMIDA', audioText: 'Comida', type: 'real-image', category: 'OBJETOS', imageUrl: 'food' },
  { id: 'ri3', text: 'BANHEIRO', audioText: 'Banheiro', type: 'real-image', category: 'LUGARES', imageUrl: 'bathroom' },
  { id: 'ri4', text: 'CAMA', audioText: 'Cama', type: 'real-image', category: 'OBJETOS', imageUrl: 'bed-person' },
  { id: 'ri5', text: 'REMÉDIO', audioText: 'Remédio', type: 'real-image', category: 'OBJETOS', imageUrl: 'medicine' },
  { id: 'ri6', text: 'TELEFONE', audioText: 'Telefone', type: 'real-image', category: 'OBJETOS', imageUrl: 'phone-person' },
  { id: 'ri7', text: 'LIVRO', audioText: 'Livro', type: 'real-image', category: 'OBJETOS', imageUrl: 'book' },
  { id: 'ri8', text: 'MAMÃE/PAPAI', audioText: 'Quero meus pais', type: 'real-image', category: 'PESSOAS', imageUrl: 'person-parents' },
  { id: 'ri9', text: 'EU', audioText: 'Eu mesmo', type: 'real-image', category: 'PESSOAS', imageUrl: 'person-me' },
  { id: 'ri10', text: 'VOVÔ/VOVÓ', audioText: 'Quero meus avós', type: 'real-image', category: 'PESSOAS', imageUrl: 'person-grandparents' },
];

// ==================== IMAGENS FICTÍCIAS (SEMPRE COM PESSOA DE REFERÊNCIA) ====================

export const defaultFictionalImages: CommunicationItem[] = [
  { id: 'fi1', text: 'CASA', audioText: 'Casa', type: 'fictional-image', category: 'LUGARES', imageUrl: 'house-person' },
  { id: 'fi2', text: 'ESCOLA', audioText: 'Escola', type: 'fictional-image', category: 'LUGARES', imageUrl: 'school-person' },
  { id: 'fi3', text: 'HOSPITAL', audioText: 'Hospital', type: 'fictional-image', category: 'LUGARES', imageUrl: 'hospital-illustration' },
  { id: 'fi4', text: 'PARQUE', audioText: 'Parque', type: 'fictional-image', category: 'LUGARES', imageUrl: 'park-person' },
  { id: 'fi5', text: 'CARRO', audioText: 'Carro', type: 'fictional-image', category: 'TRANSPORTE', imageUrl: 'car-person' },
  { id: 'fi6', text: 'ÁRVORE', audioText: 'Árvore', type: 'fictional-image', category: 'NATUREZA', imageUrl: 'tree-person' },
];
