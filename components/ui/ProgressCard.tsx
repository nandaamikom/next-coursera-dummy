"use client";
import { useEffect, useState } from "react";

export default function ProgressCard({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: number; color: string }[];
}) {
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    data.map(() => 0)
  );

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValues(data.map((d) => Math.floor(eased * d.value)));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i}>
            {/* Label dan Value */}
            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span>{animatedValues[i]}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className={`${item.color} h-2 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${animatedValues[i]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
