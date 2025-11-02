"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/ui/StatCard";
import UserFilters from "@/components/ui/UsersFilter";
import UserTable from "@/components/ui/UserTable";
import { User, dummyUsers, userStats } from "@/data/dashboardDummy";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [campusFilter, setCampusFilter] = useState("all");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUsers(dummyUsers);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  const toggleUserStatus = (id: number) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
      )
    );
  };

  const campuses = Array.from(new Set(users.map(u => u.campus)));

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesCampus = campusFilter === "all" || user.campus === campusFilter;
    return matchesSearch && matchesStatus && matchesCampus;
  });

  return (
    <main className="flex min-h-screen text-gray-900 bg-[#F9F9F9] overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        <Navbar />

        <div className="p-4 md:p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold">Users Management</h1>
              <p className="text-blue-500/80">Manage student accounts and their status</p>
            </div>
            <Link href="/user/add" className="self-start md:self-auto">
              <button className="mt-2 md:mt-0 px-4 py-2 bg-blue-700/50 rounded-lg hover:bg-blue-700/70 transition-all text-white w-full md:w-auto">
                Add New User +
              </button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-700/30 backdrop-blur-sm border border-blue-600/30 rounded-xl p-4">
              <StatCard title="Total Users" value={userStats.totalUsers} />
            </div>
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-700/30 backdrop-blur-sm border border-blue-600/30 rounded-xl p-4">
              <StatCard title="Active Users" value={userStats.activeUsers} />
            </div>
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-700/30 backdrop-blur-sm border border-blue-600/30 rounded-xl p-4">
              <StatCard title="Inactive Users" value={userStats.inactiveUsers} />
            </div>
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-700/30 backdrop-blur-sm border border-blue-600/30 rounded-xl p-4">
              <StatCard title="New Users" value={userStats.newUsers} />
            </div>
          </div>

          {/* Filters */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex flex-col md:flex-row gap-3 mt-2">
                <div className="skeleton h-12 flex-1 rounded-lg"></div>
                <div className="skeleton h-12 w-32 rounded-lg"></div>
                <div className="skeleton h-12 w-32 rounded-lg"></div>
              </div>
            ) : (
              <UserFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                campusFilter={campusFilter}
                onCampusChange={setCampusFilter}
                campuses={campuses}
              />
            )}
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="grid grid-cols-1 gap-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 border border-blue-600/20 rounded-xl bg-white">
                    <div className="skeleton h-10 w-10 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="skeleton h-4 w-3/4 rounded-md"></div>
                      <div className="skeleton h-3 w-1/2 rounded-md"></div>
                    </div>
                    <div className="skeleton h-8 w-20 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <UserTable
                users={filteredUsers}
                toggleUserStatus={toggleUserStatus}
                onEditUser={(id) => router.push(`/user/${id}/edit`)}
              />
            )}
          </div>

          {/* Pagination */}
          {!loading && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-blue-800 mt-4">
              <div>
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{filteredUsers.length}</span> of{" "}
                <span className="font-medium">{users.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-900/50 border border-blue-600/30 rounded-lg text-white hover:bg-blue-800/50 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-900/50 border border-blue-600/30 rounded-lg text-white hover:bg-blue-800/50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
