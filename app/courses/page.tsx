"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // <-- import useRouter
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/ui/StatCard";
import CoursesFilter from "@/components/ui/CoursesFilter";
import CourseCard from "@/components/ui/CoursesCard";
import { Course, dummyCourses, courseStats } from "@/data/dashboardDummy";

const categories = [
  "All",
  "Web Development",
  "Database",
  "AI & Data Science",
  "Networking",
  "Security",
  "Mobile Development",
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const router = useRouter(); // <-- inisialisasi router

  useEffect(() => {
    // simulasi loading shimmer
    const timeout = setTimeout(() => {
      setCourses(dummyCourses);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const toggleCourseStatus = (id: number) => {
    setCourses(prev =>
      prev.map(course =>
        course.id === id
          ? { ...course, status: course.status === "active" ? "draft" : "active" }
          : course
      )
    );
  };

  const handleEditCourse = (id: number) => {
    // arahkan ke halaman edit course
    router.push(`/courses/${id}/edit`);
  };

  const handleAddCourse = () => {
    // arahkan ke halaman tambah course baru
    router.push("/courses/add");
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <main className="flex min-h-screen bg-[#F9F9F9] text-gray-900 overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <Navbar />

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Courses Management</h1>
              <p className="text-blue-500/80">
                Manage and monitor all courses in the platform
              </p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                onClick={handleAddCourse}
                className="px-4 py-2 bg-blue-700/50 rounded-lg hover:bg-blue-700/70 transition-all text-white"
              >
                Add New Course +
              </button>
              <button className="px-4 py-2 bg-blue-700/50 rounded-lg hover:bg-blue-700/70 transition-all text-white">
                Import Course
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-700/30 backdrop-blur-sm border border-blue-600/30 rounded-xl p-4">
              <StatCard title="Total Courses" value={courseStats.totalCourses} />
            </div>
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-700/30 backdrop-blur-sm border border-blue-600/30 rounded-xl p-4">
              <StatCard title="Active Courses" value={courseStats.activeCourses} />
            </div>
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-700/30 backdrop-blur-sm border border-blue-600/30 rounded-xl p-4">
              <StatCard title="Total Students" value={courseStats.totalStudents} />
            </div>
            <div className="bg-gradient-to-br from-blue-800/30 to-blue-700/30 backdrop-blur-sm border border-blue-600/30 rounded-xl p-4">
              <StatCard title="Avg. Rating" value={courseStats.avgRating} />
            </div>
          </div>

          {/* Filters */}
          {loading ? (
            <div className="w-full h-12 rounded-lg skeleton"></div>
          ) : (
            <CoursesFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              categories={categories}
            />
          )}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="p-4 h-64 rounded-xl border border-blue-600/10 bg-white shadow-sm"
                >
                  <div className="h-32 w-full rounded-lg skeleton mb-4"></div>
                  <div className="h-4 w-3/4 rounded skeleton mb-2"></div>
                  <div className="h-4 w-1/2 rounded skeleton"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onToggleStatus={toggleCourseStatus}
                    onEdit={handleEditCourse} 
                  />
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="bg-white backdrop-blur-sm rounded-xl shadow-lg p-12 border border-blue-600/30 text-center">
                  <div className="text-5xl mb-4">📚</div>
                  <h3 className="text-xl font-bold mb-2">No courses found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setCategoryFilter("All");
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-white"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
