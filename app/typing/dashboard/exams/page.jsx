'use client';

import { useState } from 'react';
import { Target, Clock, Award, FileText, ArrowRight, Sparkles, Music, X, Palette, Play } from 'lucide-react';

const GOVT_EXAM_MODULES = [
  {
    id: 'ssc-exam',
    title: 'SSC CGL & CHSL Typing Test',
    duration: '15 Mins',
    target: '~2000 Key Depressions',
    badge: 'Most Popular',
    color: 'bg-blue-50 text-[#134074] border-blue-200',
    desc: 'Official Staff Selection Commission pattern focusing on administrative policy and public governance drafts.',
    paragraphs: [
      "The Union Public Service Commission and Staff Selection Commission conduct competitive examinations annually to recruit qualified personnel for various administrative, financial, and clerical cadre posts across Union Ministries and subordinate departments. Candidates are evaluated on their speed, accuracy, and adherence to formal formatting standards during the official skill test.",
      "Effective public administration requires seamless coordination between central secretariats and district offices. Digital record management systems have revolutionized file processing, reducing administrative delays and ensuring transparency in policy implementation. Modern civil servants must possess proficient typing agility to process digital documentation efficiently.",
      "Budgetary allocations for public welfare infrastructure projects are meticulously reviewed by parliamentary committees before final approval. Sustainable economic development depends heavily on timely execution of national highway projects, rural electrification schemes, and public health initiatives designed to empower local communities across the country."
    ]
  },
  {
    id: 'high-court-exam',
    title: 'High Court Steno & LDC Typing Exam',
    duration: '10 Mins',
    target: 'Legal Draft Standard',
    badge: 'High Court Standard',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    desc: 'Judicial legal vocabulary, court order formatting, and formal legal petition typing practice.',
    paragraphs: [
      "The appellant submitted an appeal before the honorable high court challenging the order passed by the lower judicial magistrate regarding statutory compliance and procedural review. The constitutional bench directed all parties to maintain status quo while evaluating the constitutional validity of the impugned administrative directions.",
      "Pursuant to clause three of section forty-five, the constitutional bench directed the petitioner to submit verified documentary evidence within the stipulated timeframe without delay. Non-compliance with court orders may result in summary dismissal of the petition along with punitive costs imposed on defaulting litigants.",
      "The judicial committee observed that statutory rules must be strictly adhered to by all parties involved to prevent any miscarriage of justice in civil and criminal proceedings. Proper documentation, timely testimony, and accurate transcript record maintenance remain vital pillars of transparent legal proceedings."
    ]
  },
  {
    id: 'railway-exam',
    title: 'Railway NTPC Skill Test',
    duration: '10 Mins',
    target: 'Technical & Logistics',
    badge: 'RRB Pattern',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    desc: 'Railway recruitment board skill test pattern featuring logistics, transport, and operational passages.',
    paragraphs: [
      "Indian Railways operates one of the largest rail networks in the world, connecting millions of passengers daily across urban and rural sectors efficiently and safely. Freight transportation generates significant revenue necessary for modernizing station amenities and expanding high-speed rail corridors.",
      "Computerized reservation systems and automated signaling equipment have significantly improved railway operational efficiency, punctuality, and passenger safety standards. Upgraded track maintenance protocols reduce technical breakdowns during peak travel seasons across busy trunk routes.",
      "Freight transport remains a key revenue generator for railway logistics, enabling seamless nationwide movement of industrial raw materials and commercial goods. Dedicated freight corridors accelerate bulk cargo delivery while easing passenger train congestion on arterial lines."
    ]
  },
  {
    id: 'state-patwari-exam',
    title: 'State Exam / Patwari & LDC Test',
    duration: '10 Mins',
    target: 'General Administration',
    badge: 'State Level',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    desc: 'State secretariat, RSMSSB Patwari, and revenue department administrative typing practice.',
    paragraphs: [
      "State revenue administration involves maintaining land records, managing municipal logistics, and executing rural development schemes at the grassroots level. Systematic digitisation of land titles protects farmers from ownership disputes and speeds up agricultural loan approvals.",
      "District administration coordinates with local panchayats to implement agricultural welfare programs, disaster management protocols, and health camp initiatives. Efficient public communication officers ensure governmental schemes reach remote rural populations smoothly.",
      "Transparency in land mutation records and digital grievance redressal portals empower rural citizens by ensuring swift resolution of administrative disputes. E-governance portals eliminate bureaucratic bottlenecks and promote trust in district administration."
    ]
  }
];

