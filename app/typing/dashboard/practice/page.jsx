'use client';

import { useState } from 'react';
import { BookOpen, Clock, Award, FileText, ArrowRight, Sparkles, Music, X, Palette, CheckCircle2 } from 'lucide-react';

const COURSE_LESSONS = [
  {
    id: 1,
    title: "Lesson 1: Home Row Foundation (asdf jkl;)",
    duration: "3 Mins",
    levelType: "Beginner",
    desc: "Master foundational home row finger placement.",
    icon: "⌨️",
    paragraphs: [
      "asdf jkl; asdf jkl; dad fsa jkl asd lkj dad fsa jkl asd lkj",
      "fall lass lads fads ask dad falls flak alas salad flask aal",
      "asks dads lads falls salads flasks alfa alal fads kafa fall"
    ]
  },
  {
    id: 2,
    title: "Lesson 2: Index Finger Reach (g & h)",
    duration: "3 Mins",
    levelType: "Beginner",
    desc: "Practice stretching index fingers to center keys g and h.",
    icon: "🖐️",
    paragraphs: [
      "fg hj fg hj ghjf jfgh dash gas hash glad flag gash flash",
      "half hall hag gaga gash slag flag glass flash shad dash",
      "glad bags gash gall hall flag half slag flash glass salad"
    ]
  },
  {
    id: 3,
    title: "Lesson 3: Top Row Keys (q w e r t)",
    duration: "3 Mins",
    levelType: "Beginner",
    desc: "Expand finger movement to upper left alphabet row.",
    icon: "🔤",
    paragraphs: [
      "qwer trew qwer trew wet red raw tea war wed rag tag tar",
      "water great tread water trade sweater tread water rate",
      "great water trade rag tag wet red raw tea war wed tread"
    ]
  },
  {
    id: 4,
    title: "Lesson 4: Top Row Keys (y u i o p)",
    duration: "3 Mins",
    levelType: "Beginner",
    desc: "Master upper right finger reach for complete top row.",
    icon: "🎯",
    paragraphs: [
      "uiop poiu uiop poiu pit pot put tip top toy port part",
      "your pour priority output input top tip plot pillow",
      "output priority input plot pillow port part toy tip top"
    ]
  },
  {
    id: 5,
    title: "Lesson 5: Combined Top & Home Row Drills",
    duration: "3 Mins",
    levelType: "Beginner",
    desc: "Fluid transitions between home and upper alphabet rows.",
    icon: "⚡",
    paragraphs: [
      "the quick brown fox jumps over the lazy dog near the well",
      "practice daily to improve finger movement and memory",
      "simple words built with top and home row keys together"
    ]
  },
  {
    id: 6,
    title: "Lesson 6: Bottom Row Keys (z x c v b)",
    duration: "3 Mins",
    levelType: "Beginner",
    desc: "Lower left finger placement and stretch drills.",
    icon: "🔻",
    paragraphs: [
      "zxcv vcxz zxcv vcxz cab van box tax vac zap cat",
      "active voice extra zebra zero zinc cave cab van box",
      "vac zap cat wax tax active voice extra zebra zero zinc"
    ]
  },
  {
    id: 7,
    title: "Lesson 7: Bottom Row Keys (n m , . /)",
    duration: "3 Mins",
    levelType: "Beginner",
    desc: "Lower right finger placement and punctuation reach.",
    icon: "📍",
    paragraphs: [
      "bnm, mnb, bnm, mnb, man men net met map pan pin pen",
      "can man net met map pan pin pen main name moon noon",
      "main name moon noon pan pin pen net met map man can"
    ]
  },
  {
    id: 8,
    title: "Lesson 8: Full Keyboard Integration",
    duration: "3 Mins",
    levelType: "Intermediate",
    desc: "Seamless movement across all three alphabet rows.",
    icon: "🔠",
    paragraphs: [
      "keyboard mastery requires patience rhythm and regular daily practice sessions",
      "touch typing allows your fingers to move naturally without looking down",
      "building strong muscle memory takes time and consistent finger discipline"
    ]
  },
  {
    id: 9,
    title: "Lesson 9: Capitalization & Shift Keys",
    duration: "3 Mins",
    levelType: "Intermediate",
    desc: "Alternating hands for uppercase letters and swift shifts.",
    icon: "⇧",
    paragraphs: [
      "Alpha Beta Gamma Delta Echo Foxtrot Golf Hotel India",
      "January February March April May June July August September",
      "Monday Tuesday Wednesday Thursday Friday Saturday Sunday"
    ]
  },
  {
    id: 10,
    title: "Lesson 10: Number Row Stretch (1-5)",
    duration: "3 Mins",
    levelType: "Intermediate",
    desc: "Reaching numerical keys with left hand fingers.",
    icon: "🔢",
    paragraphs: [
      "12345 12345 11 22 33 44 55 123 234 345 543 321 152",
      "item 1 costs 10 rupees item 2 costs 20 rupees total 30",
      "zone 1 block 2 sector 3 phase 4 room 5 level 1"
    ]
  },
  {
    id: 11,
    title: "Lesson 11: Number Row Stretch (6-0)",
    duration: "3 Mins",
    levelType: "Intermediate",
    desc: "Reaching numerical keys with right hand fingers.",
    icon: "🔢",
    paragraphs: [
      "67890 67890 66 77 88 99 00 678 789 890 098 876 670",
      "item 6 costs 60 rupees item 7 costs 70 rupees total 130",
      "zone 6 block 7 sector 8 phase 9 room 0 level 6"
    ]
  },
  {
    id: 12,
    title: "Lesson 12: Special Symbols & Punctuation",
    duration: "3 Mins",
    levelType: "Intermediate",
    desc: "Mastering comma, period, question mark, and quotes.",
    icon: "🔣",
    paragraphs: [
      "Hello, world! How are you today? Practice makes typing perfect.",
      "Are you ready? Yes, I am ready to improve my speed.",
      "Always check your accuracy; speed will follow naturally."
    ]
  },
  {
    id: 13,
    title: "Lesson 13: Two-Letter Word Fluency",
    duration: "5 Mins",
    levelType: "Advanced",
    desc: "Rapid switching on common short English words.",
    icon: "💨",
    paragraphs: [
      "to do be or in of it as he on by at so we an my or no",
      "if up an do no us me my so he by at in on to of be it",
      "it is to be on my go do we in as up at so by or no"
    ]
  },
  {
    id: 14,
    title: "Lesson 14: Three-Letter Word Rhythm",
    duration: "5 Mins",
    levelType: "Advanced",
    desc: "Building steady rhythm with common 3-letter combinations.",
    icon: "🌊",
    paragraphs: [
      "the and for are but not you all any can her was one",
      "our out day get has him his how man new now old see",
      "two way who boy did its let put say she too use dad"
    ]
  },
  {
    id: 15,
    title: "Lesson 15: Four-Letter Word Agility",
    duration: "5 Mins",
    levelType: "Advanced",
    desc: "Fast finger transitions across 4-letter vocabulary.",
    icon: "⚡",
    paragraphs: [
      "that with have this from they will what word work",
      "your time each make high down take only come know",
      "just year into good some could them other than then"
    ]
  },
  {
    id: 16,
    title: "Lesson 16: Finger Independence & Alternation",
    duration: "5 Mins",
    levelType: "Advanced",
    desc: "Preventing finger locking with alternate hand patterns.",
    icon: "🔄",
    paragraphs: [
      "typing speed increases significantly when both hands share equal load",
      "maintaining proper posture prevents fatigue during extended sessions",
      "rhythm and consistent pacing matter much more than raw bursting"
    ]
  },
  {
    id: 17,
    title: "Lesson 17: Complex English Vocabulary Drills",
    duration: "5 Mins",
    levelType: "Advanced",
    desc: "Navigating long words and tricky letter pairings smoothly.",
    icon: "📚",
    paragraphs: [
      "development environment architecture performance structure efficiency",
      "concentration dedication consistency persistence achievement progress",
      "fundamental professional intellectual technological revolutionary"
    ]
  },
  {
    id: 18,
    title: "Lesson 18: High Speed Rhythm Burst",
    duration: "5 Mins",
    levelType: "Advanced",
    desc: "Pushing velocity while maintaining strict error control.",
    icon: "🚀",
    paragraphs: [
      "push your boundaries slightly beyond comfort zone to achieve faster reflex response",
      "smooth keystrokes without hesitation create an effortless typing flow state",
      "focus entirely on rhythm and let your muscle memory handle letter sequences"
    ]
  },
  {
    id: 19,
    title: "Lesson 19: Advanced Endurance & Flow",
    duration: "5 Mins",
    levelType: "Advanced",
    desc: "Sustaining high concentration over extended continuous paragraphs.",
    icon: "⏳",
    paragraphs: [
      "sustained typing endurance requires relaxed wrists curved fingers and steady breathing",
      "every professional typist started exactly where you are by practicing basic rows daily",
      "dedicate ten minutes every single day to notice remarkable improvement in speed"
    ]
  },
  {
    id: 20,
    title: "Lesson 20: Touch Typing Master Graduation",
    duration: "5 Mins",
    levelType: "Advanced",
    desc: "Final comprehensive finger mastery test to complete the course.",
    icon: "🎓",
    paragraphs: [
      "Congratulations on completing the complete 20-lesson Touch Typing Improvement Course! Your fingers have successfully built strong muscle memory across all keyboard rows without needing to look down. Keep practicing regularly to maintain peak speed and effortless fluency.",
      "This final test evaluates your complete finger independence rhythm and coordination. By maintaining relaxed wrists steady pacing and high accuracy you have mastered touch typing from scratch.",
      "You are now fully equipped with professional typing agility for any digital work. Continue exploring our arcade games or practice drills anytime to keep your typing skills razor sharp!"
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

export default function TouchPracticePage() {
  const [activeLesson, setActiveLesson] = useState(null);
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

  const startLesson = (lesson) => {
    setActiveLesson(lesson);
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
    if (!activeLesson || !activeLesson.paragraphs[currentParaIdx]) return;

    const targetText = activeLesson.paragraphs[currentParaIdx];
    
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
      if (currentParaIdx < activeLesson.paragraphs.length - 1) {
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

  const currentTarget = activeLesson && activeLesson.paragraphs ? activeLesson.paragraphs[currentParaIdx] : '';
  const progressPercent = currentTarget && currentTarget.length > 0 
    ? Math.min(100, Math.round((userInput.length / currentTarget.length) * 100)) 
    : 0;

  const renderTypedText = () => {
    if (!activeLesson || !activeLesson.paragraphs || !activeLesson.paragraphs[currentParaIdx]) return null;
    const text = activeLesson.paragraphs[currentParaIdx];
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
      {!activeLesson ? (
        <div>
          {/* Header */}
          <div className="mb-10 border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#134074] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#134074]" />
              <span>Touch Typing Improvement Course</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              20 Progressive Touch Typing Lessons 🚀
            </h1>
            <p className="text-slate-500 text-xs md:text-sm mt-1">
              Master touch typing from scratch with 3 auto-progressing practice paragraphs per lesson.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSE_LESSONS.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => startLesson(lesson)}
                className="group relative bg-gradient-to-br from-white via-slate-50 to-blue-50/20 border-2 border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-[#134074] hover:-translate-y-2 transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -right-16 -top-16 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B2545] to-[#134074] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#134074] border border-blue-200/80 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {lesson.icon}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-black px-3 py-1 rounded-full border uppercase tracking-wider ${
                        lesson.levelType === 'Advanced' 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' 
                          : lesson.levelType === 'Intermediate'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {lesson.levelType}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
                        ⏱️ {lesson.duration}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#134074] transition-colors mb-2 leading-snug relative z-10">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-6 relative z-10 font-medium">
                    {lesson.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#134074] relative z-10">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    3 Practice Paragraphs
                  </span>
                  <span className="group-hover:translate-x-1.5 transition-transform font-extrabold text-sm">→</span>
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
                  {activeLesson.title} • Paragraph {currentParaIdx + 1} of 3
                </span>
                <h2 className="text-lg md:text-xl font-black text-white">Touch Practice Arena</h2>
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
                onClick={() => { setActiveLesson(null); setShowMusicPlayer(false); }}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl border border-slate-800 transition flex items-center gap-1.5 shadow"
              >
                <X className="w-3.5 h-3.5" />
                <span>Exit Lesson</span>
              </button>
            </div>
          </div>

          {/* YouTube Music Player Drawer */}
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

          {/* Main Container */}
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

                {/* Progress Animation Bar */}
                <div className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-4 mb-6 relative overflow-hidden shadow-inner h-24 flex items-center">
                  
                  <div 
                    className="absolute transition-all duration-500 ease-out filter drop-shadow-lg"
                    style={{ left: `${Math.min(44, (progressPercent * 0.42))}%` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                      alt="Avatar 1" 
                      className="w-14 h-14 rounded-full border-2 border-blue-500 object-cover shadow-md"
                    />
                  </div>

                  {progressPercent >= 98 && (
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 animate-bounce bg-pink-950/90 px-4 py-2 rounded-full border border-pink-500 shadow-xl">
                      <span className="text-lg">💖</span>
                      <span className="text-xs font-bold text-pink-300 tracking-wide">Perfect Match!</span>
                      <span className="text-lg">💖</span>
                    </div>
                  )}

                  <div 
                    className="absolute transition-all duration-500 ease-out filter drop-shadow-lg"
                    style={{ right: `${Math.min(44, (progressPercent * 0.42))}%` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80" 
                      alt="Avatar 2" 
                      className="w-14 h-14 rounded-full border-2 border-pink-500 object-cover shadow-md"
                    />
                  </div>

                  <div className="absolute bottom-2 left-6 right-6 bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full transition-all duration-500 ease-out shadow-lg"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Passage Text Container */}
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800/80 mb-6 leading-relaxed select-none max-h-56 overflow-y-auto shadow-inner">
                  {renderTypedText()}
                </div>

                {/* Textarea */}
                <textarea
                  value={userInput}
                  onChange={handleInputChange}
                  autoFocus
                  placeholder="Type the passage above smoothly. Next paragraph will load automatically..."
                  className={`w-full h-44 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-lg font-mono text-white focus:outline-none focus:ring-2 ${activeThemeObj.accent} resize-none shadow-inner transition-all`}
                  rows={4}
                />
              </div>
            ) : (
              <div className={`bg-slate-900 border ${activeThemeObj.border} p-10 rounded-3xl text-center shadow-2xl animate-fade-in`}>
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h3 className="text-3xl font-black text-white mb-2">Lesson {activeLesson.id} Completed Successfully!</h3>
                <p className="text-slate-400 text-base mb-8">You have successfully completed all 3 practice paragraphs.</p>
                
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
                  onClick={() => setActiveLesson(null)}
                  className="bg-white text-[#0B2545] hover:bg-blue-50 font-extrabold px-10 py-4 rounded-2xl transition-all shadow-xl text-base transform hover:-translate-y-0.5"
                >
                  Back to Course Menu →
                </button>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-slate-400 font-mono px-2">
              <span>Auto-Progression & Real-time WPM Engine Active</span>
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