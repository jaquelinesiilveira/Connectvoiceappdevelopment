export const speak = (text: string, voiceGender: 'female' | 'male' = 'female') => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    // Try to select appropriate voice
    const voices = window.speechSynthesis.getVoices();
    const portugueseVoices = voices.filter(voice => voice.lang.includes('pt'));
    
    if (portugueseVoices.length > 0) {
      const preferredVoice = portugueseVoices.find(voice => {
        const voiceName = voice.name.toLowerCase();
        if (voiceGender === 'female') {
          return voiceName.includes('female') || voiceName.includes('feminino') || voiceName.includes('luciana') || voiceName.includes('monica');
        } else {
          return voiceName.includes('male') || voiceName.includes('masculino') || voiceName.includes('daniel') || voiceName.includes('felipe');
        }
      });
      utterance.voice = preferredVoice || portugueseVoices[0];
    }

    window.speechSynthesis.speak(utterance);
  }
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
