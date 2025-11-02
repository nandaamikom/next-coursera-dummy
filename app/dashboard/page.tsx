"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/ui/StatCard";
import ProgressCard from "@/components/ui/ProgressCard";
import LeaderboardCard from "@/components/ui/LeaderboardCard";
import ActivityChart from "@/components/ui/ActivityChart";

import { dashboardStats, dummyTopics, dummyLeaderboard, activityData } from "@/data/dashboardDummy";

export default function DashboardPage() {
  const { activeUsers, questionsAnswered, avgSessionLength, knowledgeGain } = dashboardStats;

  return (
    <main className="relative flex min-h-screen text-gray-900 overflow-hidden bg-[#F9F9F9]">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <Navbar />

        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
          {/*  Stats Section  */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Active Users" value={activeUsers} />
            <StatCard title="Questions Answered" value={questionsAnswered} />
            <StatCard title="Av. Session Length" value={avgSessionLength} />
            <StatCard title="Knowledge Gain" value={knowledgeGain} />
          </div>

          {/*  Activity & Progress Section  */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Activity Chart */}
            <div className="xl:col-span-2 bg-white rounded-xl shadow p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg sm:text-xl">Learning Activity</h2>
                <div className="text-sm sm:text-base">Last 7 days</div>
              </div>
              <ActivityChart data={activityData} />
            </div>

            {/* Progress Cards */}
            <div className="space-y-6">
              <ProgressCard title="Weakest Topics" data={dummyTopics.weakest} />
              <ProgressCard title="Strongest Topics" data={dummyTopics.strongest} />
            </div>
          </div>

          {/* ===== Leaderboard Section ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LeaderboardCard title="Top Students" items={dummyLeaderboard.users} />
            <LeaderboardCard title="Campus Leaderboard" items={dummyLeaderboard.groups} />
          </div>
        </div>
      </div>
    </main>
  );
}
