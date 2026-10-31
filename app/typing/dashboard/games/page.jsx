'use client';

import { useState, useEffect } from 'react';
import { Gamepad2, Target, Trophy, Sparkles, Music, X, Palette, Flame, Zap, Shield, Heart } from 'lucide-react';

const RAIN_WORDS = ["matrix", "cyber", "laser", "rocket", "future", "speed", "binary", "system", "galaxy", "shield", "proton", "arcade", "engine", "quantum"];
const BURST_WORDS = ["lightning", "velocity", "quantum", "acceleration", "momentum", "frequency", "dynamics", "trajectory", "synchronize", "algorithm"];
const ZOMBIE_WORDS = ["stalker", "phantom", "wraith", "reaper", "mutant", "golem", "specter", "demon", "vortex", "titan"];
const KISS_WORDS = ["passion", "romance", "forever", "together", "sweetheart", "destiny", "magic", "beloved", "embrace", "affection"];

const YOUTUBE_TRACKS = [
  { name: '🎧 Lofi Hip Hop Radio - Beats to Study/Relax', embedId: 'jfKfPfyJRdk' },
  { name: '🎹 Peaceful Piano & Coffee Shop Beats', embedId: '5qap5aO4i9A' },
  { name: '🚀 Synthwave Radio - Chill Synth Beats', embedId: '4xDzrJKXOOY' }
];

