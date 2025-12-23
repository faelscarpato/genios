
import React, { useState, useEffect, useRef } from 'react';
import { 
    SparklesIcon, PaperClipIcon, ArrowRightIcon, AcademicCapIcon, BeakerIcon, 
    LightBulbIcon, HeartIcon, GlobeAmericasIcon, WrenchIcon, NewspaperIcon, 
    BoltIcon, ScaleIcon, PuzzlePieceIcon, FingerPrintIcon
} from '@heroicons/react/24/outline';
import { PersonaId } from '../services/gemini';

interface LandingPageProps {
  onStart: (prompt: string, mode: PersonaId, file?: File) => void;
}

// Configuração dos Cards de Personas
const PERSONAS: { id: PersonaId; name: string; category: string; icon: any; desc: string }[] = [
  { id: 'newton', name: 'Newton', category: 'Física', icon: AcademicCapIcon, desc: 'Leis Universais & Óptica' },
  { id: 'einstein', name: 'Einstein', category: 'Física', icon: BeakerIcon, desc: 'Relatividade & Imaginação' },
  { id: 'curie', name: 'Marie Curie', category: 'Química', icon: SparklesIcon, desc: 'Pesquisa & Persistência' },
  { id: 'jobs', name: 'Steve Jobs', category: 'Design', icon: LightBulbIcon, desc: 'Inovação & Minimalismo' },
  { id: 'chanel', name: 'Chanel', category: 'Moda', icon: HeartIcon, desc: 'Estilo & Elegância' },
  { id: 'lovelace', name: 'Lovelace', category: 'Código', icon: AcademicCapIcon, desc: 'Lógica & Algoritmos' },
  { id: 'disney', name: 'Walt Disney', category: 'Storytelling', icon: SparklesIcon, desc: 'Magia & Narrativa' },
  { id: 'darwin', name: 'Darwin', category: 'Biologia', icon: GlobeAmericasIcon, desc: 'Evolução & Adaptação' },
  { id: 'freud', name: 'Freud', category: 'Mente', icon: PuzzlePieceIcon, desc: 'Inconsciente & Sonhos' },
  { id: 'gates', name: 'Bill Gates', category: 'Software', icon: LightBulbIcon, desc: 'Sistemas & Escala' },
  { id: 'galileo', name: 'Galileu', category: 'Método', icon: AcademicCapIcon, desc: 'Observação & Prova' },
  { id: 'ford', name: 'Ford', category: 'Indústria', icon: WrenchIcon, desc: 'Eficiência & Processo' },
  { id: 'gutenberg', name: 'Gutenberg', category: 'Mídia', icon: NewspaperIcon, desc: 'Disseminação & Tipo' },
  { id: 'pasteur', name: 'Pasteur', category: 'Saúde', icon: BeakerIcon, desc: 'Cura & Ciência' },
  { id: 'euclides', name: 'Euclides', category: 'Lógica', icon: PuzzlePieceIcon, desc: 'Geometria & Axiomas' },
  { id: 'copernicus', name: 'Copernicus', category: 'Espaço', icon: GlobeAmericasIcon, desc: 'Novas Perspectivas' },
  { id: 'faraday', name: 'Faraday', category: 'Energia', icon: BoltIcon, desc: 'Experimento & Campo' },
  { id: 'maxwell', name: 'Maxwell', category: 'Luz', icon: BoltIcon, desc: 'Unificação & Ondas' },
  { id: 'schweitzer', name: 'Schweitzer', category: 'Ética', icon: HeartIcon, desc: 'Humanidade & Serviço' },
  { id: 'parks', name: 'Rosa Parks', category: 'Justiça', icon: ScaleIcon, desc: 'Coragem & Direitos' },
];

