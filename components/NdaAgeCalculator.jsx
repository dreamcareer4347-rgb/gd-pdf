'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function NdaAgeCalculator() {
  const [dob, setDob] = useState('');
  const [cutoffDate, setCutoffDate] = useState('2026-07-01');
  const [ageResult, setAgeResult] = useState(null);

  const calculateNdaAge = (e) => {
    e.preventDefault();
    if (!dob || !cutoffDate) return;

    const birthDate = new Date(dob);
    const targetDate = new Date(cutoffDate);

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAgeResult({ years, months, days });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200">
      
      {/* SEO Optimized Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">NDA Age Calculator Online (UPSC Defense Eligibility)</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Calculate your exact age in Years, Months, and Days as per official UPSC NDA examination notification cutoff dates. Verify your eligibility instantly.
          </p>
        </div>
      </div>

      <form onSubmit={calculateNdaAge} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth (DOB)</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-blue-600"
              aria-label="Date of Birth"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Exam Cutoff Date</label>
            <input
              type="date"
              value={cutoffDate}
              onChange={(e) => setCutoffDate(e.target.value)}
              required
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-blue-600"
              aria-label="Exam Cutoff Date"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-xs"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Age Eligibility</span>
          </button>
        </div>

        {ageResult && (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
            <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wide">Exact Age on Cutoff Date</h4>
            <div className="flex justify-center items-center space-x-4 text-slate-900 font-black text-2xl">
              <span className="bg-white px-4 py-2 rounded-xl shadow-xs border border-emerald-100">{ageResult.years} <span className="text-xs font-normal text-slate-500 block">Years</span></span>
              <span className="bg-white px-4 py-2 rounded-xl shadow-xs border border-emerald-100">{ageResult.months} <span className="text-xs font-normal text-slate-500 block">Months</span></span>
              <span className="bg-white px-4 py-2 rounded-xl shadow-xs border border-emerald-100">{ageResult.days} <span className="text-xs font-normal text-slate-500 block">Days</span></span>
            </div>
            <p className="text-xs text-emerald-700 pt-2">Verify with the official UPSC NDA notification guidelines.</p>
          </div>
        )}
      </form>

      {/* SEO Informational Content Footer */}
      <div className="mt-12 pt-6 border-t border-slate-200 text-slate-500 text-xs space-y-2">
        <h2 className="font-bold text-slate-700 text-sm">How to Check NDA Exam Age Eligibility?</h2>
        <p>
          Candidates aspiring to join the National Defence Academy (NDA) through UPSC examinations must fall within specific age brackets defined by official notifications. With GD PDF Suite&apos;s NDA age calculator, you can enter your date of birth and the specified exam cutoff date to instantly determine whether you meet the exact age criteria required to apply successfully.
        </p>
      </div>

    </div>
  );
}