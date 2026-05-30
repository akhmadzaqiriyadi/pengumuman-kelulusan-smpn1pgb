"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CountdownTimer from '../components/CountdownTimer';
import SearchForm from '../components/SearchForm';
import ResultCard from '../components/ResultCard';
import siswaData from '../data/data_siswa.json';

export default function Home() {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const [isMounted, setIsMounted] = useState(false);
  const [targetDate, setTargetDate] = useState(0); 

  useEffect(() => {
    setIsMounted(true);
    // Set target time on client side to prevent hydration errors
    setTargetDate(new Date().getTime() + 10000);
  }, []);

  const handleSearch = (nisn, nis) => {
    setIsLoading(true);
    setError('');
    
    // Simulate network delay
    setTimeout(() => {
      const student = siswaData.find(s => s.nisn === nisn && s.nis === nis);
      if (student) {
        setResult(student);
      } else {
        setError('Data siswa tidak ditemukan. Periksa kembali NISN dan NIS Anda.');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
    setError('');
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 w-full max-w-4xl mx-auto">
          {/* Empty state while mounting to match SSR */}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 w-full max-w-4xl mx-auto">
        
        <div className="text-center mb-6 md:mb-8 w-full animate-fade-in-up">
          <Image 
            src="/logostupa.png" 
            alt="Logo SMPN 1 Pagerbarang" 
            width={120} 
            height={120} 
            className="mx-auto mb-4 md:mb-6 drop-shadow-md w-20 md:w-28 h-auto"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
          <h1 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-3 text-blue-900 drop-shadow-sm">
            SMP Negeri 1 Pagerbarang
          </h1>
          <p className="text-slate-600 text-xs md:text-base max-w-lg mx-auto font-medium px-4">
            Pengumuman Kelulusan Siswa Kelas 9 Tahun Ajaran 2025/2026
          </p>
        </div>

        {!isTimeUp ? (
          <CountdownTimer targetDate={targetDate} onComplete={() => setIsTimeUp(true)} />
        ) : (
          <div className="w-full">
            {!result ? (
              <div className="animate-fade-in-up w-full">
                <SearchForm onSearch={handleSearch} isLoading={isLoading} />
                
                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm md:text-base max-w-md mx-auto shadow-sm animate-fade-in-up">
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <ResultCard student={result} onReset={handleReset} />
            )}
          </div>
        )}
      </main>

      <footer className="py-6 text-slate-500 text-xs md:text-sm text-center border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        &copy; {new Date().getFullYear()} SMP Negeri 1 Pagerbarang. All rights reserved.
      </footer>
    </div>
  );
}
