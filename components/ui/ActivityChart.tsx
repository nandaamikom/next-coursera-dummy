"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Chart,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRef, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ActivityData {
  day: string;
  logins: number;
  completedModules: number;
  avgTime: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

export default function ActivityChart({ data }: ActivityChartProps) {
  const chartRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, "rgba(59, 130, 246, 0.5)");
    gradient1.addColorStop(1, "rgba(59, 130, 246, 0.05)");

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, "rgba(16, 185, 129, 0.5)");
    gradient2.addColorStop(1, "rgba(16, 185, 129, 0.05)");

    chart.data.datasets[0].backgroundColor = gradient1;
    chart.data.datasets[1].backgroundColor = gradient2;
    chart.update();
  }, [data]);

  const chartData = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        label: "User Logins",
        data: data.map((item) => item.logins),
        borderColor: "#3b82f6",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: "#3b82f6",
      },
      {
        label: "Completed Modules",
        data: data.map((item) => item.completedModules),
        borderColor: "#10b981",
        tension: 0.4,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: "#10b981",
      },
    ],
  };

  const totalPoints = data.length;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: "#374151",
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        titleColor: "#111827",
        bodyColor: "#374151",
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { color: "#f3f4f6" },
        ticks: { color: "#6b7280" },
      },
      y: {
        grid: { color: "#f3f4f6" },
        ticks: { color: "#6b7280" },
      },
    },
    animations: {
      x: {
        type: "number" as const,
        easing: "easeOutQuart" as const,
        duration: 1000,
        from: 0,
        delay(ctx: ScriptableContext<"line">) {
          return ctx.dataIndex * (1000 / totalPoints);
        },
      },
      y: {
        type: "number" as const,
        easing: "easeOutQuart" as const,
        duration: 1000,
        from(ctx: ScriptableContext<"line">) {
          const chart = ctx.chart;
          const yScale = chart.scales.y;
          return yScale.getPixelForValue(0); 
        },
      },
    },
  };

  return (
    <div className="relative w-full h-[320px] rounded-lg bg-white p-4 shadow-sm">
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
}
