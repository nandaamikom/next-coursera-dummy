// app/courses/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Course, dummyCourses } from "@/data/dashboardDummy";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = Number(params.id);

  const found = dummyCourses.find(c => c.id === courseId) || null;

  const [title, setTitle] = useState(found?.title || "");
  const [instructor, setInstructor] = useState(found?.instructor || "");
  const [target, setTarget] = useState<number>(found?.students || 0);
  const [duration, setDuration] = useState(found?.duration || "");
  const [category, setCategory] = useState(found?.category || "");

  useEffect(() => {
    if (!found) {
      router.push("/courses");
    }
  }, [found, router]);

  if (!found) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCourse: Course = {
      ...found,
      title,
      instructor,
      students: target,
      duration,
      category,
    };
    console.log("Saving course:", updatedCourse);
    router.push("/courses");
  };

  return (
    <main className="flex min-h-screen bg-[#F9F9F9] text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Course</h1>

          <div className="bg-white backdrop-blur-md border border-blue-600/20 rounded-2xl shadow-lg p-8 w-full mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                  placeholder="Enter course name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Instructor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor(s)</label>
                <input
                  type="text"
                  value={instructor}
                  onChange={e => setInstructor(e.target.value)}
                  required
                  placeholder="Comma separated instructors"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Target Students */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Students</label>
                <input
                  type="number"
                  value={target}
                  onChange={e => setTarget(Number(e.target.value))}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  required
                  placeholder="e.g. 8 weeks"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Select category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Database">Database</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Networking">Networking</option>
                  <option value="Security">Security</option>
                  <option value="Mobile Development">Mobile Development</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => router.push("/courses")}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-700/50 hover:bg-blue-700/70 text-white rounded-lg transition-all"
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
