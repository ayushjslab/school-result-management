/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Users,
  GraduationCap,
  School,
  BookOpen,
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Target,
  Clock,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  gpa: number;
  profileUrl?: string;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  experience: number;
  profileUrl?: string;
}

interface Classroom {
  id: string;
  className: string;
  teacher: string;
  studentCount: number;
  averageGrade: number;
  progress: number;
  subject: string;
}

interface SchoolInfo {
  name: string;
  headName: string;
  address: string;
  phone: string;
  email: string;
  established: number;
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
}

const SchoolDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "teachers" | "classes"
  >("overview");

  // Mock data
  const schoolInfo: SchoolInfo = {
    name: "EduPortal Academy",
    headName: "Dr. Sarah Johnson",
    address: "123 Education Street, Knowledge City, KC 12345",
    phone: "+1 (555) 123-4567",
    email: "info@eduportal.edu",
    established: 1985,
    totalStudents: 1247,
    totalTeachers: 89,
    totalClasses: 42,
  };

  const students: Student[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@student.edu",
      grade: "A",
      gpa: 3.8,
      profileUrl:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@student.edu",
      grade: "B+",
      gpa: 3.5,
      profileUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@student.edu",
      grade: "A-",
      gpa: 3.7,
      profileUrl:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david@student.edu",
      grade: "B",
      gpa: 3.2,
      profileUrl:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "5",
      name: "Emma Brown",
      email: "emma@student.edu",
      grade: "A+",
      gpa: 4.0,
      profileUrl:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
  ];

  const teachers: Teacher[] = [
    {
      id: "1",
      name: "Prof. Michael Chen",
      email: "mchen@eduportal.edu",
      subject: "Mathematics",
      experience: 12,
      profileUrl:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "2",
      name: "Dr. Lisa Anderson",
      email: "landerson@eduportal.edu",
      subject: "Physics",
      experience: 8,
      profileUrl:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "3",
      name: "Ms. Jennifer Taylor",
      email: "jtaylor@eduportal.edu",
      subject: "English Literature",
      experience: 15,
      profileUrl:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      id: "4",
      name: "Mr. Robert Garcia",
      email: "rgarcia@eduportal.edu",
      subject: "Chemistry",
      experience: 10,
      profileUrl:
        "https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
  ];

  const classrooms: Classroom[] = [
    {
      id: "1",
      className: "Advanced Mathematics",
      teacher: "Prof. Michael Chen",
      studentCount: 28,
      averageGrade: 85,
      progress: 78,
      subject: "Mathematics",
    },
    {
      id: "2",
      className: "Quantum Physics",
      teacher: "Dr. Lisa Anderson",
      studentCount: 24,
      averageGrade: 88,
      progress: 82,
      subject: "Physics",
    },
    {
      id: "3",
      className: "Modern Literature",
      teacher: "Ms. Jennifer Taylor",
      studentCount: 32,
      averageGrade: 91,
      progress: 89,
      subject: "English",
    },
    {
      id: "4",
      className: "Organic Chemistry",
      teacher: "Mr. Robert Garcia",
      studentCount: 26,
      averageGrade: 83,
      progress: 75,
      subject: "Chemistry",
    },
    {
      id: "5",
      className: "Calculus II",
      teacher: "Prof. Michael Chen",
      studentCount: 22,
      averageGrade: 87,
      progress: 80,
      subject: "Mathematics",
    },
    {
      id: "6",
      className: "Creative Writing",
      teacher: "Ms. Jennifer Taylor",
      studentCount: 18,
      averageGrade: 93,
      progress: 92,
      subject: "English",
    },
  ];

  // Chart configurations
  const classProgressData = {
    labels: classrooms.map((c) => c.className),
    datasets: [
      {
        label: "Progress %",
        data: classrooms.map((c) => c.progress),
        backgroundColor: "rgba(147, 51, 234, 0.8)",
        borderColor: "rgba(147, 51, 234, 1)",
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: "Average Grade",
        data: classrooms.map((c) => c.averageGrade),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const gradeDistributionData = {
    labels: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"],
    datasets: [
      {
        data: [15, 25, 20, 18, 12, 8, 2, 0],
        backgroundColor: [
          "rgba(147, 51, 234, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(196, 181, 253, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(96, 165, 250, 0.8)",
          "rgba(147, 197, 253, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(74, 222, 128, 0.8)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const monthlyProgressData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Overall Progress",
        data: [65, 72, 78, 81, 85, 88],
        borderColor: "rgba(147, 51, 234, 1)",
        backgroundColor: "rgba(147, 51, 234, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgba(147, 51, 234, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#e5e7eb",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#f3f4f6",
        bodyColor: "#e5e7eb",
        borderColor: "rgba(147, 51, 234, 0.5)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(75, 85, 99, 0.3)",
        },
      },
      y: {
        ticks: {
          color: "#9ca3af",
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(75, 85, 99, 0.3)",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#e5e7eb",
          font: {
            size: 11,
          },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#f3f4f6",
        bodyColor: "#e5e7eb",
        borderColor: "rgba(147, 51, 234, 0.5)",
        borderWidth: 1,
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "students", label: "Students", icon: GraduationCap },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "classes", label: "Classes", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <School className="text-purple-400 mr-3" size={32} />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {schoolInfo.name}
                </h1>
                <p className="text-gray-400">
                  Principal: {schoolInfo.headName}
                </p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-400">
              <p className="flex items-center">
                <MapPin size={16} className="mr-1" /> {schoolInfo.address}
              </p>
              <p className="flex items-center mt-1">
                <Phone size={16} className="mr-1" /> {schoolInfo.phone}
              </p>
              <p className="flex items-center mt-1">
                <Mail size={16} className="mr-1" /> {schoolInfo.email}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Total Students",
                value: schoolInfo.totalStudents,
                icon: GraduationCap,
                color: "purple",
              },
              {
                label: "Total Teachers",
                value: schoolInfo.totalTeachers,
                icon: Users,
                color: "blue",
              },
              {
                label: "Total Classes",
                value: schoolInfo.totalClasses,
                icon: BookOpen,
                color: "pink",
              },
              {
                label: "Established",
                value: schoolInfo.established,
                icon: Calendar,
                color: "green",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <stat.icon className={`text-${stat.color}-400`} size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex mb-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-2"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="mr-2" size={20} />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Class Progress Chart */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="text-purple-400 mr-2" size={24} />
                    <h3 className="text-xl font-semibold">
                      Class Progress Overview
                    </h3>
                  </div>
                  <div className="h-80">
                    <Bar data={classProgressData} options={chartOptions} />
                  </div>
                </div>

                {/* Grade Distribution */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <PieChart className="text-blue-400 mr-2" size={24} />
                    <h3 className="text-xl font-semibold">
                      Grade Distribution
                    </h3>
                  </div>
                  <div className="h-80">
                    <Doughnut
                      data={gradeDistributionData}
                      options={doughnutOptions}
                    />
                  </div>
                </div>

                {/* Monthly Progress */}
                <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center mb-4">
                    <Activity className="text-pink-400 mr-2" size={24} />
                    <h3 className="text-xl font-semibold">
                      Monthly Progress Trend
                    </h3>
                  </div>
                  <div className="h-80">
                    <Line data={monthlyProgressData} options={lineOptions} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "students" && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <GraduationCap className="text-purple-400 mr-2" size={24} />
                    Students Directory
                  </h3>
                  <span className="text-gray-400">
                    {students.length} students
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {students.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300"
                    >
                      <div className="flex items-center mb-3">
                        <img
                          src={
                            student.profileUrl ||
                            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                          }
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-semibold text-white">
                            {student.name}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {student.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="text-yellow-400 mr-1" size={16} />
                          <span className="text-sm">
                            Grade: {student.grade}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Target className="text-green-400 mr-1" size={16} />
                          <span className="text-sm">GPA: {student.gpa}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "teachers" && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center">
                    <Users className="text-blue-400 mr-2" size={24} />
                    Faculty Directory
                  </h3>
                  <span className="text-gray-400">
                    {teachers.length} teachers
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teachers.map((teacher, index) => (
                    <motion.div
                      key={teacher.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <img
                          src={
                            teacher.profileUrl ||
                            "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150"
                          }
                          alt={teacher.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-white text-lg">
                            {teacher.name}
                          </h4>
                          <p className="text-gray-400">{teacher.email}</p>
                          <p className="text-blue-400 text-sm">
                            {teacher.subject}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="text-purple-400 mr-1" size={16} />
                          <span className="text-sm">
                            {teacher.experience} years exp.
                          </span>
                        </div>
                        <ChevronRight className="text-gray-400" size={20} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "classes" && (
              <div className="space-y-6">
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold flex items-center">
                      <BookOpen className="text-pink-400 mr-2" size={24} />
                      Classroom Management
                    </h3>
                    <span className="text-gray-400">
                      {classrooms.length} active classes
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {classrooms.map((classroom, index) => (
                      <motion.div
                        key={classroom.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-pink-500/50 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold text-white text-lg">
                              {classroom.className}
                            </h4>
                            <p className="text-gray-400">{classroom.teacher}</p>
                            <p className="text-pink-400 text-sm">
                              {classroom.subject}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-400">
                              {classroom.studentCount} students
                            </p>
                            <p className="text-sm text-green-400">
                              Avg: {classroom.averageGrade}%
                            </p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">
                              Progress
                            </span>
                            <span className="text-sm text-white">
                              {classroom.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${classroom.progress}%` }}
                              transition={{
                                delay: index * 0.1 + 0.5,
                                duration: 1,
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Award className="text-yellow-400 mr-1" size={16} />
                            <span className="text-sm">
                              Performance:{" "}
                              {classroom.progress > 80
                                ? "Excellent"
                                : classroom.progress > 60
                                ? "Good"
                                : "Needs Improvement"}
                            </span>
                          </div>
                          <ChevronRight className="text-gray-400" size={20} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SchoolDashboard;
