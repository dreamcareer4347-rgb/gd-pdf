'use client';

import { useState, useEffect } from 'react';
import { Keyboard, HelpCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const HINDI_LESSONS = [
  { id: 1, title: "Lesson 1: Home Row Foundation", desc: "Aarambhic home row keys ka abhyas", paragraphs: ["र क म त न क र म त न क र म त न क र म त न क", "न त क र म न त क र म न त क र म न त क र म", "क र म त न क र म त न क र म त न क र म त न"] },
  { id: 2, title: "Lesson 2: Left Hand Home Keys", desc: "Left hand ki key positions aur ungliyon ka abhyas", paragraphs: ["ा ि ् े ा ि ् े ा ि ् े ा ि ् े ा ि ् े", "फ ा ि ् े फ ा ि ् े फ ा ि ् े फ ा ि ् े", "े ष् द फ ा े ष् द फ ा े ष् द फ ा े ष् द फ ा"] },
  { id: 3, title: "Lesson 3: Right Hand Home Keys", desc: "Right hand ki key positions ka abhyas", paragraphs: ["य र क म त य र क म त य र क म त य र क म त", "त म क र य त म क र य त म क र य त म क र य", "म क र त य म क र त य म क र त य म क र त य"] },
  { id: 4, title: "Lesson 4: Basic Word Formation", desc: "Home row keys se chhote shabdh banana", paragraphs: ["कर मत सन रन रक सक कम तन रस षण कर मत सन", "सत नर कम रमन तक सर सन कसरत मतर करमन", "रमन कसरत कर मतर मन टर सन कर कम कर रन"] },
  { id: 5, title: "Lesson 5: Upper Row Introduction", desc: "Upar ki row ke aksharon ka abhyas", paragraphs: ["औ ऐ आ ई ऊ ब ह ग द ज औ ऐ आ ई ऊ ब ह ग द ज", "ई आ औ ऐ ऊ ज द ग ह ब ई आ औ ऐ ऊ ज द ग", "ताज राजा गीत बाज काम आज ताज राजा गीत बाज"] },
  { id: 6, title: "Lesson 6: Upper Row Practice Words", desc: "Upper row aur home row ko mila kar shabdh", paragraphs: ["माता पिता राजा रानी गीत आज कल पर सब", "भारत गगन पवन नयन कमल मगर मटर भवन", "सड़क नयन कलश पवन दमकल बरतन कमल मगर"] },
  { id: 7, title: "Lesson 7: Bottom Row Introduction", desc: "Neeche ki row ke aksharon ka abhyas", paragraphs: ["्र क्ष म व न स श ्र क्ष म व न स श ्र क्ष म", "स ल व म क्ष ्र स ल व म क्ष ्र स ल व म क्ष", "वंश लवर सनम कमल भवन सड़क नयन कलश पवन"] },
  { id: 8, title: "Lesson 8: Matras (आ, इ, ई)", desc: "Aarambhik matrason ka abhyas", paragraphs: ["राम सीता गीता मोहन सोहन पूजा कूलर नीम", "आम इमली ईख उमा ऊन ऋषि एक ऐनक ओखली", "औरत अंगूर आभूषण इमली ईख उमा ऊन ऋषि"] },
  { id: 9, title: "Lesson 9: Matras (उ, ऊ, ए, ऐ)", desc: "Badi matras aur svaro ka abhyas", paragraphs: ["कुल फूल मेल बैल बोल मोल ढोल खोल गोल", "सुनील कुमार सुमन पुनीत सुनील कुमार सुमन", "मूल भूत धूल शूल फूल कुल मेल बैल बोल"] },
  { id: 10, title: "Lesson 10: Half Letters (Aadhe Akshar)", desc: "Aadhe akshar (Halant) ka prayog", paragraphs: ["प्यार न्याय राष्ट्र विद्यालय कृष्ण चिह्न", "बुद्ध ध्यान स्वास्थ्य कम्प्यूटर स्वतंत्रता", "विज्ञान तकनीक ब्रह्मांड प्रशासन संविधान"] },
  { id: 11, title: "Lesson 11: Combined Row Drills", desc: "Teeno rows ka ek sath fluid abhyas", paragraphs: ["संसार परिवर्तन अनुशासन सफलता मेहनत लगन", "आत्मविश्वास जिज्ञासा प्रेरणा मार्गदर्शन प्रगति", "सकारात्मक दृष्टिकोण निरंतर अभ्यास सफलता की कुंजी"] },
  { id: 12, title: "Lesson 12: Conjunct Characters (Sanyukt Akshar)", desc: "Sanyukt vyanjanon ki vishesh practice", paragraphs: ["क्षत्रिय ज्ञानी श्रमिक छात्र परिश्रम इत्र", "विज्ञान क्षेत्र पत्र मित्र राष्ट्र श्रेष्ठ", "उत्कृष्ट महत्वपूर्ण प्रौद्योगिकी संस्थान व्यावहारिक"] },
  { id: 13, title: "Lesson 13: Two-Letter Word Fluency", desc: "Chhote shabdon ki rapid speed practice", paragraphs: ["हम तुम पर सब कर मत जल कल पल बल नल", "नभ जग तन मन धन बन जल कल पल बल नल", "कल कल जल जल नल नल पल पल बल बल सब सब"] },
  { id: 14, title: "Lesson 14: Three-Letter Word Rhythm", desc: "Teen aksharon wale shabdon ka abhyas", paragraphs: ["कमल मगर मटर भवन सड़क नयन कलश पवन", "दमकल बरतन कलश भवन नयन मदन गगन पवन", "सड़क कमल मगर मटर भवन सड़क नयन कलश"] },
  { id: 15, title: "Lesson 15: Four-Letter Word Agility", desc: "Char aksharon wale shabdon ka abhyas", paragraphs: ["अनाथालय नेवला बरगद अजगर कटहल मखमल", "षट्कोण थर्मस शलजम बर्तन दमकल शरबत", "कसरत भगवत बचपन खटमल हलचल उपवन"] },
  { id: 16, title: "Lesson 16: Punctuation & Special Symbols", desc: "Purna viram, alpa viram aur symbols ka abhyas", paragraphs: ["राम घर गया। सीता ने खाना पकाया, और हम सब ने खाया?", "क्या यह सच है! हाँ, यह बिल्कुल सत्य है।", "नियमों का पालन करना हमारा कर्तव्य है; अतः सतर्क रहें।"] },
  { id: 17, title: "Lesson 17: Administrative Vocabulary", desc: "Sarkari aur karyalayin shabdon ka abhyas", paragraphs: ["कार्यालय आदेश परिपत्र अधिसूचना संशोधन", "प्रशासनिक स्वीकृति अनुमोदन संतुष्टि प्रवर", "सचिवालय निर्देशालय मंत्रालय विभाग निगम"] },
  { id: 18, title: "Lesson 18: Legal & Court Terminology", desc: "High Court aur judicial shabdon ki practice", paragraphs: ["न्यायालय याचिका अपील magistrate याचिकाकर्ता", "प्रतिवादी गवाही दस्तावेज साक्ष्य फैसला आदेश", "संविधान अनुच्छेद याचिका रिट आज्ञापत्रा"] },
  { id: 19, title: "Lesson 19: High Speed Endurance Drills", desc: "Continuous speed aur accuracy sustain karna", paragraphs: ["निरंतर अभ्यास और कठोर परिश्रम से ही किसी भी कठिन लक्ष्य को प्राप्त किया जा सकता है। असफलता ही सफलता की पहली सीढ़ी होती है जिसे पार करके ही महान लोग आगे बढ़ते हैं।", "समय का सदुपयोग जीवन में सबसे बड़ी पूंजी है। जो व्यक्ति समय के महत्व को समझता है वह कभी जीवन में पीछे नहीं रहता और हर क्षेत्र में अपार सफलता अर्जित करता है।", "पर्यावरण संरक्षण आज के समय की सबसे बड़ी मांग है। पेड़-पौधे हमारे जीवन का आधार हैं इसलिए हमें अधिक से अधिक वृक्षारोपण करना चाहिए और प्रकृति की रक्षा करनी चाहिए।"] },
  { id: 20, title: "Lesson 20: Hindi Typing Master Graduation", desc: "Final comprehensive Hindi proficiency test", paragraphs: ["भारत का संविधान देश का सर्वोच्च विधान है जो संविधान सभा द्वारा 26 नवंबर 1949 को पारित हुआ और 26 जनवरी 1950 से प्रभावी हुआ। यह देश को एक संपूर्ण प्रभुत्व संपन्न, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य घोषित करता है.", "डिजिटल भारत अभियान का मुख्य उद्देश्य देश को डिजिटल रूप से सशक्त समाज और ज्ञान अर्थव्यवस्था में बदलना है। इसके माध्यम से सरकारी सेवाएं नागरिकों को इलेक्ट्रॉनिक रूप से उपलब्ध कराई जाती हैं जिससे पारदर्शिता बढ़ती है.", "राजभाषा हिंदी भारत के प्रशासनिक और कार्यालयीन कार्यों में एक प्रमुख माध्यम है। कुशल हिंदी टंकण (Typing) सरकारी और न्यायिक परीक्षाओं में सफलता प्राप्त करने के लिए अत्यंत आवश्यक कौशल माना जाता है। बधाई हो आपने 20वां पाठ सफलतापूर्वक पूरा कर लिया है!"] }
];

// Standard Inscript Keymaps (Normal & Shifted)
const INSCRIPT_KEYMAP = {
  'q': 'औ', 'Q': 'ऑ', 'w': 'ऐ', 'W': 'ओ', 'e': 'आ', 'E': 'अ', 'r': 'ई', 'R': 'इ', 't': 'ऊ', 'T': 'उ',
  'y': 'ब', 'Y': 'भ', 'u': 'ह', 'U': 'ङ', 'i': 'ग', 'I': 'घ', 'o': 'द', 'O': 'ध', 'p': 'ज', 'P': 'झ',
  'a': 'े', 'A': 'ए', 's': '्', 'S': 'ऋ', 'd': 'ि', 'D': 'ई', 'f': 'ा', 'F': 'ी', 'g': 'ष्', 'G': 'श',
  'h': 'य', 'H': 'य़', 'j': 'र', 'J': 'र्र', 'k': 'क', 'K': 'ख', 'l': 'म', 'L': 'ण', ';': 'त', ':': 'थ',
  'z': '्र', 'Z': '्र', 'x': 'क्ष', 'X': 'क्ष', 'c': 'म', 'C': 'छ', 'v': 'व', 'V': 'व', 'b': 'न', 'B': 'ण',
  'n': 'स', 'N': 'ष', 'm': 'श', 'M': 'श', ',': 'र्', '<': '?', '.': '.', '>': '>', ' ': ' '
};

const INSCRIPT_ROWS = [
  [
    { k: 'q', h: 'औ', sh: 'ऑ' }, { k: 'w', h: 'ऐ', sh: 'ओ' }, { k: 'e', h: 'आ', sh: 'अ' }, 
    { k: 'r', h: 'ई', sh: 'इ' }, { k: 't', h: 'ऊ', sh: 'उ' }, { k: 'y', h: 'ब', sh: 'भ' }, 
    { k: 'u', h: 'ह', sh: 'ङ' }, { k: 'i', h: 'ग', sh: 'घ' }, { k: 'o', h: 'द', sh: 'ध' }, { k: 'p', h: 'ज', sh: 'झ' }
  ],
  [
    { k: 'a', h: 'े', sh: 'ए' }, { k: 's', h: '्', sh: 'ऋ' }, { k: 'd', h: 'ि', sh: 'ई' }, 
    { k: 'f', h: 'ा', sh: 'ी' }, { k: 'g', h: 'ष्', sh: 'श' }, { k: 'h', h: 'य', sh: '़' }, 
    { k: 'j', h: 'र', sh: '्र' }, { k: 'k', h: 'क', sh: 'ख' }, { k: 'l', h: 'म', sh: 'ण' }, { k: ';', h: 'त', sh: 'थ' }
  ],
  [
    { k: 'z', h: '्र', sh: '्र' }, { k: 'x', h: 'क्ष', sh: 'क्ष' }, { k: 'c', h: 'म', sh: 'छ' }, 
    { k: 'v', h: 'व', sh: 'व' }, { k: 'b', h: 'न', sh: 'ण' }, { k: 'n', h: 'स', sh: 'ष' }, { k: 'm', h: 'श', sh: 'श' }
  ]
];

// Remington Gail Keymaps
const REMINGTON_KEYMAP = {
  'q': 'ू', 'Q': 'ू', 'w': 'ु', 'W': 'ु', 'e': 'म', 'E': 'म्', 'r': 'ता', 'R': 'त्र', 't': 'ज', 'T': 'ज्ञ',
  'a': 'ो', 'A': 'ओ', 's': 'े', 'S': 'ऐ', 'd': '्', 'D': 'द्', 'f': 'ि', 'F': 'ी', 'g': 'ी', 'G': 'ई',
  'h': 'ह', 'H': 'हः', 'j': 'र', 'J': 'ऋ', 'k': 'क', 'K': 'क्', 'l': 'स', 'L': 'ष्', ';': 'त', ':': 'त्',
  'z': 'ं', 'Z': 'ँ', 'x': 'ँ', 'X': 'ः', 'c': 'ष', 'C': 'छ', 'v': 'ग', 'V': 'घ', 'b': 'द', 'B': 'ध',
  'n': 'ल', 'N': 'ळ', 'm': 'श', 'M': 'श्', ' ': ' '
};

const REMINGTON_ROWS = [
  [
    { k: 'q', h: 'ू', sh: 'ू' }, { k: 'w', h: 'ु', sh: 'ु' }, { k: 'e', h: 'म', sh: 'म्' }, 
    { k: 'r', h: 'ता', sh: 'त्र' }, { k: 't', h: 'ज', sh: 'ज्ञ' }, { k: 'y', h: 'ल', sh: 'ल' }, 
    { k: 'u', h: 'न', sh: 'न्' }, { k: 'i', h: 'प', sh: 'प्' }, { k: 'o', h: 'प', sh: 'फ' }, { k: 'p', h: 'ब', sh: 'भ' }
  ],
  [
    { k: 'a', h: 'ो', sh: 'ओ' }, { k: 's', h: 'े', sh: 'ऐ' }, { k: 'd', h: '्', sh: 'द्' }, 
    { k: 'f', h: 'ि', sh: 'ी' }, { k: 'g', h: 'ी', sh: 'ई' }, { k: 'h', h: 'ह', sh: 'हः' }, 
    { k: 'j', h: 'र', sh: 'ऋ' }, { k: 'k', h: 'क', sh: 'क्' }, { k: 'l', h: 'स', sh: 'ष्' }, { k: ';', h: 'त', sh: 'त्' }
  ],
  [
    { k: 'z', h: 'ं', sh: 'ँ' }, { k: 'x', h: 'ँ', sh: 'ः' }, { k: 'c', h: 'ष', sh: 'छ' }, 
    { k: 'v', h: 'ग', sh: 'घ' }, { k: 'b', h: 'द', sh: 'ध' }, { k: 'n', h: 'ल', sh: 'ळ' }, { k: 'm', h: 'श', sh: 'श्' }
  ]
];

export default function HindiTypingPage() {
  const [selectedLayout, setSelectedLayout] = useState('inscript');
  const [activeLesson, setActiveLesson] = useState(null);
  const [currentParaIdx, setCurrentParaIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [convertedHindiInput, setConvertedHindiInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const activeKeymap = selectedLayout === 'inscript' ? INSCRIPT_KEYMAP : REMINGTON_KEYMAP;
  const activeKeyboardRows = selectedLayout === 'inscript' ? INSCRIPT_ROWS : REMINGTON_ROWS;

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Shift') setIsShiftPressed(true); };
    const handleKeyUp = (e) => { if (e.key === 'Shift') setIsShiftPressed(false); };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startLesson = (lesson) => {
    setActiveLesson(lesson);
    setCurrentParaIdx(0);
    setUserInput('');
    setConvertedHindiInput('');
    setStartTime(Date.now());
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
  };

  const handleInputChange = (e) => {
    const rawVal = e.target.value;
    setUserInput(rawVal);

    let mappedHindi = '';
    for (let char of rawVal) {
      if (activeKeymap[char]) {
        mappedHindi += activeKeymap[char];
      } else {
        mappedHindi += char;
      }
    }
    setConvertedHindiInput(mappedHindi);

    if (!startTime) setStartTime(Date.now());
    if (!activeLesson || !activeLesson.paragraphs[currentParaIdx]) return;

    const targetText = activeLesson.paragraphs[currentParaIdx];
    
    const timeElapsed = (Date.now() - startTime) / 60000;
    const wordsTyped = mappedHindi.trim().split(/\s+/).length;
    const currentWpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    setWpm(currentWpm > 0 ? currentWpm : 0);

    let correctChars = 0;
    for (let i = 0; i < mappedHindi.length; i++) {
      if (mappedHindi[i] === targetText[i]) correctChars++;
    }
    const currentAcc = mappedHindi.length > 0 ? Math.round((correctChars / mappedHindi.length) * 100) : 100;
    setAccuracy(currentAcc);

    if (mappedHindi.trim() === targetText.trim() || mappedHindi.length >= targetText.length) {
      if (currentParaIdx < activeLesson.paragraphs.length - 1) {
        setTimeout(() => {
          setCurrentParaIdx(prev => prev + 1);
          setUserInput('');
          setConvertedHindiInput('');
          setStartTime(Date.now());
        }, 300);
      } else {
        setIsCompleted(true);
      }
    }
  };

  const currentTarget = activeLesson && activeLesson.paragraphs ? activeLesson.paragraphs[currentParaIdx] : '';
  const progressPercent = currentTarget && currentTarget.length > 0 
    ? Math.min(100, Math.round((convertedHindiInput.length / currentTarget.length) * 100)) 
    : 0;

  const expectedChar = currentTarget && convertedHindiInput.length < currentTarget.length ? currentTarget[convertedHindiInput.length] : '';

  const renderTypedText = () => {
    if (!activeLesson || !activeLesson.paragraphs || !activeLesson.paragraphs[currentParaIdx]) return null;
    const text = activeLesson.paragraphs[currentParaIdx];
    return text.split('').map((char, index) => {
      let color = "text-slate-400";
      if (index < convertedHindiInput.length) {
        if (convertedHindiInput[index] === char) {
          color = "text-emerald-400 font-bold bg-emerald-950/50 px-0.5 rounded";
        } else {
          color = "text-rose-400 font-bold bg-rose-950/50 underline decoration-rose-500 px-0.5 rounded";
        }
      } else if (index === convertedHindiInput.length) {
        color = "text-white underline decoration-blue-400 font-bold animate-pulse bg-blue-500/20 px-0.5 rounded";
      }
      return (
        <span key={index} className={`${color} transition-all duration-75 font-mono text-2xl`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-8 font-sans pb-12 bg-white text-slate-900 animate-fade-in">
      {!activeLesson ? (
        <div>
          <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#134074] px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
                <Keyboard className="w-4 h-4 text-[#134074]" />
                <span>Complete Beginner-Friendly 20-Lesson Roadmap</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Hindi Typing Master Roadmap (20 Lessons) ⌨️
              </h1>
              <p className="text-slate-500 text-xs md:text-sm mt-1">
                Learn Hindi typing step by step with live virtual keyboard and Shift-key guidance.
              </p>
            </div>

            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
              <button
                onClick={() => setSelectedLayout('inscript')}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                  selectedLayout === 'inscript'
                    ? 'bg-[#134074] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Inscript Layout
              </button>
              <button
                onClick={() => setSelectedLayout('remington')}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
                  selectedLayout === 'remington'
                    ? 'bg-[#134074] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Remington Gail
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HINDI_LESSONS.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => startLesson(lesson)}
                className="group relative bg-gradient-to-br from-white via-slate-50 to-blue-50/20 border-2 border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-[#134074] hover:-translate-y-2 transition-all duration-400 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -right-16 -top-16 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all pointer-events-none"></div>

                <div>
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <span className="text-[11px] font-black px-3 py-1 rounded-full border bg-blue-50 text-[#134074] border-blue-200 uppercase tracking-wider">
                      Lesson {lesson.id}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full shadow-xs">
                      ⏱️ 3-5 Mins
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#134074] transition-colors mb-2 leading-snug relative z-10">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4 relative z-10 font-medium">
                    {lesson.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#134074] relative z-10">
                  <span className="text-slate-500 uppercase text-[10px]">Layout: {selectedLayout}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform font-extrabold text-sm flex items-center gap-1">
                    Start →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 bg-[#0B2545] text-white flex flex-col justify-between p-6 md:p-10 overflow-y-auto font-sans">
          
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center border-b border-blue-900/60 pb-4">
            <div className="flex items-center gap-3">
              <img src="/gd-logo.png" alt="GD Logo" className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 shadow-md" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-300 block">
                  {activeLesson.title} • Paragraph {currentParaIdx + 1} of 3 ({selectedLayout.toUpperCase()})
                </span>
                <h2 className="text-lg md:text-xl font-black text-white">Hindi Live Typing Practice Arena</h2>
              </div>
            </div>

            <button
              onClick={() => setActiveLesson(null)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold px-5 py-2.5 rounded-xl border border-slate-800 transition shadow"
            >
              ✕ Exit Lesson
            </button>
          </div>

          <div className="w-full max-w-6xl mx-auto my-auto py-4">
            {!isCompleted ? (
              <div className="bg-[#134074]/90 border border-blue-900/60 p-6 md:p-8 rounded-3xl mb-4 shadow-2xl backdrop-blur-md">
                
                <div className="flex justify-between items-center mb-4 bg-slate-950/80 px-6 py-3 rounded-2xl border border-slate-800/80 font-mono shadow-inner">
                  <div className="text-sm text-slate-300">
                    Speed: <span className="text-blue-300 font-black text-lg">{wpm} WPM</span>
                  </div>
                  <div className="text-sm text-slate-300">
                    Accuracy: <span className="text-emerald-400 font-black text-lg">{accuracy}%</span>
                  </div>
                  <div className="text-sm text-slate-300">
                    Progress: <span className="text-purple-400 font-black text-lg">Para {currentParaIdx + 1}/3 ({progressPercent}%)</span>
                  </div>
                </div>

                <div className="bg-blue-950/90 border border-blue-400/40 rounded-2xl p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-3 shadow-inner">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-200">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Active Layout:</strong> {selectedLayout.toUpperCase()} {isShiftPressed ? '• [SHIFT PRESSED]' : ''}</span>
                  </div>
                  <div className="bg-slate-900 border border-blue-500/50 px-4 py-1.5 rounded-xl text-xs font-mono text-amber-300 shadow">
                    💡 Next Character Hint: <strong className="text-white text-base bg-blue-600 px-2 py-0.5 rounded ml-1">{expectedChar === ' ' ? 'SPACE' : expectedChar}</strong>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 mb-4 leading-relaxed select-none max-h-40 overflow-y-auto shadow-inner text-left">
                  {renderTypedText()}
                </div>

                <textarea
                  value={userInput}
                  onChange={handleInputChange}
                  autoFocus
                  placeholder="Type keys here..."
                  className="w-full h-28 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xl font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-inner text-left mb-2"
                  rows={3}
                />
                
                <div className="text-xs font-mono text-blue-300 mb-4 px-2">
                  Live Converted Output: <span className="text-amber-300 font-bold">{convertedHindiInput || "Waiting for keypress..."}</span>
                </div>

                {/* Beginner Friendly Virtual Keyboard with Shift & Normal mapping */}
                <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-2xl shadow-inner">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2 text-center">
                    ⌨️ {selectedLayout.toUpperCase()} Keyboard Helper (Normal & Shift Characters Displayed)
                  </div>
                  <div className="space-y-1.5 flex flex-col items-center">
                    {activeKeyboardRows.map((row, rIdx) => (
                      <div key={rIdx} className="flex gap-1.5">
                        {row.map((item, kIdx) => {
                          const isHighlighted = expectedChar.toLowerCase() === item.k || expectedChar === item.h || expectedChar === item.sh;
                          return (
                            <div 
                              key={kIdx}
                              className={`px-3 py-2 rounded-xl text-xs font-mono flex flex-col items-center justify-center border transition-all ${
                                isHighlighted 
                                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-110 font-black' 
                                  : 'bg-slate-900 text-slate-300 border-slate-800'
                              }`}
                            >
                              <div className="flex gap-1 text-[9px] opacity-70">
                                <span className="uppercase text-amber-300">{item.k.toUpperCase()}</span>
                                <span>(Sh: {item.sh})</span>
                              </div>
                              <span className="text-sm font-bold">{item.h}</span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-slate-900 border border-blue-900/60 p-10 rounded-3xl text-center shadow-2xl animate-fade-in">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h3 className="text-3xl font-black text-white mb-2">{activeLesson.title} Completed!</h3>
                <p className="text-slate-400 text-base mb-8">You have successfully practiced all paragraphs for this lesson.</p>
                
                <div className="flex justify-center gap-8 mb-8 font-mono">
                  <div className="bg-slate-950 px-8 py-4 rounded-2xl border border-slate-800 shadow-inner">
                    <span className="block text-xs text-slate-500 mb-1">FINAL SPEED</span>
                    <span className="text-blue-300 font-black text-2xl">{wpm} WPM</span>
                  </div>
                  <div className="bg-slate-950 px-8 py-4 rounded-2xl border border-slate-800 shadow-inner">
                    <span className="block text-xs text-slate-500 mb-1">ACCURACY</span>
                    <span className="text-emerald-400 font-black text-2xl">{accuracy}%</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveLesson(null)}
                  className="bg-white text-[#0B2545] hover:bg-blue-50 font-extrabold px-10 py-4 rounded-2xl transition-all shadow-xl text-base"
                >
                  Back to 20-Lesson Roadmap →
                </button>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-slate-400 font-mono px-2">
              <span>Unicode / Kruti Dev Compatible Engine</span>
              <span className="text-blue-300 font-bold">GD Typing Pro Suite</span>
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