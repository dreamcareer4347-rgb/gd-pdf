'use client';

import { useState, useEffect, useRef } from 'react';
import { Award, Timer, CheckCircle2, XCircle, Printer, RotateCcw, ArrowRight, ShieldCheck, Sparkles, Zap, RefreshCw } from 'lucide-react';

const PASSAGE_POOLS = {
  bronze: [
    "The quick brown fox jumps over the lazy dog. Typing daily builds great finger confidence and helps beginners master the keyboard step by step.",
    "Practice makes a person perfect in touch typing. Small daily efforts create huge achievements in accuracy and computer skills.",
    "A clean mind and consistent finger movement are essential for speed. Learn every key position without looking down at the keyboard.",
    "Speed comes naturally when accuracy is maintained. Concentrate on typing correct characters first and speed will follow automatically."
  ],
  silver: [
    "Practice makes a person perfect in touch typing. Consistency is the secret key to building accurate typing habits for government computer examinations.",
    "Professional computer operators maintain high speed with error-free keystrokes. Developing rhythm in finger movement is crucial for long tests.",
    "Government recruitment examinations test both speed and accuracy under time pressure. Maintaining calmness leads to higher qualification scores.",
    "Modern digital workplaces require swift communication skills. Touch typing empowers candidates to complete administrative documentation efficiently."
  ],
  gold: [
    "Government examination benchmarks demand immaculate precision, advanced dexterity, and swift keystroke execution under strict timed environments for competitive administrative roles.",
    "Excellence in high-speed touch typing requires relentless discipline, precise finger muscle memory, and flawless focus throughout the entire test duration.",
    "Mastering complex vocabulary and continuous text streams ensures superior competitive performance across state high court and central government examinations.",
    "Systematic keyboard mastery enables candidates to achieve exceptional words-per-minute thresholds while sustaining near-perfect accuracy under tight deadlines."
  ]
};

const TEST_LEVELS = {
  bronze: {
    id: 'bronze',
    title: 'Bronze Level Qualification',
    badge: '🥉 Bronze Tier',
    targetWpm: 25,
    minAccuracy: 85,
    timeLimit: 60,
    borderTheme: 'border-amber-500/60',
    cardBg: 'from-amber-950/30 via-slate-900 to-slate-950',
    accentColor: 'text-amber-400',
  },
  silver: {
    id: 'silver',
    title: 'Silver Level Qualification',
    badge: '🥈 Silver Tier',
    targetWpm: 40,
    minAccuracy: 90,
    timeLimit: 90,
    borderTheme: 'border-blue-500/60',
    cardBg: 'from-blue-950/30 via-slate-900 to-slate-950',
    accentColor: 'text-blue-400',
  },
  gold: {
    id: 'gold',
    title: 'Gold Elite Master Qualification',
    badge: '🥇 Gold Elite Master',
    targetWpm: 60,
    minAccuracy: 98,
    timeLimit: 120,
    borderTheme: 'border-yellow-500/60',
    cardBg: 'from-yellow-950/30 via-slate-900 to-slate-950',
    accentColor: 'text-yellow-400',
  }
};

