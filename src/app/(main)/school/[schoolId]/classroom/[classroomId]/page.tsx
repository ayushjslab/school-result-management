/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen, User, Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Profile {
  id: string;
  name: string;
  role: string;
  profileUrl: string | null;
}

interface ClassroomData {
  id: string;
  name: string;
  teacher: Profile;
  progress: { profiles: Profile }[];
}

export default function ClassroomPage() {
  const [classroomData, setClassroomData] = useState<ClassroomData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { classroomId, schoolId } = useParams();

  async function fetchClassRoomData() {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/classrooms/get-classroom/?classroomId=${classroomId}`
      );
      if (res.data.success) {
        setClassroomData(res.data.data);
      } else {
        setError(res.data.message || "Failed to fetch classroom");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching classroom data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (classroomId) fetchClassRoomData();
  }, [classroomId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-gray-200">
        <p className="animate-pulse text-lg">Loading classroom...</p>
      </div>
    );
  }

  if (error || !classroomData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-400">
        <p>{error || "Classroom not found"}</p>
      </div>
    );
  }

  // ✅ Ensure unique students
  const students = Array.from(
    new Map(
      (classroomData.progress?.map((p) => p.profiles) || []).map((profile) => [
        profile.id,
        profile,
      ])
    ).values()
  );

  return (
    <div className="bg-black min-h-screen text-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Classroom Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 
                     rounded-3xl shadow-2xl p-12 text-center border border-white/10"
        >
          <BookOpen className="w-16 h-16 mx-auto text-purple-300 mb-4" />
          <h1 className="text-5xl font-extrabold text-white">
            {classroomData.name}
          </h1>
          <p className="text-gray-400 mt-3 text-lg tracking-wide">
            Classroom Overview
          </p>
        </motion.div>

        {/* Teacher Card */}
        {classroomData.teacher && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg p-8 
                       flex flex-col sm:flex-row items-center gap-8 border border-white/10
                       hover:border-purple-400/40 transition"
          >
            <img
              src={
                classroomData.teacher.profileUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  classroomData.teacher.name || "Teacher"
                )}`
              }
              alt={classroomData.teacher.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 shadow-lg"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-white">
                {classroomData.teacher.name}
              </h2>
              <p className="text-purple-400 text-lg mt-1">Class Teacher</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 text-gray-400">
                <User className="w-5 h-5 text-blue-400" />
                <span className="text-sm capitalize">
                  {classroomData.teacher.role}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Students Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Users className="w-7 h-7 text-green-400" />
              <h2 className="text-3xl font-bold">Students</h2>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                router.push(
                  `/school/${schoolId}/classroom/${classroomId}/add-student`
                )
              }
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 
                         text-white font-semibold shadow-md hover:shadow-blue-500/40 
                         transition"
            >
              + Add Student
            </motion.button>
          </div>

          {students.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {students.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center 
                             border border-white/10 hover:border-green-400/40 transition shadow-md"
                >
                  <img
                    src={
                      student.profileUrl ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        student.name || "Student"
                      )}`
                    }
                    alt={student.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-gray-700 shadow"
                  />
                  <h3 className="mt-4 text-lg font-semibold">{student.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    ID: {student.id ? student.id.slice(0, 8) : "N/A"}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center italic">
              No students found in this class.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
