"use client";

import Countdown from 'react-countdown';

export default function CountdownTimer({ targetDate, onComplete }) {
  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      if (onComplete) {
        setTimeout(onComplete, 0);
      }
      return null;
    } else {
      // Render a countdown
      return (
        <div className="text-center mb-6 md:mb-8 w-full">
          <h2 className="text-base md:text-xl text-blue-900 mb-4 md:mb-6 font-semibold">
            Pengumuman Kelulusan Akan Dibuka Dalam:
          </h2>
          <div className="flex justify-center gap-2 md:gap-6">
            {[
              { label: 'Hari', value: days },
              { label: 'Jam', value: hours },
              { label: 'Menit', value: minutes },
              { label: 'Detik', value: seconds },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center bg-white border border-blue-100 p-2 md:p-4 rounded-xl md:rounded-2xl shadow-sm min-w-[60px] md:min-w-[100px]"
              >
                <div className="text-2xl md:text-5xl font-bold text-blue-600 mb-1">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-sm text-slate-500 uppercase font-medium tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return <Countdown date={targetDate} renderer={renderer} />;
}