const ARENA_THEMES = {
  midnight: { name: 'GD Corporate Navy', bg: 'bg-[#0B2545]', border: 'border-blue-900/60', box: 'bg-[#134074]/90', text: 'text-blue-300', accent: 'focus:ring-blue-400' },
  cyberpunk: { name: 'Cyber Neon', bg: 'bg-zinc-950', border: 'border-purple-800/60', box: 'bg-purple-950/40', text: 'text-fuchsia-400', accent: 'focus:ring-fuchsia-500' },
  emerald: { name: 'Emerald Forest', bg: 'bg-stone-950', border: 'border-emerald-800/60', box: 'bg-emerald-950/40', text: 'text-emerald-400', accent: 'focus:ring-emerald-500' },
  coffee: { name: 'Warm Mocha', bg: 'bg-neutral-950', border: 'border-amber-900/50', box: 'bg-amber-950/30', text: 'text-amber-400', accent: 'focus:ring-amber-500' },
  slate: { name: 'Slate Gray', bg: 'bg-gray-950', border: 'border-gray-800', box: 'bg-gray-900/90', text: 'text-cyan-400', accent: 'focus:ring-cyan-500' }
};

const YOUTUBE_TRACKS = [
  { name: '🎧 Lofi Hip Hop Radio - Beats to Study/Relax', embedId: 'jfKfPfyJRdk' },
  { name: '🎹 Peaceful Piano & Coffee Shop Beats', embedId: '5qap5aO4i9A' },
  { name: '🚀 Synthwave Radio - Chill Synth Beats', embedId: '4xDzrJKXOOY' }
];

