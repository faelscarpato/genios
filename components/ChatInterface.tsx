
import React, { useEffect, useRef } from 'react';
import { PersonaId, PERSONA_MAP } from '../services/gemini';
import { UserIcon } from '@heroicons/react/24/outline';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  personaId: PersonaId;
  isGenerating: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, personaId, isGenerating }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const persona = PERSONA_MAP[personaId];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
      {messages.map((msg, i) => (
        <div 
          key={i} 
          className={`flex gap-4 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border 
            ${msg.role === 'user' 
              ? 'bg-zinc-800 border-zinc-700' 
              : 'bg-blue-600/20 border-blue-500/30'
            }`}
          >
            {msg.role === 'user' ? (
              <UserIcon className="w-6 h-6 text-zinc-400" />
            ) : (
              <span className="text-xs font-bold text-blue-400">{persona.name[0]}</span>
            )}
          </div>
          
          <div className={`max-w-[80%] space-y-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
            <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                {msg.role === 'user' ? 'Você' : persona.name}
              </span>
            </div>
            <div className={`p-4 rounded-2xl text-sm leading-relaxed 
              ${msg.role === 'user' 
                ? 'bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-tr-none' 
                : 'bg-blue-600/5 border border-blue-500/20 text-blue-100 rounded-tl-none'
              }`}
            >
              {msg.text.split('\n').map((line, idx) => (
                <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {isGenerating && (
        <div className="flex gap-4 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
             <span className="text-xs font-bold text-blue-400">{persona.name[0]}</span>
          </div>
          <div className="bg-blue-600/5 border border-blue-500/20 p-4 rounded-2xl rounded-tl-none">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
