// components/ui/CoursesFilter.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface CoursesFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export default function CoursesFilter({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  categories,
}: CoursesFilterProps) {
  const [localSearch, setLocalSearch] = useState<string>(searchTerm);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [localSearch, onSearchChange]);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="bg-gradient-to-br from-blue-800/20 to-blue-900/20 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-600/30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-blue-600/30 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            className="px-4 py-2 bg-blue-900/50 border border-blue-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="completed">Completed</option>
          </select>
          <select
            className="px-4 py-2 bg-blue-900/50 border border-blue-600/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            >
            {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
            </select>
        </div>
      </div>
    </div>
  );
}