// Frases para o ciclo de animação inicial
const CYCLE_WORDS = [
    { text: "uma ideia revolucionária?", icon: LightBulbIcon, color: "text-yellow-400" },
    { text: "resolver um problema de física?", icon: AcademicCapIcon, color: "text-blue-400" },
    { text: "entender a biologia?", icon: BeakerIcon, color: "text-green-400" },
    { text: "criar um design único?", icon: SparklesIcon, color: "text-purple-400" },
    { text: "lutar por justiça?", icon: ScaleIcon, color: "text-red-400" },
    { text: "construir o futuro?", icon: GlobeAmericasIcon, color: "text-cyan-400" },
];

// Componente da Animação de Boot
const StartupSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("INICIALIZANDO SISTEMA...");

    useEffect(() => {
        const duration = 3500; // 3.5 segundos total
        const interval = 50;
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const pct = Math.min(100, Math.round((currentStep / steps) * 100));
            setProgress(pct);

            if (pct < 30) setStatus("CALIBRANDO CRONOLOGIA...");
            else if (pct < 60) setStatus("SINCRONIZANDO MENTES BRILHANTES...");
            else if (pct < 90) setStatus("ESTABELECENDO CONEXÃO NEURAL...");
            else setStatus("SISTEMA PRONTO.");

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(onComplete, 500);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center font-mono">
            <div className="w-64 space-y-4">
                <div className="flex items-center justify-center mb-8">
                     <FingerPrintIcon className="w-16 h-16 text-zinc-700 animate-pulse" />
                </div>
                
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_10px_white]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                <div className="flex justify-between text-[10px] text-zinc-500 tracking-widest uppercase">
                    <span>{status}</span>
                    <span>{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // States for flow control
  const [isStartup, setIsStartup] = useState(true);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [viewState, setViewState] = useState<'intro' | 'input' | 'selection'>('intro');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Cycle text animation logic
  useEffect(() => {
    if (isStartup || (viewState !== 'intro' && viewState !== 'input')) return;
    
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % CYCLE_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [viewState, isStartup]);

  // Auto-grow textarea logic
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const target = e.target;
      setPrompt(target.value);
      
      // Reset height to calculate scrollHeight correctly
      target.style.height = 'auto';
      
      // Set new height (capped by CSS max-height)
      target.style.height = `${target.scrollHeight}px`;
  };

  // Handle Input Submit (Transition to Selection)
  const handleInputSubmit = () => {
    if (!prompt.trim() && !selectedFile) return;
    setIsTransitioning(true);
    
    // Simulate camera zoom out / depth effect
    setTimeout(() => {
        setViewState('selection');
        setIsTransitioning(false);
    }, 1200);
  };

  const handlePersonaSelect = (personaId: PersonaId) => {
      onStart(prompt, personaId, selectedFile || undefined);
  };

  const currentWord = CYCLE_WORDS[cycleIndex];
  const CurrentIcon = currentWord.icon;

  return (
    <>
    {isStartup && <StartupSequence onComplete={() => setIsStartup(false)} />}
    
    <div className={`min-h-screen bg-[#09090b] text-zinc-100 flex flex-col overflow-hidden font-sans perspective-1000 relative transition-opacity duration-1000 ${isStartup ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* --- BACKGROUND LAYER (Animated Figures) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-[spin_60s_linear_infinite]">
             {/* Positioning icons in a circle */}
             {PERSONAS.slice(0, 8).map((p, i) => {
                 const angle = (i / 8) * 2 * Math.PI;
                 const x = Math.cos(angle) * 300;
                 const y = Math.sin(angle) * 300;
                 const Icon = p.icon;
                 return (
                     <div key={p.id} className="absolute text-zinc-600" style={{ transform: `translate(${x}px, ${y}px)` }}>
                         <Icon className="w-24 h-24 opacity-20" />
                     </div>
                 );
             })}
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b]"></div>
      </div>


      {/* --- CONTENT LAYER --- */}
      <div className={`flex-1 flex flex-col items-center justify-center p-4 transition-all duration-1000 transform-style-3d 
          ${viewState === 'selection' ? 'scale-90 opacity-0 pointer-events-none absolute inset-0' : 'scale-100 opacity-100'}
      `}>
          
          {/* Animated Header */}
          <div className="text-center space-y-6 mb-12 z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              Você precisa <br className="md:hidden"/>
              <span className={`inline-flex items-center gap-3 transition-colors duration-500 ${currentWord.color} h-20`}>
                 <CurrentIcon className="w-10 h-10 md:w-12 md:h-12 animate-pulse" />
                 <span key={cycleIndex} className="animate-text-cycle block text-2xl md:text-4xl whitespace-nowrap">
                   {currentWord.text}
                 </span>
              </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in delay-100">
               Nós podemos ajudar. Invoque as mentes mais brilhantes da história para colaborar no seu projeto.
            </p>
          </div>

          {/* Input Box */}
          <div className="w-full max-w-2xl relative group z-20 animate-fade-in delay-200">
             <div className="absolute -inset-1 bg-gradient-to-grey from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
             <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-2xl">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={handleInput}
                  rows={2}
                  placeholder="Descreva seu desafio, ideia ou dúvida aqui..."
                  className="w-full bg-transparent border-none outline-none resize-none min-h-[56px] max-h-[120px] overflow-y-auto p-2 text-lg placeholder-zinc-600 leading-relaxed scrollbar-hide"
                  onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleInputSubmit(); }}}
                />
                
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800">
                   <div className="flex items-center gap-4">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-zinc-800"
                      >
                        <PaperClipIcon className="w-5 h-5" />
                        <span className="text-sm">{selectedFile ? selectedFile.name.substring(0, 15) + '...' : 'Anexar'}</span>
                      </button>
                      <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                   </div>

                   <button 
                      onClick={handleInputSubmit}
                      disabled={(!prompt.trim() && !selectedFile) || isTransitioning}
                      className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all min-w-[140px] justify-center
                          ${(!prompt.trim() && !selectedFile) || isTransitioning
                             ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                             : 'bg-white text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'}
                      `}
                   >
                      {isTransitioning ? (
                          <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-sm">Processando...</span>
                          </div>
                      ) : (
                          <>
                              <span>Continuar</span>
                              <ArrowRightIcon className="w-4 h-4" />
                          </>
                      )}
                   </button>
                </div>
             </div>
          </div>

      </div>

      {/* --- SELECTION LAYER (CARDS) --- */}
      {viewState === 'selection' && (
          <div className={`absolute inset-0 z-50 overflow-y-auto bg-[#09090b]/90 backdrop-blur-xl animate-fade-in`}>
              <div className="max-w-7xl mx-auto p-8 md:p-12 min-h-screen flex flex-col">
                  
                  <div className="flex items-center justify-between mb-12 animate-fade-in">
                      <div>
                          <h2 className="text-3xl font-bold text-white mb-2">Quem deve assumir?</h2>
                          <p className="text-zinc-400">Selecione o Gênio ideal para: <span className="text-white italic">"{prompt.substring(0, 30)}{prompt.length > 30 ? '...' : ''}"</span></p>
                      </div>
                      <button 
                         onClick={() => setViewState('input')}
                         className="text-sm text-zinc-500 hover:text-white underline"
                      >
                          Voltar e editar
                      </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
                      {PERSONAS.filter(p => p.id !== ('da_vinci' as any)).map((persona, index) => (
                          <button
                            key={persona.id}
                            onClick={() => handlePersonaSelect(persona.id)}
                            className="group relative bg-zinc-900 border border-zinc-800 p-6 rounded-xl text-left hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] card-enter"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-500"></div>
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
                                        <persona.icon className="w-8 h-8 text-zinc-300 group-hover:text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-blue-400 transition-colors">
                                        {persona.category}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold mb-1 text-white">{persona.name}</h3>
                                <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors mb-4">{persona.desc}</p>
                                
                                <div className="mt-auto flex items-center gap-2 text-xs font-medium text-blue-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <span>Invocar</span>
                                    <ArrowRightIcon className="w-3 h-3" />
                                </div>
                            </div>
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-zinc-700 text-xs z-10 pointer-events-none">
        Legado Criativo & Ciência Aplicada
      </footer>
    </div>
    </>
  );
};
