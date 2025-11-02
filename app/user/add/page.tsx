// app/user/add/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { User, dummyUsers } from "@/data/dashboardDummy";

export default function AddUserPage() {
  const router = useRouter();

  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    campus: "",
    status: "active",
    courses: 0,
    lastActive: "",
    avatar: "", 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (!newUser.name || !newUser.email || !newUser.campus) {
      alert("Please fill in Name, Email and Campus.");
      return;
    }

    const nextId = dummyUsers.length > 0
      ? Math.max(...dummyUsers.map(u => u.id)) + 1
      : 1;

    const userToAdd: User = {
      id: nextId,
      name: newUser.name,
      email: newUser.email,
      campus: newUser.campus,
      status: (newUser.status as "active" | "inactive") || "active",
      joinDate: new Date().toLocaleDateString("en‑US", { day: "2-digit", month: "short", year: "numeric" }),
      courses: Number(newUser.courses) || 0,
      lastActive: newUser.lastActive || "just now",
      avatar: newUser.avatar || "",  
    };

    dummyUsers.push(userToAdd);
    router.push("/user");
  };

  return (
    <main className="flex min-h-screen bg-[#F9F9F9] text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <Navbar />
        <div className="p-6">
          <div className="bg-white backdrop-blur-md border border-blue-600/20 rounded-xl shadow-lg p-6 w-full min-w-xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Add New User</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  name="name"
                  value={newUser.name}
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
                  value={newUser.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-blue-500 focus:border-blue‑500"
                  required
                />
              </div>

              {/* Campus */}
              <div>
                <label htmlFor="campus" className="block text-sm font-medium text-gray-700">Campus</label>
                <input
                  id="campus"
                  name="campus"
                  value={newUser.campus}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-blue‑500 focus:border-blue‑500"
                  required
                />
              </div>



              {/* Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/user")}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700/50 text-white rounded-lg hover:bg-blue-700/70 transition"
                >
                  Create User
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </main>
  );
}