export default function CertificatesTestPage() {
  const [selectedLevel, setSelectedLevel] = useState('bronze');
  const [testState, setTestState] = useState('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [currentPassage, setCurrentPassage] = useState('');
  const [calculatedWpm, setCalculatedWpm] = useState(0);
  const [calculatedAccuracy, setCalculatedAccuracy] = useState(0);
  const [isPassed, setIsPassed] = useState(false);
  const [candidateName, setCandidateName] = useState('Golu Saini');

  const activeTest = TEST_LEVELS[selectedLevel];
  const inputRef = useRef(null);

  const startTest = (levelId) => {
    setSelectedLevel(levelId);
    const pool = PASSAGE_POOLS[levelId];
    const randomPassage = pool[Math.floor(Math.random() * pool.length)];
    setCurrentPassage(randomPassage);

    setTestState('testing');
    setTimeLeft(TEST_LEVELS[levelId].timeLimit);
    setUserInput('');
    setIsTimerRunning(false);
    setIsPassed(false);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0 || testState !== 'testing') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, testState]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setUserInput(val);

    if (!isTimerRunning && val.length > 0) {
      setIsTimerRunning(true);
    }

    // Auto-submit when user finishes typing the full passage length or exact match
    if (currentPassage && (val.length >= currentPassage.length || val.trim() === currentPassage.trim())) {
      finishTest(val);
    }
  };

  const finishTest = (finalVal = userInput) => {
    setTestState('result');
    const wordsTyped = finalVal.trim().split(/\s+/).filter(Boolean).length;
    const timeSpentMinutes = (activeTest.timeLimit - timeLeft) / 60 || 1;
    const wpm = Math.round(wordsTyped / timeSpentMinutes);

    let correctChars = 0;
    for (let i = 0; i < finalVal.length; i++) {
      if (finalVal[i] === currentPassage[i]) {
        correctChars++;
      }
    }
    const accuracy = finalVal.length > 0 ? Math.round((correctChars / finalVal.length) * 100) : 0;

    setCalculatedWpm(wpm);
    setCalculatedAccuracy(accuracy);

    if (wpm >= activeTest.targetWpm && accuracy >= activeTest.minAccuracy) {
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderAnimatedPassage = () => {
    return currentPassage.split('').map((char, index) => {
      let charStyle = "text-slate-400 opacity-60";
      if (index < userInput.length) {
        if (userInput[index] === char) {
          charStyle = "text-emerald-400 font-bold bg-emerald-950/40 px-0.5 rounded transition-all duration-150 animate-pulse";
        } else {
          charStyle = "text-rose-400 font-bold bg-rose-950/60 underline decoration-rose-500 px-0.5 rounded transition-all duration-150";
        }
      } else if (index === userInput.length) {
        charStyle = "text-white font-black bg-blue-500/30 underline decoration-blue-400 animate-bounce px-1 rounded shadow-[0_0_15px_rgba(59,130,246,0.9)]";
      }
      return (
        <span key={index} className={`${charStyle} font-mono transition-all duration-75`}>
          {char}
        </span>
      );
    });
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-certificate, #printable-certificate * {
            visibility: visible;
          }
          #printable-certificate {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            background: #0B2545 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <div className="space-y-10 font-sans pb-16 bg-white text-slate-900 animate-fade-in">
        
        <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#134074] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#134074]" />
              <span>GD Typing Verified Accreditation Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Certificate Qualification Hub 🎓
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Timer starts automatically on the first keystroke and auto-submits upon completion!
            </p>
          </div>
        </div>

        {testState === 'idle' && (
          <div className="space-y-12 animate-fade-in">
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 animate-spin" /> 
                <span>Select Skill Level to Attempt Test</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative bg-gradient-to-br from-white via-slate-50 to-amber-50/20 border-2 border-slate-200 hover:border-amber-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[11px] font-black text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full uppercase">
                        🥉 Level 1 • Beginner
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-600">⏱️ 1 Min</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-amber-600 transition">Bronze Qualification</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-6">
                      Target: <strong className="text-slate-900">25 WPM</strong> speed & <strong className="text-slate-900">85%</strong> accuracy.
                    </p>
                  </div>
                  <button
                    onClick={() => startTest('bronze')}
                    className="w-full bg-[#0B2545] hover:bg-amber-600 text-white font-extrabold py-3.5 rounded-2xl transition-all duration-300 shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                  >
                    <span>Start Bronze Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="group relative bg-gradient-to-br from-white via-slate-50 to-blue-50/20 border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[11px] font-black text-blue-800 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full uppercase">
                        🥈 Level 2 • Standard
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-600">⏱️ 1.5 Mins</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-blue-600 transition">Silver Qualification</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-6">
                      Target: <strong className="text-slate-900">40 WPM</strong> speed & <strong className="text-slate-900">90%</strong> accuracy.
                    </p>
                  </div>
                  <button
                    onClick={() => startTest('silver')}
                    className="w-full bg-[#0B2545] hover:bg-blue-600 text-white font-extrabold py-3.5 rounded-2xl transition-all duration-300 shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                  >
                    <span>Start Silver Test</span>
                    <Zap className="w-4 h-4" />
                  </button>
                </div>

                <div className="group relative bg-gradient-to-br from-white via-slate-50 to-yellow-50/20 border-2 border-slate-200 hover:border-yellow-500 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[11px] font-black text-yellow-900 bg-yellow-100 border border-yellow-200 px-3 py-1 rounded-full uppercase">
                        🥇 Level 3 • Elite Pro
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-600">⏱️ 2 Mins</span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-yellow-600 transition">Gold Elite Master</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-6">
                      Target: <strong className="text-slate-900">60 WPM</strong> speed & <strong className="text-slate-900">98%</strong> accuracy.
                    </p>
                  </div>
                  <button
                    onClick={() => startTest('gold')}
                    className="w-full bg-[#0B2545] hover:bg-yellow-500 hover:text-slate-950 text-white font-extrabold py-3.5 rounded-2xl transition-all duration-300 shadow-md text-xs uppercase tracking-wider flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                  >
                    <span>Start Gold Test</span>
                    <Award className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {testState === 'testing' && (
          <div className="fixed inset-0 z-50 bg-[#0B2545] text-white flex flex-col justify-between p-6 md:p-12 overflow-y-auto font-sans animate-fade-in">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-b border-blue-900/60 pb-5">
              <div className="flex items-center gap-4">
                <img src="/gd-logo.png" alt="GD Logo" className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 shadow-lg animate-pulse" />
                <div>
                  <span className={`text-sm font-black uppercase tracking-wider ${activeTest.accentColor} block`}>
                    {activeTest.badge} • Live Dynamic Examination
                  </span>
                  <span className="text-xs text-blue-200 font-mono">
                    Target: {activeTest.targetWpm} WPM | Min Accuracy: {activeTest.minAccuracy}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono">
                <button
                  onClick={() => startTest(selectedLevel)}
                  className="bg-blue-900/80 hover:bg-blue-800 text-blue-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-blue-700 transition flex items-center gap-2 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>New Paragraph</span>
                </button>

                <div className="text-right bg-slate-950/90 px-5 py-2 rounded-2xl border border-slate-800 shadow-inner">
                  <span className="block text-[10px] text-slate-400 uppercase font-bold">TIME LEFT</span>
                  <span className={`text-2xl font-black ${isTimerRunning ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                    {isTimerRunning ? `${timeLeft}s` : 'Waiting...'}
                  </span>
                </div>

                <button
                  onClick={() => setTestState('idle')}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-5 py-3 rounded-2xl border border-slate-800 transition"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>

            <div className="max-w-5xl mx-auto w-full my-auto space-y-6">
              <div className="bg-[#134074]/90 p-8 rounded-3xl border border-blue-900/60 font-mono text-lg md:text-xl leading-relaxed shadow-2xl select-none tracking-wide backdrop-blur-md">
                {renderAnimatedPassage()}
              </div>

              <textarea
                ref={inputRef}
                rows={4}
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type the passage above. Test will auto-submit upon completion..."
                className="w-full bg-slate-950 border-2 border-blue-500/80 text-white p-6 rounded-3xl font-mono text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.3)] tracking-wide placeholder:text-slate-500 resize-none"
              />
            </div>

            <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-t border-blue-900/40 pt-4 text-xs font-mono text-blue-300">
              <span>{!isTimerRunning ? '💡 Type any key to start timer & test' : '⚡ Auto-Submit & Live Keystroke Validation Active'}</span>
              <button
                onClick={() => finishTest()}
                className="bg-white text-[#0B2545] hover:bg-blue-50 font-extrabold px-8 py-3.5 rounded-2xl transition-all shadow-xl text-xs uppercase tracking-wider hover:scale-105"
              >
                Manual Submit →
              </button>
            </div>
          </div>
        )}

        {testState === 'result' && (
          <div className="max-w-xl mx-auto bg-white border-2 border-slate-200 p-10 rounded-3xl text-center space-y-6 shadow-2xl animate-fade-in">
            {isPassed ? (
              <>
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-3xl flex items-center justify-center text-4xl mx-auto animate-bounce">
                  🏆
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-emerald-700 uppercase bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 rounded-full">
                    QUALIFICATION PASSED!
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 mt-3">
                    Test Passed Successfully 🎉
                  </h2>
                  <p className="text-slate-500 text-xs md:text-sm mt-1">
                    Verify candidate full name to generate official certificate.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 font-mono">
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">SPEED ACHIEVED</span>
                    <span className="text-2xl font-black text-blue-700">{calculatedWpm} WPM</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">ACCURACY</span>
                    <span className="text-2xl font-black text-emerald-600">{calculatedAccuracy}%</span>
                  </div>
                </div>

                <div className="text-left bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase">
                    Full Name for Certificate:
                  </label>
                  <input 
                    type="text" 
                    value={candidateName} 
                    onChange={(e) => setCandidateName(e.target.value)} 
                    required
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-base font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  onClick={() => setTestState('certificate')}
                  className="w-full bg-[#0B2545] hover:bg-blue-800 text-white font-extrabold py-4 rounded-2xl transition-all shadow-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Generate Official Certificate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-rose-50 text-rose-600 border border-rose-200 rounded-3xl flex items-center justify-center text-4xl mx-auto">
                  ❌
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-rose-700 uppercase bg-rose-100 border border-rose-300 px-3.5 py-1.5 rounded-full">
                    BENCHMARK NOT MATCHED
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 mt-3">Try Again For Qualification</h2>
                  <p className="text-slate-500 text-xs md:text-sm mt-1">
                    Required: {activeTest.targetWpm} WPM & {activeTest.minAccuracy}% Accuracy.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 font-mono">
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">YOUR SPEED</span>
                    <span className="text-2xl font-black text-rose-600">{calculatedWpm} WPM</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">ACCURACY</span>
                    <span className="text-2xl font-black text-amber-600">{calculatedAccuracy}%</span>
                  </div>
                </div>

                <button
                  onClick={() => startTest(selectedLevel)}
                  className="w-full bg-[#0B2545] hover:bg-slate-900 text-white font-extrabold py-4 rounded-2xl transition shadow text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try New Passage 🔄</span>
                </button>
              </>
            )}
          </div>
        )}

        {testState === 'certificate' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-blue-50 border border-blue-200 p-4 rounded-2xl max-w-4xl mx-auto shadow-sm">
              <span className="text-xs font-bold text-blue-900">✨ Verified Certificate Ready for {candidateName}!</span>
              <div className="flex gap-3">
                <button 
                  onClick={handlePrint}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
                <button 
                  onClick={() => setTestState('idle')}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  Back to Tests
                </button>
              </div>
            </div>

            <div 
              id="printable-certificate"
              className={`max-w-4xl mx-auto bg-gradient-to-br ${activeTest.cardBg} text-white p-12 md:p-16 rounded-3xl border-8 border-double ${activeTest.borderTheme} shadow-2xl relative overflow-hidden text-center`}
            >
              <div className="relative z-10">
                <div className="flex justify-center items-center gap-3 mb-6">
                  <img src="/gd-logo.png" alt="GD Original Logo" className="w-14 h-14 object-contain rounded-2xl bg-white p-1 shadow-xl" />
                  <div className="text-left">
                    <span className="font-black tracking-widest text-base uppercase block text-white leading-none">GD Typing Suite</span>
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">Official Credential Authority</span>
                  </div>
                </div>

                <div className="inline-block bg-white/10 border border-white/20 px-6 py-2 rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-inner">
                  {activeTest.badge} Verified Certificate
                </div>

                <h2 className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">
                  Certificate of Proficiency & Skill
                </h2>
                
                <h1 className="text-xl md:text-3xl font-black text-white tracking-tight mb-4">
                  This official credential is proudly awarded to
                </h1>

                <div className={`text-3xl md:text-5xl font-extrabold ${activeTest.accentColor} border-b-2 border-slate-700 pb-4 inline-block px-12 mb-6 font-serif`}>
                  {candidateName}
                </div>

                <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
                  For successfully qualifying the official speed and accuracy examination under strict full-screen timed conditions for <strong className="text-white font-bold">{activeTest.title}</strong>.
                </p>

                <div className="flex justify-center gap-12 font-mono mb-12">
                  <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl">
                    <span className="block text-[10px] text-slate-400 uppercase">VERIFIED SPEED</span>
                    <span className={`text-2xl font-black ${activeTest.accentColor}`}>{calculatedWpm} WPM</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl">
                    <span className="block text-[10px] text-slate-400 uppercase">ACCURACY</span>
                    <span className="text-2xl font-black text-emerald-400">{calculatedAccuracy}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-slate-800 pt-8 text-xs font-mono text-slate-400">
                  <div className="text-left">
                    <span className="block font-bold text-white">Date: {new Date().toLocaleDateString()}</span>
                    <span>Credential ID: GD-{activeTest.id.toUpperCase()}-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-serif italic text-xl text-blue-300 mb-1">GD Board of Examinations</div>
                    <div className="border-t border-slate-700 pt-1">Authorized Examiner</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}