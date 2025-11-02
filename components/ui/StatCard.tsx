"use client";
import { useEffect, useState } from "react";

export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const [animateWave, setAnimateWave] = useState(true);

  useEffect(() => {
    const matches = Array.from(value.matchAll(/(\d+(\.\d+)?)/g));
    const numbers = matches.map((m) => parseFloat(m[0]));
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      let animatedValue = value;
      matches.forEach((match, index) => {
        const current = Math.floor(eased * numbers[index]);
        const formatted = current.toLocaleString();
        animatedValue = animatedValue.replace(match[0], formatted);
      });

      setDisplayValue(animatedValue);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    const timeout = setTimeout(() => {
      setAnimateWave(false);
    }, duration + 300);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative h-36 sm:h-40 bg-white rounded-2xl shadow p-4 sm:p-5 flex flex-col justify-center items-center text-center overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
      <h3 className="text-gray-900 font-semibold text-sm sm:text-base">
        {title}
      </h3>
      <p className="text-xl sm:text-2xl font-bold mt-2 text-[#0b132b] tracking-wide z-10">
        {displayValue}
      </p>
      <div className="absolute bottom-0 left-0 w-full h-12 overflow-hidden z-0">
        <svg
          className={`w-[200%] h-full ${
            animateWave ? "animate-wave" : "translate-x-[-50%]"
          } transition-transform duration-700 ease-out`}
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0 30 Q75 10 150 30 T300 30 T450 30 T600 30 T750 30 T900 30 T1050 30 T1200 30 V60 H0 Z"
            fill="url(#waveGradient)"
          />
          <path
            d="M0 30 Q75 10 150 30 T300 30 T450 30 T600 30 T750 30 T900 30 T1050 30 T1200 30"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  );
}
