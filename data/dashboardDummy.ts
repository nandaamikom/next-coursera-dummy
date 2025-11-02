export interface User {
  id: number;
  name: string;
  email: string;
  campus: string;
  status: string;
  joinDate: string;
  courses: number;
  lastActive: string;
  avatar?: string;
}

//  Dashboard Stats 
export const dashboardStats = {
  activeUsers: "42/120",
  questionsAnswered: "5,847",
  avgSessionLength: "4m 12s",
  knowledgeGain: "+48%",
};

//  User Stats (untuk UsersPage) 
export const userStats = {
  totalUsers: "1,245",
  activeUsers: "987",
  inactiveUsers: "258",
  newUsers: "42",
};

//  Topics 
export const dummyTopics = {
  weakest: [
    { label: "Machine Learning", value: 32, color: "bg-rose-400" },
    { label: "Quantum Computing", value: 45, color: "bg-pink-300" },
    { label: "Blockchain Technology", value: 58, color: "bg-pink-200" },
  ],
  strongest: [
    { label: "Web Development", value: 92, color: "bg-green-400" },
    { label: "Database Systems", value: 89, color: "bg-emerald-400" },
    { label: "Computer Networks", value: 87, color: "bg-teal-400" },
  ],
};

//  Leaderboards 
export const dummyLeaderboard = {
  users: [
    { name: "Budi Santoso", score: "1,245 Points - 96%", rank: 1, avatar: "https://api.dicebear.com/9.x/adventurer/png?seed=Budi" },
    { name: "Siti Rahayu", score: "1,198 Points - 94%", rank: 2, avatar: "https://api.dicebear.com/9.x/adventurer/png?seed=Siti" },
    { name: "Ahmad Fauzi", score: "1,156 Points - 92%", rank: 3, avatar: "https://api.dicebear.com/9.x/adventurer/png?seed=Ahmad" },
    { name: "Maya Putri", score: "1,098 Points - 90%", rank: 4, avatar: "https://api.dicebear.com/9.x/adventurer/png?seed=Maya" },
    { name: "Rizki Pratama", score: "1,045 Points - 88%", rank: 5, avatar: "https://api.dicebear.com/9.x/adventurer/png?seed=Rizki" },
  ],
  groups: [
    { name: "Jakarta Campus", score: "78 Points / User - 94%", rank: 1, avatar: "https://api.dicebear.com/9.x/identicon/png?seed=Jakarta" },
    { name: "Bandung Campus", score: "72 Points / User - 91%", rank: 2, avatar: "https://api.dicebear.com/9.x/identicon/png?seed=Bandung" },
    { name: "Surabaya Campus", score: "68 Points / User - 89%", rank: 3, avatar: "https://api.dicebear.com/9.x/identicon/png?seed=Surabaya" },
    { name: "Yogyakarta Campus", score: "65 Points / User - 87%", rank: 4, avatar: "https://api.dicebear.com/9.x/identicon/png?seed=Yogyakarta" },
    { name: "Medan Campus", score: "62 Points / User - 85%", rank: 5, avatar: "https://api.dicebear.com/9.x/identicon/png?seed=Medan" },
  ],
};

//  Users 
export const dummyUsers: User[] = dummyLeaderboard.users.map((user, index) => ({
  id: index + 1,
  name: user.name,
  email: `${user.name.toLowerCase().replace(/ /g, ".")}@gmail.com`,
  campus: dummyLeaderboard.groups[index % dummyLeaderboard.groups.length].name,
  status: index % 2 === 0 ? "active" : "inactive",
  joinDate: ["15 Jan 2023","20 Feb 2023","10 Mar 2023","5 Apr 2023","12 May 2023"][index % 5],
  courses: [12,10,8,14,11][index % 5],
  lastActive: ["2 hours ago","1 day ago","5 days ago","3 hours ago","30 minutes ago"][index % 5],
  avatar: user.avatar,
}));

//  Activity 
export const activityData = [
  { day: "Mon", logins: 65, completedModules: 28, avgTime: 3.2 },
  { day: "Tue", logins: 59, completedModules: 32, avgTime: 4.1 },
  { day: "Wed", logins: 80, completedModules: 45, avgTime: 5.3 },
  { day: "Thu", logins: 81, completedModules: 42, avgTime: 4.8 },
  { day: "Fri", logins: 56, completedModules: 38, avgTime: 3.9 },
  { day: "Sat", logins: 55, completedModules: 30, avgTime: 3.5 },
  { day: "Sun", logins: 40, completedModules: 22, avgTime: 2.8 },
];


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

export const dummyCourses: Course[] = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Dr. Ahmad Fauzi",
    category: "Web Development",
    duration: "8 weeks",
    students: 124,
    status: "active",
    progress: 78,
    rating: 4.7,
    lastUpdated: "2 days ago",
    description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites."
  },
  {
    id: 2,
    title: "Database Systems Fundamentals",
    instructor: "Prof. Siti Rahayu",
    category: "Database",
    duration: "10 weeks",
    students: 98,
    status: "active",
    progress: 65,
    rating: 4.5,
    lastUpdated: "1 week ago",
    description: "Master relational databases, SQL, and database design principles."
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    instructor: "Dr. Budi Santoso",
    category: "AI & Data Science",
    duration: "12 weeks",
    students: 87,
    status: "draft",
    progress: 30,
    rating: 0,
    lastUpdated: "3 days ago",
    description: "Introduction to machine learning algorithms and practical applications."
  },
  {
    id: 4,
    title: "Computer Networks",
    instructor: "Dr. Maya Putri",
    category: "Networking",
    duration: "8 weeks",
    students: 76,
    status: "active",
    progress: 92,
    rating: 4.8,
    lastUpdated: "5 days ago",
    description: "Understand network protocols, architectures, and security fundamentals."
  },
  {
    id: 5,
    title: "Cybersecurity Essentials",
    instructor: "Prof. Rizki Pratama",
    category: "Security",
    duration: "6 weeks",
    students: 65,
    status: "completed",
    progress: 100,
    rating: 4.9,
    lastUpdated: "2 weeks ago",
    description: "Learn to protect systems, networks, and data from cyber threats."
  },
  {
    id: 6,
    title: "Mobile App Development",
    instructor: "Dr. Dewi Lestari",
    category: "Mobile Development",
    duration: "10 weeks",
    students: 112,
    status: "active",
    progress: 45,
    rating: 4.6,
    lastUpdated: "1 day ago",
    description: "Build cross‑platform mobile applications using React Native."
  },
];

export const courseStats = {
  totalCourses: "24",
  activeCourses: "18",
  totalStudents: "1,245",
  avgRating: "4.6"
};
