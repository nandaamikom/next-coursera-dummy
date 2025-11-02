"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LeaderboardItem {
  name: string;
  score: string;
  rank: number;
  avatar: string;
}

export default function LeaderboardCard({
  title,
  items,
}: {
  title: string;
  items: LeaderboardItem[];
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-5 transition-all duration-500">
      <h3 className="font-semibold mb-4 text-gray-900">{title}</h3>

      <div className="space-y-3">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-200/40 rounded-lg px-3 py-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300/60 rounded-full skeleton" />
                  <div className="space-y-2">
                    <div className="h-3 w-24 bg-gray-300/60 rounded skeleton" />
                    <div className="h-2 w-16 bg-gray-300/40 rounded skeleton" />
                  </div>
                </div>
                <div className="h-5 w-10 bg-gray-300/60 rounded skeleton" />
              </div>
            ))
          : items.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-200/30 rounded-lg px-3 py-2 transition hover:bg-gray-200/50"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.score}</p>
                  </div>
                </div>
                <span className="text-blue-500/80 font-bold">#{item.rank}</span>
              </div>
            ))}
      </div>
    </div>
  );
}
