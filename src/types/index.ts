export interface CommunicationItem {
  id: string;
  text: string;
  audioText: string;
  type: 'gesture' | 'video' | 'real-image' | 'fictional-image';
  category?: string;
  level?: 'basic' | 'intermediate' | 'advanced';
  imageUrl?: string;
  videoUrl?: string;
  isCustom?: boolean;
}

export interface UserSettings {
  voiceGender: 'female' | 'male';
  brightness: number;
  fontSize: 'normal' | 'large' | 'extra-large';
}

export interface PhraseBuilderItem {
  id: string;
  text: string;
  imageUrl?: string;
}