export default function TypingGamesPage() {
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameItems, setGameItems] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [explosions, setExplosions] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [kissProgress, setKissProgress] = useState(0);
  const [kissPlayed, setKissPlayed] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [selectedYtTrack, setSelectedYtTrack] = useState(YOUTUBE_TRACKS[0].embedId);

  // Audio effect for Kiss
  const playKissSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5 note
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio autoplay blocked or unsupported');
    }
  };

  const startGame = (gameId) => {
    setActiveGame(gameId);
    setScore(0);
    setCombo(0);
    setUserInput('');
    setExplosions([]);
    setKissProgress(0);
    setKissPlayed(false);

    if (gameId === 'rain' || gameId === 'zombie') {
      setTimeLeft(60);
      setGameItems([
        { id: 1, word: gameId === 'rain' ? 'cyber' : 'stalker', x: 20, y: 10, speed: 0.3 },
        { id: 2, word: gameId === 'rain' ? 'laser' : 'wraith', x: 60, y: 20, speed: 0.3 }
      ]);
    } else if (gameId === 'burst') {
      setTimeLeft(45);
      spawnNextWord(BURST_WORDS);
    } else if (gameId === 'kiss') {
      setTimeLeft(60);
      spawnNextWord(KISS_WORDS);
    }
  };

  const spawnNextWord = (pool) => {
    const word = pool[Math.floor(Math.random() * pool.length)];
    setCurrentWord(word);
  };

  // Timer Countdown
  useEffect(() => {
    if (!activeGame || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeGame, timeLeft]);

  // Reliable Spawner for Cyber Rain & Zombie Defense
  useEffect(() => {
    if (!activeGame || timeLeft <= 0) return;
    if (activeGame === 'rain' || activeGame === 'zombie') {
      const interval = setInterval(() => {
        const pool = activeGame === 'rain' ? RAIN_WORDS : ZOMBIE_WORDS;
        const randomWord = pool[Math.floor(Math.random() * pool.length)];
        
        setGameItems((prev) => {
          if (prev.length >= 7) return prev;
          return [
            ...prev,
            {
              id: Date.now() + Math.random(),
              word: randomWord,
              x: Math.floor(Math.random() * 70) + 10,
              y: 0,
              speed: 0.35
            }
          ];
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [activeGame, timeLeft]);

  // Falling physics loop
  useEffect(() => {
    if (!activeGame || timeLeft <= 0) return;
    if (activeGame === 'rain' || activeGame === 'zombie') {
      const movement = setInterval(() => {
        setGameItems((prev) =>
          prev
            .map((item) => ({ ...item, y: item.y + item.speed }))
            .filter((item) => item.y < 85)
        );
      }, 50);
      return () => clearInterval(movement);
    }
  }, [activeGame, timeLeft]);

  // Input Handler
  const handleInputChange = (e) => {
    const val = e.target.value.trim().toLowerCase();
    setUserInput(val);

    if (activeGame === 'rain' || activeGame === 'zombie') {
      const matchedIndex = gameItems.findIndex((item) => item.word === val);
      if (matchedIndex !== -1) {
        const target = gameItems[matchedIndex];
        triggerBoom(target.x, target.y);
        setGameItems((prev) => prev.filter((_, idx) => idx !== matchedIndex));
        setScore((prev) => prev + 100 + combo * 10);
        setCombo((prev) => prev + 1);
        setUserInput('');
      }
    } else if (activeGame === 'burst') {
      if (val === currentWord) {
        triggerBoom(50, 45);
        setScore((prev) => prev + 150 + combo * 15);
        setCombo((prev) => prev + 1);
        setUserInput('');
        spawnNextWord(BURST_WORDS);
      }
    } else if (activeGame === 'kiss') {
      if (val === currentWord) {
        triggerBoom(50, 45);
        setScore((prev) => prev + 200 + combo * 20);
        setCombo((prev) => prev + 1);
        
        const newProgress = Math.min(100, kissProgress + 20);
        setKissProgress(newProgress);
        
        if (newProgress >= 100 && !kissPlayed) {
          playKissSound();
          setKissPlayed(true);
        }

        setUserInput('');
        spawnNextWord(KISS_WORDS);
      }
    }
  };

  const triggerBoom = (x, y) => {
    const boomId = Math.random();
    setExplosions((prev) => [...prev, { id: boomId, x, y }]);
    setTimeout(() => {
      setExplosions((prev) => prev.filter((item) => item.id !== boomId));
    }, 600);
  };

  return (
    <div className="space-y-8 font-sans pb-12 bg-white text-slate-900 animate-fade-in">
      {!activeGame ? (
        <div>
          <div className="mb-10 border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#134074] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
              <Gamepad2 className="w-4 h-4 text-[#134074]" />
              <span>Ultimate Arcade Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Pro Typing Games & Arcade Challenges 🎮🔥
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Four exciting typing games featuring fast action, speed bursts, zombie defense, and love romance challenges!
            </p>
          </div>

          {/* Arcade Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Game 1 */}
            <div className="group relative bg-gradient-to-br from-white via-slate-50 to-blue-50/20 border-2 border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-[#134074] hover:-translate-y-2.5 transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all pointer-events-none"></div>
              
              <div className="h-36 bg-gradient-to-br from-cyan-600 via-blue-700 to-[#0B2545] rounded-2xl flex flex-col items-center justify-center text-white relative shadow-inner overflow-hidden mb-5">
                <Zap className="w-10 h-10 mb-1 animate-bounce text-cyan-300" />
                <span className="text-[10px] font-mono font-bold uppercase bg-black/40 px-3 py-1 rounded-full border border-cyan-400/30 text-cyan-300">
                  Cyber Neon
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black text-[#134074] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Game 1 • Action
                </span>
                <h3 className="text-base font-black text-slate-900 group-hover:text-[#134074] transition mt-3 mb-1.5">
                  Cyber Word Rain
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6 font-medium">
                  Type falling tech words before they hit the ground and score combo points.
                </p>
              </div>

              <button
                onClick={() => startGame('rain')}
                className="w-full bg-slate-950 hover:bg-[#134074] text-white font-extrabold py-3 rounded-2xl transition-all text-xs uppercase tracking-wider shadow-md"
              >
                Play Cyber Rain 🚀
              </button>
            </div>

            {/* Game 2 */}
            <div className="group relative bg-gradient-to-br from-white via-slate-50 to-amber-50/20 border-2 border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-amber-500 hover:-translate-y-2.5 transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-amber-600/10 rounded-full blur-2xl group-hover:bg-amber-600/20 transition-all pointer-events-none"></div>

              <div className="h-36 bg-gradient-to-br from-amber-600 via-orange-700 to-red-900 rounded-2xl flex flex-col items-center justify-center text-white relative shadow-inner overflow-hidden mb-5">
                <Flame className="w-10 h-10 mb-1 animate-pulse text-amber-300" />
                <span className="text-[10px] font-mono font-bold uppercase bg-black/40 px-3 py-1 rounded-full border border-amber-400/30 text-amber-300">
                  Sunset Lava
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Game 2 • Speed
                </span>
                <h3 className="text-base font-black text-slate-900 group-hover:text-amber-600 transition mt-3 mb-1.5">
                  Lava Speed Burst
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6 font-medium">
                  Rapid-fire word typing arena designed to test peak reflexes and velocity.
                </p>
              </div>

              <button
                onClick={() => startGame('burst')}
                className="w-full bg-slate-950 hover:bg-amber-600 text-white font-extrabold py-3 rounded-2xl transition-all text-xs uppercase tracking-wider shadow-md"
              >
                Play Speed Burst ⚡
              </button>
            </div>

            {/* Game 3 */}
            <div className="group relative bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border-2 border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-emerald-500 hover:-translate-y-2.5 transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-emerald-600/10 rounded-full blur-2xl group-hover:bg-emerald-600/20 transition-all pointer-events-none"></div>

              <div className="h-36 bg-gradient-to-br from-emerald-700 via-teal-800 to-zinc-950 rounded-2xl flex flex-col items-center justify-center text-white relative shadow-inner overflow-hidden mb-5">
                <Shield className="w-10 h-10 mb-1 animate-bounce text-emerald-300" />
                <span className="text-[10px] font-mono font-bold uppercase bg-black/40 px-3 py-1 rounded-full border border-emerald-400/30 text-emerald-300">
                  Deep Forest
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Game 3 • Defense
                </span>
                <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition mt-3 mb-1.5">
                  Zombie Defense
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6 font-medium">
                  Eliminate incoming zombies by typing their names before they breach defense.
                </p>
              </div>

              <button
                onClick={() => startGame('zombie')}
                className="w-full bg-slate-950 hover:bg-emerald-600 text-white font-extrabold py-3 rounded-2xl transition-all text-xs uppercase tracking-wider shadow-md"
              >
                Play Zombie Defense 🛡️
              </button>
            </div>

            {/* Game 4 */}
            <div className="group relative bg-gradient-to-br from-white via-slate-50 to-pink-50/20 border-2 border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-pink-500 hover:-translate-y-2.5 transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden">
              <div className="absolute -right-16 -top-16 w-36 h-36 bg-pink-600/10 rounded-full blur-2xl group-hover:bg-pink-600/20 transition-all pointer-events-none"></div>

              <div className="h-36 bg-gradient-to-br from-pink-600 via-rose-600 to-purple-900 rounded-2xl flex flex-col items-center justify-center text-white relative shadow-inner overflow-hidden mb-5">
                <Heart className="w-10 h-10 mb-1 animate-pulse text-pink-300" />
                <span className="text-[10px] font-mono font-bold uppercase bg-black/40 px-3 py-1 rounded-full border border-pink-400/30 text-pink-300">
                  Romance Theme
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black text-pink-700 bg-pink-50 border border-pink-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Game 4 • Special
                </span>
                <h3 className="text-base font-black text-slate-900 group-hover:text-pink-600 transition mt-3 mb-1.5">
                  Love Kiss Challenge
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6 font-medium">
                  Type fast romance words to bring AI characters close and trigger celebration.
                </p>
              </div>

              <button
                onClick={() => startGame('kiss')}
                className="w-full bg-slate-950 hover:bg-pink-600 text-white font-extrabold py-3 rounded-2xl transition-all text-xs uppercase tracking-wider shadow-md"
              >
                Play Kiss Game 💖
              </button>
            </div>

          </div>
        </div>
      ) : (
        <div className={`fixed inset-0 z-50 text-white flex flex-col justify-between p-6 md:p-10 overflow-hidden font-sans ${
          activeGame === 'rain' ? 'bg-[#0B2545]' : activeGame === 'burst' ? 'bg-neutral-950' : activeGame === 'zombie' ? 'bg-zinc-950' : 'bg-rose-950/95'
        }`}>
          
          {/* Top Header */}
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-4 gap-4">
            <div className="flex items-center gap-6 font-mono">
              <div>
                <span className="block text-[10px] text-slate-400">ACTIVE MODE</span>
                <span className="text-sm font-black uppercase tracking-wider text-pink-300">
                  {activeGame === 'rain' ? '🌧️ Cyber Rain' : activeGame === 'burst' ? '🔥 Lava Burst' : activeGame === 'zombie' ? '🧟‍♂️ Zombie Defense' : '💖 Love Kiss Challenge'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">SCORE</span>
                <span className="text-xl font-black text-amber-400">{score}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">COMBO</span>
                <span className="text-xl font-black text-pink-400">x{combo}</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400">TIME</span>
                <span className="text-xl font-black text-rose-400">{timeLeft}s</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMusicPlayer(!showMusicPlayer)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition shadow-md border ${
                  showMusicPlayer 
                    ? 'bg-rose-600/20 text-rose-300 border-rose-500/40 animate-pulse' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500/50'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>{showMusicPlayer ? 'Hide YouTube Player' : '🎵 Live YouTube Music'}</span>
              </button>

              <button
                onClick={() => { setActiveGame(null); setShowMusicPlayer(false); }}
                className="bg-black/40 hover:bg-black/60 text-white text-xs font-bold px-5 py-2.5 rounded-xl border border-white/20 transition shadow-lg backdrop-blur-md flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Game</span>
              </button>
            </div>
          </div>

          {/* YouTube Music Player Drawer */}
          {showMusicPlayer && (
            <div className="w-full max-w-5xl mx-auto bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 my-2 animate-fade-in backdrop-blur-md z-40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center text-lg shadow-md animate-bounce">
                  ▶
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Direct YouTube Study Radio</h4>
                  <p className="text-[10px] text-slate-400">Stream non-stop gaming & concentration beats.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={selectedYtTrack}
                  onChange={(e) => setSelectedYtTrack(e.target.value)}
                  className="bg-slate-950 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none flex-1 md:w-72"
                >
                  {YOUTUBE_TRACKS.map((track, idx) => (
                    <option key={idx} value={track.embedId}>{track.name}</option>
                  ))}
                </select>

                <div className="overflow-hidden rounded-xl border border-slate-800 shadow-inner">
                  <iframe 
                    width="180" 
                    height="40" 
                    src={`https://www.youtube-nocookie.com/embed/${selectedYtTrack}?autoplay=1&loop=1`} 
                    title="YouTube Live Music" 
                    className="border-0"
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          <div className={`relative w-full max-w-6xl mx-auto h-[58vh] rounded-3xl my-auto overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col justify-between p-6 border ${
            activeGame === 'rain' ? 'bg-[#134074]/80 border-blue-400/40' : activeGame === 'burst' ? 'bg-neutral-950/90 border-amber-500/40' : activeGame === 'zombie' ? 'bg-zinc-950/90 border-emerald-500/40' : 'bg-rose-950/80 border-pink-500/50'
          }`}>
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

            {activeGame === 'kiss' && (
              <div className="w-full flex flex-col items-center justify-center my-auto relative z-10">
                <div className="flex items-center justify-between w-full max-w-xl px-4 mb-6 relative">
                  <div 
                    className="transition-all duration-300 filter drop-shadow-2xl"
                    style={{ transform: `translateX(${(kissProgress / 100) * 140}px)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                      alt="Boy" 
                      className="w-16 h-16 rounded-full border-4 border-blue-400 object-cover shadow-lg"
                    />
                  </div>

                  {kissProgress >= 100 ? (
                    <div className="absolute left-1/2 -translate-x-1/2 text-3xl font-black animate-bounce z-30 bg-pink-900/90 px-6 py-2 rounded-full border border-pink-400 shadow-2xl">
                      👩‍❤️‍💋‍👨 Perfect Love Match! 💖
                    </div>
                  ) : (
                    <div className="text-xs font-mono text-pink-300 bg-black/50 px-3 py-1 rounded-full border border-pink-500/40">
                      Match Progress: {kissProgress}%
                    </div>
                  )}

                  <div 
                    className="transition-all duration-300 filter drop-shadow-2xl"
                    style={{ transform: `translateX(-${(kissProgress / 100) * 140}px)` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80" 
                      alt="Girl" 
                      className="w-16 h-16 rounded-full border-4 border-pink-400 object-cover shadow-lg"
                    />
                  </div>
                </div>

                <span className="block text-xs font-mono text-pink-300 mb-2 uppercase tracking-widest">💖 Type this romantic word:</span>
                <div className="text-4xl md:text-6xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 tracking-wider drop-shadow-[0_0_35px_rgba(244,63,94,0.7)] animate-pulse">
                  {currentWord}
                </div>
              </div>
            )}

            {(activeGame === 'rain' || activeGame === 'zombie') && gameItems.map((item) => (
              <div
                key={item.id}
                className={`absolute font-mono font-extrabold text-lg md:text-xl px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 backdrop-blur-md border ${
                  activeGame === 'rain'
                    ? 'bg-blue-950/90 text-cyan-300 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'bg-emerald-950/90 text-emerald-300 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                }`}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                <span>{activeGame === 'zombie' ? '🧟‍♂️' : '⚡'}</span>
                <span>{item.word}</span>
              </div>
            ))}

            {activeGame === 'burst' && (
              <div className="m-auto text-center relative z-10">
                <span className="block text-xs font-mono text-amber-300/80 mb-3 uppercase tracking-widest">⚡ Smash this word:</span>
                <div className="text-4xl md:text-6xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 tracking-wider drop-shadow-[0_0_35px_rgba(245,158,11,0.6)] animate-bounce">
                  {currentWord}
                </div>
              </div>
            )}

            {explosions.map((exp) => (
              <div
                key={exp.id}
                className="absolute text-3xl font-black text-amber-300 animate-ping z-30 filter drop-shadow-[0_0_25px_rgba(251,191,36,0.9)]"
                style={{ left: `${exp.x}%`, top: `${exp.y}%` }}
              >
                BOOM!💥
              </div>
            ))}

            <div className="mt-auto relative z-20 w-full max-w-2xl mx-auto">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                autoFocus
                placeholder="Type here to play..."
                className="w-full bg-black/80 border-2 border-white/30 text-white font-mono text-center text-xl py-4 rounded-2xl focus:outline-none focus:ring-4 shadow-2xl tracking-wider"
              />
            </div>

          </div>

          <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-xs text-slate-400 font-mono border-t border-white/10 pt-3">
            <span>Pro Arcade Engine Active</span>
            <span className="text-pink-300 font-bold">GD Typing Arcade Pro Suite</span>
          </div>

        </div>
      )}
    </div>
  );
}