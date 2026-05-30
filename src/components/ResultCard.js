"use client";

import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import Image from 'next/image';

export default function ResultCard({ student, onReset }) {
  const isLulus = student.keterangan === 'LULUS';
  const cardRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (isLulus) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, [isLulus]);

  const handleCaptureScreenshot = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true); // Menyembunyikan tombol agar tidak ada ruang kosong

    try {
      // Tunggu render React selesai menyembunyikan tombol
      await new Promise(resolve => setTimeout(resolve, 200));

      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        style: {
          margin: '0', // Reset margin untuk screenshot
          boxShadow: 'none', // Hapus shadow di screenshot agar lebih bersih
        }
      });

      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], `SKL_${student.nama.replace(/\s+/g, '_')}.png`, { type: 'image/png' });
      
      const shareText = `Alhamdulillah saya dinyatakan LULUS dari SMPN 1 Pagerbarang! 🎓\nCek pengumuman di: ${window.location.href}`;

      // Coba bagikan via Web Share API (HP native share sheet)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'Hasil Kelulusan',
            text: shareText,
            files: [file]
          });
        } catch (error) {
          console.log('Share dibatalkan', error);
        }
      } else {
        // Fallback untuk Desktop PC: Unduh gambar lalu buka WA Web
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
        
        // Buka WhatsApp Web
        setTimeout(() => {
          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
        }, 500);
      }
    } catch (err) {
      console.error("Gagal membuat screenshot", err);
      alert('Maaf, gagal membuat gambar screenshot.');
    } finally {
      setIsCapturing(false); // Munculkan tombol kembali
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`bg-white border border-slate-200 rounded-2xl md:rounded-[2rem] w-full max-w-md md:max-w-lg mx-auto animate-fade-in-up transition-all duration-300 ${isCapturing ? 'p-8 md:p-12 shadow-none' : 'p-6 md:p-10 shadow-xl'}`}
    >
      
      {/* Header section (ditambah logo kecil agar screenshot terlihat resmi) */}
      <div className="text-center mb-5 md:mb-6">
        {isCapturing && (
          <div className="mb-4 flex justify-center">
            <Image src="/logostupa.png" alt="Logo" width={60} height={60} style={{ width: 'auto', height: 'auto' }} />
          </div>
        )}
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-full mb-2 md:mb-3">
          Surat Keterangan Lulus
        </span>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight mb-1">
          {student.nama}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 text-slate-500 text-xs md:text-sm font-medium">
          <span>NISN: <span className="text-slate-700 font-semibold">{student.nisn}</span></span>
          <span className="hidden md:inline">&bull;</span>
          <span>NIS: <span className="text-slate-700 font-semibold">{student.nis}</span></span>
        </div>
      </div>

      <hr className="border-slate-100 mb-5 md:mb-6" />

      {/* Result section */}
      <div className="text-center mb-2">
        <p className="text-slate-500 text-[11px] md:text-xs font-semibold mb-3 uppercase tracking-wide">
          Menyatakan bahwa siswa di atas:
        </p>
        
        <div className={`py-3 px-4 md:py-4 md:px-6 rounded-xl border-2 mx-auto inline-block min-w-[200px] md:min-w-[240px] ${
          isLulus 
            ? 'bg-emerald-50 border-emerald-200 shadow-sm shadow-emerald-100' 
            : 'bg-red-50 border-red-200 shadow-sm shadow-red-100'
        }`}>
          <span className={`block text-2xl md:text-3xl font-black tracking-widest uppercase ${
            isLulus ? 'text-emerald-600' : 'text-red-600'
          }`}>
            {isLulus ? 'L U L U S' : 'TIDAK LULUS'}
          </span>
        </div>
      </div>

      {/* Action Buttons - DIHILANGKAN SEMENTARA SAAT SCREENSHOT DIBUAT */}
      {!isCapturing && (
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
          {isLulus && (
            <button 
              onClick={handleCaptureScreenshot}
              className="flex justify-center items-center gap-2 w-full py-3 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#128C7E] shadow-md shadow-[#25D366]/20 transition-transform transform hover:scale-[1.02]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              Bagikan ke WhatsApp
            </button>
          )}
          
          <button 
            onClick={onReset} 
            className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors text-xs md:text-sm font-semibold shadow-sm"
          >
            Kembali ke Pencarian
          </button>
        </div>
      )}
    </div>
  );
}
