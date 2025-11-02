// components/ui/UserTable.tsx
"use client";

import React from "react";
import Image from "next/image";
import { User } from "@/data/dashboardDummy";
import { Pencil } from "lucide-react";

interface UserTableProps {
  users: User[];
  toggleUserStatus: (id: number) => void;
  onEditUser: (id: number) => void;
}

export default function UserTable({ users, toggleUserStatus, onEditUser }: UserTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-emerald-100 text-emerald-700";
      case "inactive": return "bg-rose-100 text-rose-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const headers = ["Name", "Email", "Campus", "Status", "Courses", "Last Active", "Actions"];

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {headers.map(header => (
                <th key={header} className="px-6 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={`Avatar for ${user.name}`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">Joined: {user.joinDate}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.campus}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase ${getStatusBadge(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{user.courses}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastActive}</td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium flex items-center space-x-3">
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`transition-colors p-1 rounded-md ${
                      user.status === "active"
                        ? "text-red-600 hover:text-red-900 bg-red-50"
                        : "text-emerald-600 hover:text-emerald-900 bg-emerald-50"
                    }`}
                  >
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => onEditUser(user.id)}
                    title="Edit User"
                    className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors flex items-center"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
