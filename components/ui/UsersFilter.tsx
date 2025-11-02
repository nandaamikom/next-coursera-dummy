// components/ui/UserFilters.tsx
"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface FilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  campusFilter: string;
  onCampusChange: (value: string) => void;
  campuses: string[];
}

export default function UserFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  campusFilter,
  onCampusChange,
  campuses,
}: FilterProps) {
  const [localSearch, setLocalSearch] = useState<string>(searchTerm);

  const handleSearchClick = () => {
    onSearchChange(localSearch);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearchChange(localSearch);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-800/20 to-blue-900/20 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-600/30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-4 pr-4 py-2 bg-white border border-blue-600/30 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            onClick={handleSearchClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 focus:outline-none"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="px-4 py-2 bg-blue-900/50 border border-blue-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            className="px-4 py-2 bg-blue-900/50 border border-blue-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={campusFilter}
            onChange={(e) => onCampusChange(e.target.value)}
          >
            <option value="all">All Campuses</option>
            {campuses.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
