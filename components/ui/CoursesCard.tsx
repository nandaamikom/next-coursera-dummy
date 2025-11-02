"use client";
import React from "react";

export interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  duration: string;
  students: number;
  status: string;
  progress: number;
  rating: number;
  lastUpdated: string;
  description: string;
}

interface CourseCardProps {
  course: Course;
  onToggleStatus: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function CourseCard({ course, onToggleStatus, onEdit }: CourseCardProps) {
  const statusColor = course.status === "active"
    ? "bg-emerald-500/80 text-white"
    : course.status === "draft"
    ? "bg-amber-500/80 text-white"
    : "bg-blue-500/80 text-white";

  const progressColor = course.status === "active"
    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
    : course.status === "draft"
    ? "bg-gradient-to-r from-amber-500 to-yellow-500"
    : "bg-gradient-to-r from-blue-500 to-indigo-500";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-300/50 overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">{course.title}</h3>
            <p className="text-sm">by {course.instructor}</p>
          </div>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
            {course.status === "active" ? "Active"
              : course.status === "draft" ? "Draft"
              : "Completed"}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-900/60 mb-4 line-clamp-2">{course.description}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">Progress</span>
            <span className="text-white font-medium">{course.progress}%</span>
          </div>
          <div className="w-full bg-blue-900/50 rounded-full h-2">
            <div className={`h-2 rounded-full ${progressColor}`} style={{ width: `${course.progress}%` }}></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-700/50 rounded-lg">
            <div className="text-sm text-white font-bold">Duration</div>
            <div className="text-white">{course.duration}</div>
          </div>
          <div className="text-center p-3 bg-blue-700/50 rounded-lg">
            <div className="text-sm text-white font-bold">Students</div>
            <div className="text-white">{course.students}</div>
          </div>
        </div>

        {/* Rating and Last Updated */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-amber-400 mr-1">★</div>
            <span className="font-medium">{course.rating > 0 ? course.rating.toFixed(1) : "N/A"}</span>
          </div>
          <div className="text-xs text-gray-300">Updated {course.lastUpdated}</div>
        </div>
      </div>

      {/* Footer with Actions */}
      <div className="px-6 py-3 bg-white flex justify-between items-center">
        <div className="text-xs px-2 py-1 bg-blue-800/50 rounded text-white">{course.category}</div>
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleStatus(course.id)}
            className={`px-3 py-1 text-sm rounded-lg ${
              course.status === "active"
                ? "bg-rose-700/60 hover:bg-rose-700/80 text-white"
                : "bg-emerald-700/60 hover:bg-emerald-700/80 text-white"
            }`}
          >
            {course.status === "active" ? "Deactivate" : "Activate"}
          </button>
          <button
            onClick={() => onEdit(course.id)}
            className="px-3 py-1 text-sm bg-blue-700/50 hover:bg-blue-700/70 text-white rounded-lg"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
