/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, Trash2, Edit, PlusCircle } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Progress {
  id: string;
  subject: string;
  score: number;
  remarks: string;
  classroom_id: string;
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
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Progress | null>(null);

  const [newSubject, setNewSubject] = useState("");
  const [newScore, setNewScore] = useState<number | "">("");
  const [newRemarks, setNewRemarks] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `/api/get-student-full-detail?profileId=${profileId}`
      );
      if (res.data.success && Array.isArray(res.data.data)) {
        setProgress(res.data.data);
      } else {
        setError("No data found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load student data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [profileId]);

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/progress/delete/${id}`);
      if (res.data.success) {
        setProgress((prev) => prev.filter((p) => p.id !== id));
        toast.success("Record deleted");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record");
    }
  };

  const handleEditSave = async () => {
    if (!editing) return;
    try {
      const res = await axios.patch(`/api/progress/edit`, { ...editing });
      if (res.data.success && res.data.data) {
        setProgress((prev) =>
          prev.map((p) => (p.id === editing.id ? res.data.data : p))
        );
        toast.success(res.data.message || "Progress updated");
        setEditing(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update record");
    }
  };

  const handleAddProgress = async () => {
    if (!newSubject || newScore === "" || !newRemarks) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post(`/api/progress/add`, {
        subject: newSubject,
        score: newScore,
        remarks: newRemarks,
        student_id: profileId,
        classroom_id: progress[0]?.classroom_id,
      });

      if (res.data.success && res.data.data) {
        setProgress((prev) => [...prev, res.data.data]);
        toast.success("Progress added");
        setNewSubject("");
        setNewScore("");
        setNewRemarks("");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add progress");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  const student = progress[0]?.profiles || null;

  if (progress.length === 0 && !loading && !error) {
    return (
      <div className="text-center py-10 space-y-4">
        <p className="text-gray-400 italic">
          First Add the Student Into the class
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 text-white font-semibold shadow-md hover:shadow-gray-500/40"
        >
          Go Back
        </motion.button>
      </div>
    );
  }
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl shadow-lg 
                 bg-black/40 backdrop-blur-lg border border-white/10 text-white"
      >
        {/* Student Details */}
        {student && (
          <div className="flex items-center space-x-4 mb-8">
            <img
              src={student.profileUrl || "/default-avatar.png"}
              alt={student.name}
              className="w-20 h-20 rounded-full border-2 border-pink-500 shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-pink-400 flex items-center gap-2">
                <User className="w-5 h-5" />
                {student.name}
              </h2>
              <p className="text-gray-400">ID: {student.id}</p>
            </div>
          </div>
        )}

        {/* Progress Table */}
        <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" /> Progress Report
        </h3>

        <div className="overflow-x-auto mb-8">
          <table className="w-full border border-white/10 rounded-xl overflow-hidden">
            <thead className="bg-white/5 text-gray-300 text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Marks</th>
                <th className="py-3 px-4 text-left">Remarks</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {progress.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No progress records yet.
                  </td>
                </tr>
              )}
              {progress.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-3 px-4">
                    {editing?.id === p.id ? (
                      <input
                        value={editing.subject}
                        onChange={(e) =>
                          setEditing({ ...editing, subject: e.target.value })
                        }
                        className="bg-black/50 border border-white/20 px-2 py-1 rounded text-white w-full"
                      />
                    ) : (
                      p.subject
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editing?.id === p.id ? (
                      <input
                        type="number"
                        value={editing.score ?? 0}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            score: parseInt(e.target.value),
                          })
                        }
                        className="bg-black/50 border border-white/20 px-2 py-1 rounded text-white w-full"
                      />
                    ) : (
                      p.score
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editing?.id === p.id ? (
                      <input
                        value={editing.remarks}
                        onChange={(e) =>
                          setEditing({ ...editing, remarks: e.target.value })
                        }
                        className="bg-black/50 border border-white/20 px-2 py-1 rounded text-white w-full"
                      />
                    ) : (
                      p.remarks
                    )}
                  </td>
                  <td className="py-3 px-4 text-center flex gap-3 justify-center">
                    {editing?.id === p.id ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleEditSave}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-sm font-semibold"
                      >
                        Save
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditing(p)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-5 h-5" />
                      </motion.button>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(p.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Progress Form */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <h4 className="text-lg font-semibold text-pink-400 mb-3 flex items-center gap-2">
            <PlusCircle className="w-5 h-5" /> Add Progress
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Subject"
              className="bg-black/50 border border-white/20 px-3 py-2 rounded-lg text-white placeholder-gray-500"
            />
            <input
              type="number"
              value={newScore}
              onChange={(e) => setNewScore(parseInt(e.target.value))}
              placeholder="Marks"
              className="bg-black/50 border border-white/20 px-3 py-2 rounded-lg text-white placeholder-gray-500"
            />
            <input
              type="text"
              value={newRemarks}
              onChange={(e) => setNewRemarks(e.target.value)}
              placeholder="Remarks"
              className="bg-black/50 border border-white/20 px-3 py-2 rounded-lg text-white placeholder-gray-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddProgress}
            className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 font-semibold text-white"
          >
            Add Progress
          </motion.button>
        </div>
      </motion.div>
    );
}
