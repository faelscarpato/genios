
import React, { useState, useEffect } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { InputArea } from './components/InputArea';
import { LivePreview } from './components/LivePreview';
import { CreationHistory, Creation } from './components/CreationHistory';
import { LandingPage } from './components/LandingPage';
import { PersonaIntro } from './components/PersonaIntro'; // Import Intro
import { interactWithGenius, PersonaId, PERSONA_MAP } from './services/gemini';
import { Part } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false); // New state for intro animation
  const [activeCreation, setActiveCreation] = useState<Creation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<Creation[]>([]);
  const [mode, setMode] = useState<PersonaId>('newton');
  
  // Chat History
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [geminiHistory, setGeminiHistory] = useState<{ role: 'user' | 'model', parts: Part[] }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('genius_history_v2');
    if (saved) {
      setHistory(JSON.parse(saved).map((i: any) => ({ ...i, timestamp: new Date(i.timestamp) })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('genius_history_v2', JSON.stringify(history));
  }, [history]);

  const handleLandingStart = async (prompt: string, selectedPersona: PersonaId, file?: File) => {
    setMode(selectedPersona);
    setShowIntro(true); // Trigger intro
    // setHasStarted(true); // We'll set this after intro completes now
    
    // Prepare initial state but wait for intro
    if (prompt || file) {
      // Just queue the message logic, will execute after intro
    } else {
        setChatMessages([{
            role: 'model',
            text: `Olá! Eu sou ${PERSONA_MAP[selectedPersona].name}. Como posso ajudar você hoje com meus conhecimentos em ${PERSONA_MAP[selectedPersona].specialty}?`,
            timestamp: new Date()
        }]);
    }

    // Preserve initial prompt/file to trigger after intro if needed
    // For simplicity in this structure, we'll let the user interact after intro unless prompt was passed.
    if(prompt || file) {
       handleSendMessage(prompt, file, selectedPersona);
    }
  };

  const onIntroComplete = () => {
    setShowIntro(false);
    setHasStarted(true);
  };

  const handleSendMessage = async (text: string, file?: File, personaId: PersonaId = mode) => {
    setIsGenerating(true);
    
    const userMsg: ChatMessage = { role: 'user', text: text || (file ? "Anexo enviado" : ""), timestamp: new Date() };
    setChatMessages(prev => [...prev, userMsg]);

    try {
      let fileBase64: string | undefined;
      let mimeType: string | undefined;

      if (file) {
        const reader = new FileReader();
        fileBase64 = await new Promise((resolve) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(file);
        });
        mimeType = file.type;
      }

      const result = await interactWithGenius(text, geminiHistory, personaId, fileBase64, mimeType);
      
      const modelMsg: ChatMessage = { role: 'model', text: result.text, timestamp: new Date() };
      setChatMessages(prev => [...prev, modelMsg]);

      setGeminiHistory(prev => [
        ...prev, 
        { role: 'user', parts: [{ text: text }] },
        { role: 'model', parts: [{ text: result.text + (result.html ? `\n\`\`\`html\n${result.html}\n\`\`\`` : '') }] }
      ]);

      if (result.html) {
        const newCreation: Creation = {
          id: crypto.randomUUID(),
          name: `${personaId.toUpperCase()} Artifact`,
          html: result.html,
          originalImage: file ? URL.createObjectURL(file) : undefined,
          timestamp: new Date(),
        };
        setActiveCreation(newCreation);
        setHistory(prev => [newCreation, ...prev]);
      }
    } catch (error) {
      alert("Houve uma falha na conexão temporal.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setHasStarted(false);
    setShowIntro(false);
    setActiveCreation(null);
    setChatMessages([]);
    setGeminiHistory([]);
  };

  if (!hasStarted && !showIntro) {
    return <LandingPage onStart={handleLandingStart} />;
  }

  // Determine LivePreview Mode based on Persona Style
  const getPreviewMode = () => {
      const style = PERSONA_MAP[mode].style;
      if (style === 'modern') return 'app';
      if (style === 'artistic') return 'fusion';
      return 'davinci'; // Default for scientific and classic
  };

  const previewMode = getPreviewMode();

  return (
    <div className="h-screen bg-[#09090b] text-white flex flex-col relative overflow-hidden">
      
      {/* INTRO OVERLAY */}
      {showIntro && (
        <PersonaIntro personaId={mode} onComplete={onIntroComplete} />
      )}

      {/* Sidebar/Header area */}
      <header className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
            <button onClick={handleReset} className="text-zinc-500 hover:text-white transition">
            ← Voltar
            </button>
            <div className="h-4 w-px bg-zinc-800"></div>
            <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">{PERSONA_MAP[mode].role}</span>
                <span className="text-sm font-medium">{PERSONA_MAP[mode].name}</span>
            </div>
        </div>
        
        {history.length > 0 && (
            <button 
                onClick={() => setActiveCreation(null)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${!activeCreation ? 'bg-blue-600 border-blue-500 text-white' : 'border-zinc-700 text-zinc-500'}`}
            >
                Bate-papo
            </button>
        )}
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Chat Area */}
        <div className={`flex flex-col h-full transition-all duration-500 ${activeCreation ? 'w-full md:w-1/3' : 'w-full max-w-4xl mx-auto'}`}>
           <ChatInterface 
            messages={chatMessages} 
            personaId={mode} 
            isGenerating={isGenerating} 
           />
           <InputArea 
            onSendMessage={handleSendMessage} 
            isGenerating={isGenerating} 
            personaId={mode} 
           />
        </div>

        {/* Preview Area (Overlay or Side) */}
        {activeCreation && (
            <div className="hidden md:block flex-1 border-l border-zinc-800">
                <LivePreview
                    creation={activeCreation}
                    isLoading={false}
                    isFocused={true}
                    onReset={() => setActiveCreation(null)}
                    mode={previewMode}
                />
            </div>
        )}
      </main>

      {/* Mobile Preview Trigger */}
      {activeCreation && (
          <div className="md:hidden fixed bottom-24 right-4 z-50">
              <button 
                onClick={() => setActiveCreation(activeCreation)}
                className="w-14 h-14 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20"
              >
                  <span className="text-xs font-bold">VER</span>
              </button>
          </div>
      )}

      {/* Mobile LivePreview Modal Overlay */}
      {activeCreation && (
          <div className="md:hidden">
               <LivePreview
                    creation={activeCreation}
                    isLoading={false}
                    isFocused={true}
                    onReset={() => setActiveCreation(null)}
                    mode={previewMode}
                />
          </div>
      )}
    </div>
  );
};

export default App;