export default function GovtExamsPage() {
  const [activeTest, setActiveTest] = useState(null);
  const [currentParaIdx, setCurrentParaIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [selectedYtTrack, setSelectedYtTrack] = useState(YOUTUBE_TRACKS[0].embedId);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('midnight');

  const activeThemeObj = ARENA_THEMES[currentTheme];

  const startTest = (test) => {
    setActiveTest(test);
    setCurrentParaIdx(0);
    setUserInput('');
    setStartTime(Date.now());
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setUserInput(val);

    if (!startTime) setStartTime(Date.now());
    if (!activeTest || !activeTest.paragraphs[currentParaIdx]) return;

    const targetText = activeTest.paragraphs[currentParaIdx];
    
    const timeElapsed = (Date.now() - startTime) / 60000;
    const wordsTyped = val.trim().split(/\s+/).length;
    const currentWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    setWpm(currentWpm > 0 ? currentWpm : 0);

    let correctChars = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) correctChars++;
    }
    const currentAcc = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setAccuracy(currentAcc);

    if (val.trim() === targetText.trim() || val.length >= targetText.length) {
      if (currentParaIdx < activeTest.paragraphs.length - 1) {
        setTimeout(() => {
          setCurrentParaIdx(prev => prev + 1);
          setUserInput('');
          setStartTime(Date.now());
        }, 300);
      } else {
        setIsCompleted(true);
      }
    }
  };

  const currentTarget = activeTest && activeTest.paragraphs ? activeTest.paragraphs[currentParaIdx] : '';
  const progressPercent = currentTarget && currentTarget.length > 0 
    ? Math.min(100, Math.round((userInput.length / currentTarget.length) * 100)) 
    : 0;

  const renderTypedText = () => {
    if (!activeTest || !activeTest.paragraphs || !activeTest.paragraphs[currentParaIdx]) return null;
    const text = activeTest.paragraphs[currentParaIdx];
    return text.split('').map((char, index) => {
      let color = "text-slate-400/80";
      if (index < userInput.length) {
        if (userInput[index] === char) {
          color = "text-emerald-400 font-bold bg-emerald-950/50 shadow-xs";
        } else {
          color = "text-rose-400 font-bold bg-rose-950/50 underline decoration-rose-500";
        }
      } else if (index === userInput.length) {
        color = "text-white underline decoration-blue-400 font-bold animate-pulse bg-blue-500/20 px-0.5 rounded";
      }
      return (
        <span key={index} className={`${color} transition-all duration-75 font-mono text-xl md:text-2xl`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-8 font-sans pb-12 bg-white text-slate-900 animate-fade-in">
      {!activeTest ? (
        <div>
          {/* Header */}
          <div className="mb-10 border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#134074] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
              <Target className="w-4 h-4 animate-spin" />
              <span>Official Government Exam Modules</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Govt Exams Typing Practice Hub 🎯
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              SSC, High Court, Railway NTPC, and State exams official long-grade practice passages.
            </p>
          </div>

          {/* Eye-Catching Animated Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GOVT_EXAM_MODULES.map((module) => (
              <div
                key={module.id}
                onClick={() => startTest(module)}
                className="group relative bg-gradient-to-br from-white via-slate-50 to-blue-50/30 border-2 border-slate-200/90 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:border-[#134074] hover:-translate-y-2.5 transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -right-20 -top-20 w-48 h-48 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B2545] via-blue-600 to-[#134074] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  <div className="flex justify-between items-center mb-5 relative z-10">
                    <span className={`text-[11px] font-black border px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs ${module.color}`}>
                      {module.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-xs group-hover:border-blue-300 transition-colors">
                      <Clock className="w-3.5 h-3.5 text-[#134074]" />
                      {module.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-[#134074] transition-colors mb-2 relative z-10">
                    {module.title}
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed mb-6 relative z-10">
                    {module.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-200/80 flex items-center justify-between text-xs font-extrabold relative z-10">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileText className="w-4 h-4 text-[#134074]" />
                    <span>Target: <strong className="text-slate-900">{module.target}</strong></span>
                  </div>
                  
                  <span className="inline-flex items-center gap-2 bg-slate-950 group-hover:bg-[#134074] text-white px-5 py-2.5 rounded-xl transition-all shadow-md group-hover:scale-105 text-xs uppercase tracking-wider">
                    <span>Start Test</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={`fixed inset-0 z-50 ${activeThemeObj.bg} text-white flex flex-col justify-between p-6 md:p-12 overflow-y-auto transition-colors duration-500 font-sans`}>
          
          {/* Top Header */}
          <div className={`w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center border-b ${activeThemeObj.border} pb-4 gap-4`}>
            <div className="flex items-center gap-3">
              <img src="/gd-logo.png" alt="GD Logo" className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 shadow-md" />
              <div>
                <span className={`text-xs font-mono uppercase tracking-widest ${activeThemeObj.text} block`}>
                  {activeTest.title} • Para {currentParaIdx + 1} of 3
                </span>
                <h2 className="text-lg md:text-xl font-black text-white">Live Exam Simulation Environment</h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-xs font-bold text-slate-300 shadow-inner">
                <Palette className="w-3.5 h-3.5 text-blue-400" />
                <select
                  value={currentTheme}
                  onChange={(e) => setCurrentTheme(e.target.value)}
                  className="bg-transparent text-slate-200 text-xs font-bold focus:outline-none cursor-pointer"
                >
                  {Object.keys(ARENA_THEMES).map((key) => (
                    <option key={key} value={key} className="bg-slate-900 text-white">
                      {ARENA_THEMES[key].name}
                    </option>
                  ))}
                </select>
              </div>

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
                onClick={() => { setActiveTest(null); setShowMusicPlayer(false); }}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl border border-slate-800 transition flex items-center gap-1.5 shadow"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Exam</span>
              </button>
            </div>
          </div>

          {/* Direct YouTube Music Player Drawer */}
          {showMusicPlayer && (
            <div className={`w-full max-w-5xl mx-auto bg-slate-900 border ${activeThemeObj.border} p-5 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 my-3 animate-fade-in backdrop-blur-md`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center text-lg shadow-md animate-bounce">
                  ▶
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Direct YouTube Study Radio</h4>
                  <p className="text-[10px] text-slate-400">Stream non-stop copyright-free study & focus beats.</p>
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

          {/* WIDER MAIN CONTAINER WITH SMOOTH ANIMATIONS */}
          <div className="w-full max-w-6xl mx-auto my-auto py-6">
            {!isCompleted ? (
              <div className={`${activeThemeObj.box} border ${activeThemeObj.border} p-8 md:p-10 rounded-3xl mb-6 shadow-2xl backdrop-blur-md transition-all duration-300`}>
                
                <div className="flex justify-between items-center mb-6 bg-slate-950/80 px-6 py-4 rounded-2xl border border-slate-800/80 font-mono shadow-inner">
                  <div className="text-sm text-slate-300">
                    Speed: <span className={`${activeThemeObj.text} font-black text-lg`}>{wpm} WPM</span>
                  </div>
                  <div className="text-sm text-slate-300">
                    Accuracy: <span className="text-emerald-400 font-black text-lg">{accuracy}%</span>
                  </div>
                  <div className="text-sm text-slate-300">
                    Progress: <span className="text-purple-400 font-black text-lg">Para {currentParaIdx + 1}/3 ({progressPercent}%)</span>
                  </div>
                </div>

                {/* SMOOTH BOY & GIRL ANIMATION PROGRESS BAR */}
                <div className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-4 mb-6 relative overflow-hidden shadow-inner">
                  <div className="flex justify-between items-center relative z-10 px-4 min-h-[40px]">
                    <div 
                      className="text-3xl transition-all duration-500 ease-out transform filter drop-shadow-md"
                      style={{ transform: `translateX(${(progressPercent / 100) * 42}vw)` }}
                    >
                      🧑‍💻
                    </div>

                    {progressPercent >= 98 && (
                      <div className="text-3xl animate-bounce absolute left-1/2 -translate-x-1/2">
                        💖👩‍❤️‍💋‍👨💖
                      </div>
                    )}

                    <div 
                      className="text-3xl transition-all duration-500 ease-out transform filter drop-shadow-md"
                      style={{ transform: `translateX(-${(progressPercent / 100) * 42}vw)` }}
                    >
                      👩‍💻
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 h-2.5 rounded-full mt-2 overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full transition-all duration-500 ease-out shadow-lg"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Passage Container with Smooth Highlighting */}
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800/80 mb-6 leading-relaxed select-none max-h-56 overflow-y-auto shadow-inner">
                  {renderTypedText()}
                </div>

                {/* Wider Textarea */}
                <textarea
                  value={userInput}
                  onChange={handleInputChange}
                  autoFocus
                  placeholder="Type the administrative passage above smoothly..."
                  className={`w-full h-44 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-lg font-mono text-white focus:outline-none focus:ring-2 ${activeThemeObj.accent} resize-none shadow-inner transition-all`}
                  rows={4}
                />
              </div>
            ) : (
              <div className={`bg-slate-900 border ${activeThemeObj.border} p-10 rounded-3xl text-center shadow-2xl animate-fade-in`}>
                <div className="text-6xl mb-4 animate-bounce">💖👩‍❤️‍💋‍👨💖</div>
                <h3 className="text-3xl font-black text-white mb-2">Exam Passage Completed Successfully!</h3>
                <p className="text-slate-400 text-base mb-8">You have successfully completed the official exam passage.</p>
                
                <div className="flex justify-center gap-8 mb-8 font-mono">
                  <div className="bg-slate-950 px-8 py-4 rounded-2xl border border-slate-800 shadow-inner">
                    <span className="block text-xs text-slate-500 mb-1">FINAL SPEED</span>
                    <span className={`${activeThemeObj.text} font-black text-2xl`}>{wpm} WPM</span>
                  </div>
                  <div className="bg-slate-950 px-8 py-4 rounded-2xl border border-slate-800 shadow-inner">
                    <span className="block text-xs text-slate-500 mb-1">ACCURACY</span>
                    <span className="text-emerald-400 font-black text-2xl">{accuracy}%</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTest(null)}
                  className="bg-white text-[#0B2545] hover:bg-blue-50 font-extrabold px-10 py-4 rounded-2xl transition-all shadow-xl text-base transform hover:-translate-y-0.5"
                >
                  Back to Exam Menu →
                </button>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-slate-400 font-mono px-2">
              <span>Official Government Exam Simulation Engine</span>
              <span className={`${activeThemeObj.text} font-bold`}>GD Typing Pro Suite</span>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto text-center pt-3 border-t border-blue-900/40 text-xs text-slate-400 flex justify-between items-center px-4 font-mono">
            <span>© GD PDF Suite & Typing Master</span>
            <span>Secure SSL Encrypted Session</span>
          </div>

        </div>
      )}
    </div>
  );
}