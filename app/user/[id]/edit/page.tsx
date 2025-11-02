
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { User, dummyUsers } from "@/data/dashboardDummy";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params?.id);

  const foundUser = dummyUsers.find(u => u.id === userId) ?? null;
  const [user, setUser] = useState<User | null>(foundUser);

  useEffect(() => {
    if (!foundUser) {
      router.push("/user");
    }
  }, [foundUser, router]);

  if (!user) {
    return <div className="flex items-center justify-center h‑screen">Loading…</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const idx = dummyUsers.findIndex(u => u.id === userId);
    if (idx >= 0) {
      dummyUsers[idx] = { ...user };
    }
    router.push("/user");
  };

  return (
    <main className="flex min-h-screen bg-[#F9F9F9] text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <Navbar />
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w‑2xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Edit User: <span className="text-blue-600">{user.name}</span></h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Campus */}
              <div>
                <label htmlFor="campus" className="block text-sm font-medium text-gray-700">Campus</label>
                <input
                  id="campus"
                  name="campus"
                  value={user.campus}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>


              {/* Courses */}
              <div>
                <label htmlFor="courses" className="block text-sm font-medium text-gray-700">Courses</label>
                <input
                  id="courses"
                  name="courses"
                  type="number"
                  value={user.courses}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/user")}
                  className="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </main>
  );
}
