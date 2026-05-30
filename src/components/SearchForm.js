"use client";

import { useState } from 'react';

export default function SearchForm({ onSearch, isLoading }) {
  const [nisn, setNisn] = useState('');
  const [nis, setNis] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nisn.trim() && nis.trim()) {
      onSearch(nisn.trim(), nis.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white border border-slate-200 p-5 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 w-full max-w-md mx-auto animate-fade-in-up"
    >
      <h3 className="text-xl md:text-2xl font-bold text-center text-blue-900 mb-5 md:mb-6">
        Cek Status Kelulusan
      </h3>
      
      <div className="flex flex-col mb-4 md:mb-5">
        <label htmlFor="nisn" className="text-xs md:text-sm font-semibold text-slate-600 mb-2">
          Nomor Induk Siswa Nasional (NISN)
        </label>
        <input
          type="text"
          id="nisn"
          value={nisn}
          onChange={(e) => setNisn(e.target.value)}
          placeholder="Contoh: 0116075926"
          className="px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm md:text-base"
          required
        />
      </div>

      <div className="flex flex-col mb-6 md:mb-8">
        <label htmlFor="nis" className="text-xs md:text-sm font-semibold text-slate-600 mb-2">
          Nomor Induk Siswa (NIS)
        </label>
        <input
          type="text"
          id="nis"
          value={nis}
          onChange={(e) => setNis(e.target.value)}
          placeholder="Contoh: 10852"
          className="px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm md:text-base"
          required
        />
      </div>

      <button 
        type="submit" 
        disabled={isLoading || !nisn || !nis}
        className={`w-full py-2.5 md:py-3 px-4 rounded-xl font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base
          ${isLoading 
            ? 'bg-blue-400 cursor-not-allowed animate-pulse' 
            : 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/30'
          }
        `}
      >
        {isLoading ? 'Mencari Data...' : 'Cek Hasil Sekarang'}
      </button>
    </form>
  );
}
