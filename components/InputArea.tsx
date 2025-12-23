
import React, { useRef, useState } from 'react';
import { PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { PersonaId, PERSONA_MAP } from '../services/gemini';

interface InputAreaProps {
  onSendMessage: (text: string, file?: File) => void;
  isGenerating: boolean;
  personaId: PersonaId;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isGenerating, personaId }) => {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const persona = PERSONA_MAP[personaId];

  const handleSend = () => {
    if ((!text.trim() && !selectedFile) || isGenerating) return;
    onSendMessage(text, selectedFile || undefined);
    setText('');
    setSelectedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden focus-within:border-blue-500/50 transition-all">
        {selectedFile && (
          <div className="px-4 py-2 bg-zinc-800/50 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400 truncate max-w-xs">{selectedFile.name}</span>
            <button onClick={() => setSelectedFile(null)} className="text-zinc-500 hover:text-white">×</button>
          </div>
        )}
        <div className="flex items-end p-2 gap-2">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-zinc-500 hover:text-zinc-300 transition shrink-0"
            title="Anexar arquivo ou imagem"
          >
            <PaperClipIcon className="w-6 h-6" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} 
          />
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Fale com ${persona.name}...`}
            className="flex-1 bg-transparent border-none outline-none resize-none h-12 py-3 px-2 text-zinc-100 placeholder-zinc-600"
          />

          <button
            onClick={handleSend}
            disabled={(!text.trim() && !selectedFile) || isGenerating}
            className={`p-3 rounded-xl transition shrink-0 ${
              (!text.trim() && !selectedFile) || isGenerating
                ? 'text-zinc-700'
                : 'text-blue-500 hover:bg-blue-500/10'
            }`}
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <p className="text-[10px] text-center mt-2 text-zinc-600 uppercase tracking-tighter">
        O gênio pode apresentar alucinações. Use com sabedoria histórica.
      </p>
    </div>
  );
};
