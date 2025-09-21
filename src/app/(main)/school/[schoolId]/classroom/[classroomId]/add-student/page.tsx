/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { UserPlus, UserMinus } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  name: string;
  profileUrl: string | null;
  role: string;
}

export default function AddStudentsPage() {
  const { classroomId, schoolId } = useParams();
  const [students, setStudents] = useState<Profile[]>([]);
  const [classStudents, setClassStudents] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch all students
  async function fetchStudents() {
    try {
      setLoading(true);
      const res = await axios.get(`/api/get-students-of-same-school?schoolId=${schoolId}`);
      const classroomRes = await axios.get(
        `/api/classrooms/get-classroom/?classroomId=${classroomId}`
      );

      if (res.data.success && classroomRes.data.success) {
        setStudents(res.data.data || []);
        const enrolled = classroomRes.data.data.progress.map(
          (p: any) => p.profiles.id
        );
        setClassStudents(new Set(enrolled));
      } else {
        toast.error("Failed to fetch students");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching students");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (classroomId) fetchStudents();
  }, [classroomId]);

  // Add student
  async function handleAdd(studentId: string) {
    try {
      const res = await axios.post(
        `/api/classrooms/add-student/${classroomId}`,
        {
          student_id: studentId,
        }
      );
      if (res.data.success) {
        toast.success("Student added!");
        fetchStudents();
      } else {
        toast.error(res.data.message || "Failed to add student");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding student");
    }
  }

  // Remove student
  async function handleRemove(studentId: string) {
    try {
      const res = await axios.delete(`/api/classrooms/remove-student`, {
        data: {
          student_id: studentId,
          classroom_id: classroomId,
        },
      });
      if (res.data.success) {
        toast.success("Student removed!");
        fetchStudents();
      } else {
        toast.error(res.data.message || "Failed to remove student");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error removing student");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-gray-200">
        <p className="animate-pulse text-lg">Loading students...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Manage Students</h1>
        {students.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {students.map((student, index) => {
              const isEnrolled = classStudents.has(student.id);
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-center border border-gray-800 hover:border-purple-500 transition shadow-md"
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
                    ID: {student.id.slice(0, 8)}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      isEnrolled
                        ? handleRemove(student.id)
                        : handleAdd(student.id)
                    }
                    className={`mt-4 px-5 py-2 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-md transition ${
                      isEnrolled
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {isEnrolled ? (
                      <>
                        <UserMinus className="w-5 h-5" /> Remove
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" /> Add
                      </>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-center italic">No students found.</p>
        )}
      </div>
    </div>
  );
}
