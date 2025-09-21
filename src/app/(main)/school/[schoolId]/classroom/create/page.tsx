/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, Fragment } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import { toast } from "sonner";

interface Teacher {
  id: string;
  name: string;
  profileUrl: string;
}

export default function CreateClassroomForm() {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { schoolId } = useParams();

  useEffect(() => {
    async function fetchAllTeachers() {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`/api/fetch-teachers?schoolId=${schoolId}`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setTeachers(res.data.data);
        } else {
          setError("No teachers found.");
          setTeachers([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load teachers. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchAllTeachers();
  }, [schoolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, teacher });
    try {
      setLoading(true)
      const res = await axios.post(`/api/classrooms/create`, {
        name,
        teacher_id: teacher?.id,
      });
      if(res.data.success) {
        toast.success(res.data.message)
        router.push(`/school/${schoolId}`)
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error")
    }finally{
      setLoading(false)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center
                 bg-black/40 backdrop-blur-lg border border-white/10"
    >
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.history.back()}
        className="flex items-center justify-center gap-2 px-6 py-2 rounded-2xl
                 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500
                 text-white font-semibold shadow-lg hover:shadow-xl
                 focus:outline-none focus:ring-2 focus:ring-sky-300
                 transition-all duration-300 mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Go Back
      </motion.button>
      <h2 className="text-2xl font-bold text-pink-400 mb-6 text-center">
        Create Classroom
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-300 text-sm mb-2">
            Classroom Name
          </label>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            <BookOpen className="w-5 h-5 text-blue-400 mr-2" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter classroom name"
              className="w-full bg-transparent outline-none text-white placeholder-gray-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">
            Assign Teacher
          </label>
          <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <Listbox value={teacher} onChange={setTeacher}>
              <div className="relative">
                <Listbox.Button className="flex items-center w-full bg-transparent text-white text-left">
                  {teacher ? (
                    <div className="flex items-center gap-3">
                      <img
                        src={teacher.profileUrl}
                        alt={teacher.name}
                        className="w-8 h-8 rounded-full border border-white/20"
                      />
                      <span>{teacher.name}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">
                      {loading
                        ? "Loading teachers..."
                        : teachers.length === 0
                        ? "No teachers available"
                        : "Select a teacher"}
                    </span>
                  )}
                </Listbox.Button>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-black/90 backdrop-blur-md border border-white/10 shadow-lg z-50">
                    {teachers.map((t, idx) => (
                      <Listbox.Option
                        key={idx}
                        value={t}
                        className={({ active }) =>
                          `cursor-pointer select-none relative px-4 py-2 flex items-center gap-3 ${
                            active
                              ? "bg-pink-500/20 text-white"
                              : "text-gray-300"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <img
                              src={t.profileUrl}
                              alt={t.name}
                              className="w-8 h-8 rounded-full border border-white/20"
                            />
                            <span>{t.name}</span>
                            {selected && (
                              <Check className="w-4 h-4 text-pink-400 ml-auto" />
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 
                     text-white font-semibold shadow-lg hover:shadow-pink-500/40 
                     transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Please wait..." : "Create Classroom"}
        </motion.button>
      </form>
    </motion.div>
  );
}
