'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function NdaAgeCalculatorClient() {
  const [mounted, setMounted] = useState(false);
  const [dob, setDob] = useState('');
  const [examYear, setExamYear] = useState('2026');
  const [examType, setExamType] = useState('NDA1');
  const [result, setResult] = useState(null);

  // Prevents Hydration error by ensuring rendering occurs only after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200 min-h-[300px] flex items-center justify-center">
        <div className="text-slate-400 font-semibold text-sm">Loading calculator...</div>
      </div>
    );
  }

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!dob) return;

    const birthDate = new Date(dob);
    
    let minDate, maxDate;

    if (examYear === '2026' && examType === 'NDA1') {
      minDate = new Date('2007-07-02');
      maxDate = new Date('2010-07-01');
    } else if (examYear === '2026' && examType === 'NDA2') {
      minDate = new Date('2008-01-02');
      maxDate = new Date('2011-01-01');
    } else {
      minDate = new Date('2008-01-02');
      maxDate = new Date('2011-01-01');
    }

    const isEligible = birthDate >= minDate && birthDate <= maxDate;

    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setResult({
      isEligible,
      years: ageYears,
      months: ageMonths,
      days: ageDays,
      minDateStr: minDate.toDateString(),
      maxDateStr: maxDate.toDateString(),
    });
  };

  const handleReset = () => {
    setDob('');
    setResult(null);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">NDA Age Calculator Online</h1>
          <p className="text-xs sm:text-sm text-slate-500">Check UPSC NDA 1 & NDA 2 Exam Eligibility by Date of Birth</p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Exam Edition</label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="NDA1">NDA 1 Exam</option>
              <option value="NDA2">NDA 2 Exam</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Target Year</label>
            <select
              value={examYear}
              onChange={(e) => setExamYear(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Enter Date of Birth (DOB)</label>
          <div className="relative">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
            />
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
          >
            Check Eligibility
          </button>
          {result && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {result && (
        <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
          <div className={`p-4 rounded-2xl flex items-center space-x-3 ${result.isEligible ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
            {result.isEligible ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 shrink-0" />
            )}
            <div>
              <p className="font-bold text-sm">
                {result.isEligible ? 'Congratulations! You are Eligible' : 'Sorry, You are Not Eligible'}
              </p>
              <p className="text-xs opacity-90 mt-0.5">
                {result.isEligible 
                  ? `Your DOB falls within the valid range for ${examType} ${examYear}.`
                  : `For ${examType} ${examYear}, your DOB must be between ${result.minDateStr} and ${result.maxDateStr}.`}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-around text-center">
            <div>
              <span className="block text-xl font-black text-slate-800">{result.years}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Years</span>
            </div>
            <div className="border-r border-slate-200"></div>
            <div>
              <span className="block text-xl font-black text-slate-800">{result.months}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Months</span>
            </div>
            <div className="border-r border-slate-200"></div>
            <div>
              <span className="block text-xl font-black text-slate-800">{result.days}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Days</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}