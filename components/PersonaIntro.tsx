
import React, { useEffect, useState } from 'react';
import { PersonaId, PERSONA_MAP } from '../services/gemini';
import { SparklesIcon, DevicePhoneMobileIcon, FilmIcon, EyeIcon } from '@heroicons/react/24/outline';

interface PersonaIntroProps {
  personaId: PersonaId;
  onComplete: () => void;
}

// Novos tipos de animação
type AnimationType = 
  | 'cosmos' | 'tech' | 'bio' | 'sketch' | 'mind' | 'industrial' 
  | 'print' | 'geometry' | 'astronomy' | 'electric' | 'medical' 
  | 'justice' | 'magnetism' | 'radioactive' | 'design' | 'fashion' 
  | 'cartoon' | 'evolution' | 'method' | 'psycho';

const getAnimationType = (id: PersonaId): AnimationType => {
  const map: Record<string, AnimationType> = {
    newton: 'cosmos', einstein: 'cosmos', galileo: 'method', copernicus: 'astronomy', 
    curie: 'radioactive', 
    faraday: 'electric', maxwell: 'magnetism',
    jobs: 'design', gates: 'tech', lovelace: 'tech', 
    ford: 'industrial',
    darwin: 'evolution', pasteur: 'bio',
    da_vinci: 'sketch', disney: 'cartoon', chanel: 'fashion', 
    gutenberg: 'print', euclides: 'geometry',
    freud: 'psycho', schweitzer: 'medical', parks: 'justice'
  };
  return (map[id] as any) || 'sketch';
};

