/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Award, ClipboardList} from "lucide-react";
import { Home } from "lucide-react";

interface Progress {
  id: string;
  subject: string;
  classroom_id: string;
  score: number;
  remarks: string;
  profiles: {
    id: string;
    name: string;
    profileUrl: string | null;
  };
}

export default function StudentProgressPage() {
  const { profileId } = useParams();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function fetchProgress() {
    try {
      setLoading(true);
      const res = await axios.get(`/api/get-student-full-detail?profileId=${profileId}`);
      if (res.data.success) {
        setProgress(res.data.data);
      } else {
        setError(res.data.message || "Failed to fetch progress");
      }
    } catch (err) {
      console.log(err)
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (profileId) fetchProgress();
  }, [profileId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-gray-200">
        <p className="animate-pulse text-lg">Loading progress...</p>
      </div>
    );
  }

  if (error || progress.length === 0) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-black text-red-400">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95, y: 0 }}
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl 
                 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                 text-white font-semibold shadow-lg hover:shadow-xl
                 transition-all duration-300"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </motion.button>
        <p>{error || "No progress data found."}</p>
      </div>
    );
  }

  const student = progress[0]?.profiles;

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <img
            src={
              student?.profileUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                student?.name || "Student"
              )}`
            }
            alt={student?.name}
            className="w-32 h-32 mx-auto rounded-full border-4 border-purple-600 shadow-lg"
          />
          <h1 className="text-4xl font-extrabold mt-4">{student?.name}</h1>
          <p className="text-gray-400 mt-2">Student Progress Overview</p>
        </motion.div>

        {/* Progress Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {progress.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700 hover:border-purple-500 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  {p.subject}
                </h2>
                <Award className="w-6 h-6 text-yellow-400" />
              </div>

              <p className="text-gray-300 mb-2">
                <span className="font-semibold">Classroom:</span>{" "}
                {p.classroom_id.slice(0, 8)}
              </p>
              <p className="text-lg font-bold text-green-400">
                Score: {p.score}%
              </p>
              <div className="mt-3 flex items-center gap-2 text-gray-400">
                <ClipboardList className="w-5 h-5 text-blue-400" />
                <span>{p.remarks || "No remarks"}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