export const PersonaIntro: React.FC<PersonaIntroProps> = ({ personaId, onComplete }) => {
  const [visible, setVisible] = useState(true);
  const type = getAnimationType(personaId);
  const persona = PERSONA_MAP[personaId];

  useEffect(() => {
    // Duration of the intro
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out
    }, 4500); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Determine text color based on background
  const isLightBg = ['sketch', 'print', 'medical', 'cartoon', 'fashion'].includes(type);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 overflow-hidden
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        ${isLightBg ? 'bg-[#f4f1ea]' : 'bg-black'}
      `}
      onClick={() => { setVisible(false); setTimeout(onComplete, 500); }} 
    >
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        
        {/* COSMOS (Newton/Einstein) */}
        {type === 'cosmos' && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0B1026] via-[#050608] to-black">
             <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}></div>
          </div>
        )}

        {/* MAGNETISM (Maxwell) */}
        {type === 'magnetism' && (
            <div className="absolute inset-0 bg-slate-950">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 49px, #3b82f6 50px)'
                }}></div>
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]"></div>
            </div>
        )}

        {/* RADIOACTIVITY (Curie) */}
        {type === 'radioactive' && (
            <div className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4ade8020] via-black to-black"></div>
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMmUyZTMzIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjNGFkZTgwIiAvPgo8L3N2Zz4=')]"></div>
            </div>
        )}

        {/* DESIGN (Jobs) */}
        {type === 'design' && (
            <div className="absolute inset-0 bg-[#3b207a]">
                <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px'}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#590058] via-transparent to-[#590058]"></div>
            </div>
        )}

        {/* FASHION (Chanel) */}
        {type === 'fashion' && (
             <div className="absolute inset-0 bg-white">
                <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#000_0,#000_1px,transparent_0,transparent_50%)] bg-[size:10px_10px]"></div>
             </div>
        )}

        {/* PSYCHO (Freud) */}
        {type === 'psycho' && (
             <div className="absolute inset-0 bg-[#1c1917]">
                 <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,#44403c_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                 <div className="absolute inset-0 backdrop-blur-[1px]"></div>
             </div>
        )}

        {/* CARTOON (Disney) */}
        {type === 'cartoon' && (
            <div className="absolute inset-0 bg-[#2b3544]">
                {/* Film Strip Holes */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-black flex flex-col justify-between py-2 z-10">
                     {Array.from({length: 20}).map((_, i) => <div key={i} className="w-8 h-6 mx-auto bg-white rounded-sm opacity-50"></div>)}
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-black flex flex-col justify-between py-2 z-10">
                     {Array.from({length: 20}).map((_, i) => <div key={i} className="w-8 h-6 mx-auto bg-white rounded-sm opacity-50"></div>)}
                </div>
            </div>
        )}

        {/* EVOLUTION (Darwin) */}
        {type === 'evolution' && (
            <div className="absolute inset-0 bg-[#0c0a09]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1c1917] to-[#0c0a09]"></div>
            </div>
        )}

        {/* INDUSTRIAL (Ford) */}
        {type === 'industrial' && (
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-black">
             <div className="absolute inset-0 opacity-10" 
                style={{ 
                    backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, #333 10px, #333 20px)' 
                }}>
             </div>
          </div>
        )}

        {/* ELECTRIC (Faraday) */}
        {type === 'electric' && (
           <div className="absolute inset-0 bg-zinc-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,0,0.1),transparent_70%)]"></div>
           </div>
        )}

        {/* PRINT (Gutenberg) */}
        {type === 'print' && (
          <div className="absolute inset-0 bg-[#e3dac9]">
             {/* Text Texture reduced opacity */}
             <div className="absolute inset-0 overflow-hidden opacity-[0.03] font-serif text-black leading-tight text-justify p-4 text-xs select-none">
                {Array.from({length: 400}).map((_, i) => "LOREM IPSUM DOLOR SIT AMET ").join("")}
             </div>
          </div>
        )}

        {/* GEOMETRY (Euclides) */}
        {type === 'geometry' && (
            <div className="absolute inset-0 bg-[#1a1a1a]">
                <div className="absolute inset-0 opacity-10"
                   style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>
            </div>
        )}
        
        {/* ASTRONOMY (Copernicus) & METHOD (Galileo) */}
        {(type === 'astronomy' || type === 'method') && (
            <div className="absolute inset-0 bg-black">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#1e3a8a_0%,_transparent_50%)]"></div>
            </div>
        )}

        {/* MEDICAL (Schweitzer) */}
        {type === 'medical' && (
            <div className="absolute inset-0 bg-white">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
        )}

        {/* JUSTICE (Parks) */}
        {type === 'justice' && (
            <div className="absolute inset-0 bg-slate-900">
                 <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>
        )}

        {/* TECH (Code) */}
        {type === 'tech' && <div className="absolute inset-0 bg-[#050505]"><div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div></div>}
        {type === 'bio' && <div className="absolute inset-0 bg-gradient-to-br from-[#05140a] to-black"></div>}
        {type === 'sketch' && <div className="absolute inset-0 bg-[#f4f1ea] opacity-100"><div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div></div>}
      </div>

      {/* --- ANIMATION LAYER --- */}
      <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none flex items-center justify-center">
        
        {/* COSMOS */}
        {type === 'cosmos' && (
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-[500px] h-[500px] border border-blue-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
                 <div className="absolute w-[800px] h-[200px] border border-white/20 rounded-[100%] animate-[atom-spin_10s_linear_infinite]" />
             </div>
        )}

        {/* METHOD (Galileo - Pendulums) */}
        {type === 'method' && (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-0 origin-top animate-[pendulum-swing_3s_ease-in-out_infinite] opacity-30">
                     <div className="w-0.5 h-64 bg-white"></div>
                     <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_20px_white]"></div>
                </div>
                <div className="absolute top-0 origin-top animate-[pendulum-swing_4s_ease-in-out_infinite] opacity-20" style={{animationDelay: '1s'}}>
                     <div className="w-0.5 h-96 bg-white"></div>
                     <div className="w-12 h-12 rounded-full bg-white"></div>
                </div>
            </div>
        )}

        {/* MAGNETISM (Maxwell) */}
        {type === 'magnetism' && (
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Magnetic Field Lines simulation */}
                <div className="absolute w-[600px] h-[300px] border-[2px] border-blue-500/30 rounded-[100%] animate-[magnetic-pulse_4s_infinite]"></div>
                <div className="absolute w-[500px] h-[250px] border-[2px] border-red-500/30 rounded-[100%] animate-[magnetic-pulse_4s_infinite]" style={{animationDelay: '0.5s'}}></div>
                <div className="w-64 h-20 bg-gradient-to-r from-red-600 to-blue-600 opacity-20 blur-xl rounded-full"></div>
            </div>
        )}

        {/* RADIOACTIVITY (Curie) */}
        {type === 'radioactive' && (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 bg-green-500/20 rounded-full blur-[50px] animate-pulse"></div>
                <div className="absolute border border-green-500/40 w-64 h-64 rounded-full animate-[spin_4s_linear_infinite]">
                    <div className="w-4 h-4 bg-green-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#4ade80]"></div>
                </div>
                <div className="absolute border border-green-500/40 w-64 h-64 rounded-full animate-[spin_4s_linear_infinite_reverse] rotate-90">
                    <div className="w-4 h-4 bg-green-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#4ade80]"></div>
                </div>
            </div>
        )}

        {/* DESIGN (Jobs) */}
        {type === 'design' && (
            <div className="relative w-full h-full flex items-center justify-center">
                <DevicePhoneMobileIcon className="w-64 h-64 text-black opacity-100 animate-pulse" />
                <div className="absolute w-72 h-96 border border-black/10 rounded-[3rem] animate-[intro-reveal_2s_ease-out]"></div>
            </div>
        )}

        {/* FASHION (Chanel) */}
        {type === 'fashion' && (
            <div className="absolute inset-0">
                <svg className="w-full h-full">
                    <path id="sewPath" d="M0,100 Q400,300 800,100 T1600,100" fill="none" stroke="black" strokeWidth="2" strokeDasharray="10 10" className="opacity-20" />
                    <circle r="4" fill="black">
                        <animateMotion dur="4s" repeatCount="indefinite">
                            <mpath href="#sewPath" />
                        </animateMotion>
                    </circle>
                </svg>
                {/* Needle Icon following roughly */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
                     <div className="w-px h-32 bg-black rotate-45"></div>
                </div>
            </div>
        )}

        {/* PSYCHO (Freud) */}
        {type === 'psycho' && (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-96 h-64 bg-black/40 blur-xl rounded-[50%] animate-[inkblot_8s_infinite_alternate]"></div>
                <div className="w-64 h-96 bg-black/40 blur-xl rounded-[50%] absolute animate-[inkblot_7s_infinite_alternate-reverse]"></div>
            </div>
        )}

        {/* CARTOON (Disney) */}
        {type === 'cartoon' && (
            <div className="relative w-full h-full flex items-center justify-center">
                 <div className="absolute animate-[bounce-ball_2s_infinite]">
                     <div className="w-16 h-16 bg-white rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5)]"></div>
                 </div>
                 <div className="absolute opacity-10 animate-[spin_10s_linear_infinite]">
                     <FilmIcon className="w-96 h-96 text-white" />
                 </div>
            </div>
        )}

        {/* EVOLUTION (Darwin) */}
        {type === 'evolution' && (
             <div className="relative w-full h-full flex items-center justify-center gap-8 opacity-30">
                 <div className="w-8 h-8 rounded-full bg-zinc-600 animate-[evolve-step_4s_infinite]"></div>
                 <div className="w-12 h-12 rounded-full bg-zinc-500 animate-[evolve-step_4s_infinite]" style={{animationDelay: '1s'}}></div>
                 <div className="w-16 h-16 rounded-full bg-zinc-400 animate-[evolve-step_4s_infinite]" style={{animationDelay: '2s'}}></div>
                 <div className="w-20 h-20 rounded-full bg-zinc-300 animate-[evolve-step_4s_infinite]" style={{animationDelay: '3s'}}></div>
             </div>
        )}

        {/* INDUSTRIAL (Ford) */}
        {type === 'industrial' && (
           <div className="relative w-full h-full flex items-center justify-center opacity-30">
               <svg viewBox="0 0 200 200" className="w-[600px] h-[600px] animate-[gear-spin_20s_linear_infinite]">
                  <path fill="#52525b" d="M100,0 L110,20 A80,80 0 0,1 130,25 L150,10 L160,25 L145,45 A80,80 0 0,1 160,60 L180,55 L185,75 L160,85 A80,80 0 0,1 165,100 L190,105 L185,125 L160,120 A80,80 0 0,1 150,140 L165,160 L150,175 L130,160 A80,80 0 0,1 110,170 L115,195 L95,200 L85,175 A80,80 0 0,1 65,170 L45,185 L30,170 L40,145 A80,80 0 0,1 25,130 L5,135 L0,115 L25,105 A80,80 0 0,1 20,85 L0,80 L5,60 L30,65 A80,80 0 0,1 40,45 L25,25 L40,10 L60,25 A80,80 0 0,1 80,15 L75,-10 L100,0 Z M100,60 A40,40 0 1,0 100,140 A40,40 0 1,0 100,60 Z" />
               </svg>
           </div>
        )}

        {/* PRINT (Gutenberg) */}
        {type === 'print' && (
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="text-[200px] font-serif font-bold text-black opacity-10 animate-[stamp-ink_1s_ease-out_forwards]">A</div>
            </div>
        )}

        {/* ELECTRIC (Faraday) */}
        {type === 'electric' && (
            <div className="relative w-full h-full">
                <svg className="absolute inset-0 w-full h-full opacity-60 filter drop-shadow-[0_0_10px_#ffff00]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M50,0 L40,40 L60,50 L30,100" fill="none" stroke="#fef08a" strokeWidth="0.5" className="animate-[spark-flash_0.2s_infinite]" />
                    <path d="M20,0 L30,30 L10,50 L40,80" fill="none" stroke="#fef08a" strokeWidth="0.3" className="animate-[spark-flash_0.3s_infinite]" style={{opacity: 0.5}} />
                </svg>
            </div>
        )}

        {/* JUSTICE (Rosa Parks) */}
        {type === 'justice' && (
             <div className="relative w-full h-full flex items-center justify-center">
                 {/* Broken Chains Symbolism */}
                 <div className="absolute top-1/3 flex gap-4 opacity-20">
                     <div className="w-20 h-8 border-4 border-zinc-400 rounded-full -rotate-12"></div>
                     <div className="w-20 h-8 border-4 border-zinc-400 rounded-full rotate-12 translate-y-4"></div>
                 </div>
                 
                 {/* Bus */}
                 <div className="absolute bottom-20 left-0 w-96 h-48 animate-[bus-drive_8s_linear_infinite]">
                     <div className="w-full h-full bg-zinc-800 rounded-xl relative overflow-hidden border border-zinc-600 shadow-2xl">
                         <div className="flex justify-between px-4 py-4">
                             <div className="w-16 h-12 bg-yellow-100/10 rounded"></div>
                             <div className="w-16 h-12 bg-yellow-100/10 rounded"></div>
                             <div className="w-16 h-12 bg-yellow-100/10 rounded"></div>
                         </div>
                     </div>
                     <div className="absolute -bottom-6 left-10 w-16 h-16 bg-black rounded-full border-4 border-zinc-700 animate-[gear-spin_2s_linear_infinite]"></div>
                     <div className="absolute -bottom-6 right-10 w-16 h-16 bg-black rounded-full border-4 border-zinc-700 animate-[gear-spin_2s_linear_infinite]"></div>
                 </div>
             </div>
        )}

        {/* GEOMETRY (Euclides) */}
        {type === 'geometry' && (
            <div className="relative w-full h-full flex items-center justify-center">
                 <svg viewBox="0 0 200 200" className="w-[400px] h-[400px] opacity-40">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="1" className="animate-[scribble_3s_ease-out_forwards]" strokeDasharray="600" />
                    <polygon points="100,20 170,160 30,160" fill="none" stroke="white" strokeWidth="1" className="animate-[scribble_4s_ease-out_forwards]" strokeDasharray="600" />
                 </svg>
            </div>
        )}

        {/* ASTRONOMY (Copernicus) */}
        {type === 'astronomy' && (
             <div className="relative w-full h-full flex items-center justify-center">
                 <div className="absolute w-12 h-12 bg-yellow-100 rounded-full shadow-[0_0_50px_yellow] z-20"></div>
                 <div className="absolute w-[350px] h-[350px] border border-white/10 rounded-full animate-[planets-rotate_15s_linear_infinite]">
                     <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-blue-400 rounded-full -translate-x-1/2 translate-y-1/2"></div>
                 </div>
             </div>
        )}

        {/* MEDICAL (Schweitzer) */}
        {type === 'medical' && (
             <div className="relative w-full h-full flex items-center justify-center opacity-30">
                 <div className="w-32 h-32 border-4 border-red-500 rounded-full flex items-center justify-center animate-[heartbeat_1.5s_infinite]">
                    <div className="w-16 h-4 bg-red-500 rounded"></div>
                    <div className="h-16 w-4 bg-red-500 rounded absolute"></div>
                 </div>
             </div>
        )}

        {/* TECH (Code/Lovelace/Gates) */}
        {type === 'tech' && (
             <div className="absolute inset-0 font-mono text-green-500/40 text-xs break-all leading-3">
                 {Array.from({ length: 80 }).map((_, i) => (
                    <div key={i} className="absolute top-0 text-center animate-[matrix-fall_2s_linear_infinite]" style={{left: `${Math.random()*100}%`, animationDelay: `${Math.random()*2}s`}}>
                        {Math.random() > 0.5 ? '1' : '0'}
                    </div>
                 ))}
             </div>
        )}

        {type === 'bio' && (
             <div className="absolute inset-0">
             {Array.from({ length: 15 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-24 h-24 border border-green-400/30 rounded-full animate-[float-dna_8s_ease-in-out_infinite]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    transform: `scale(${Math.random()})`
                  }}
                ></div>
             ))}
          </div>
        )}

      </div>

      {/* --- FOREGROUND CONTENT (ALWAYS CENTERED) --- */}
      <div className="relative z-20 text-center space-y-4 p-8 w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
         <div className="animate-[intro-reveal_1.5s_ease-out_forwards]">
            <span className={`text-sm tracking-[0.5em] uppercase font-bold
              ${isLightBg ? 'text-[#8b5a2b]' : 
                (type === 'tech' || type === 'radioactive') ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 
                (type === 'electric') ? 'text-yellow-200' :
                (type === 'magnetism') ? 'text-blue-400' :
                'text-zinc-400'}
            `}>
              Invocando Gênio
            </span>
         </div>
         
         <h1 className={`text-6xl md:text-8xl font-bold tracking-tighter mix-blend-screen animate-[intro-reveal_2s_ease-out_forwards]
            ${isLightBg ? 'font-serif text-[#2b261e]' : 'text-white'}
         `}>
           {persona.name}
         </h1>
         
         <div className={`h-px w-32 mx-auto animate-[circuit-draw_2s_ease-in-out_forwards]
             ${isLightBg ? 'bg-[#8b5a2b]' : 
               (type === 'electric') ? 'bg-yellow-200 shadow-[0_0_10px_yellow]' :
               (type === 'radioactive') ? 'bg-green-500 shadow-[0_0_10px_green]' :
               'bg-gradient-to-r from-transparent via-white/50 to-transparent'}
         `}></div>
         
         <p className={`text-xl md:text-2xl font-light max-w-2xl animate-[intro-reveal_2.5s_ease-out_forwards] italic
            ${isLightBg ? 'text-[#5c4d3c]' : 'text-zinc-300'}
         `}>
           "{persona.role}"
         </p>

         <p className={`text-xs mt-8 animate-pulse
            ${isLightBg ? 'text-[#8b5a2b]' : 'text-zinc-500'}
         `}>
           Carregando parâmetros de {persona.specialty}...
         </p>
      </div>
    </div>
  );
};
