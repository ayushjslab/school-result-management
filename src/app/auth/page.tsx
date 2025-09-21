/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  GraduationCap,
  School,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CiImageOn } from "react-icons/ci";

interface ISchool {
  id: string;
  name: string;
}

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [schoolData, setSchoolData] = useState<ISchool[] | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    school: "",
    profileUrl: "",
  });

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log("Form submitted:", formData);
      if (isSignUp) {
        const res = await axios.post(`/api/auth/signup`, { ...formData, school_id: formData.school });
        if (res.data.success) {
          toast.success(res.data.message);
        }
         router.push(`/school/${res.data.schoolId}`);
      } else {
        const res = await axios.post(`/api/auth/signin`, {
          email: formData.email,
          password: formData.password,
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }
        router.push(`/school/${res.data.schoolId}`)
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal server error");
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchAllSchools() {
    try {
      const res = await axios.get(`/api/school/fetch-all`);

      if (res.data.success) {
        setSchoolData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllSchools();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-xl"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-purple-400 mr-2" size={32} />
            <h1 className="text-3xl font-bold text-white">EduPortal</h1>
          </div>
          <p className="text-gray-400">Welcome to the future of education</p>
        </motion.div>

        <motion.div
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex mb-8 bg-gray-800/50 rounded-xl p-1">
            <motion.button
              disabled={isLoading}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                !isSignUp
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isLoading && setIsSignUp(false)}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              Sign In
            </motion.button>

            <motion.button
              disabled={isLoading}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isSignUp
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => !isLoading && setIsSignUp(true)}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              Sign Up
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? "signup" : "signin"}
                initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <>
                    {/* Role Selection */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Role
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.label
                          className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all duration-300 ${
                            formData.role === "student"
                              ? "border-purple-500 bg-purple-500/20 text-purple-300"
                              : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="role"
                            value="student"
                            checked={formData.role === "student"}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <GraduationCap className="mr-2" size={20} />
                          Student
                        </motion.label>

                        <motion.label
                          className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all duration-300 ${
                            formData.role === "teacher"
                              ? "border-purple-500 bg-purple-500/20 text-purple-300"
                              : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600"
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name="role"
                            value="teacher"
                            checked={formData.role === "teacher"}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <User className="mr-2" size={20} />
                          Teacher
                        </motion.label>
                      </div>
                    </motion.div>

                    {/* Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </motion.div>

                    {/* School */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        School
                      </label>
                      <div className="relative">
                        <School
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <select
                          name="school"
                          value={formData.school}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 appearance-none"
                          required
                        >
                          <option value="">Select your school</option>
                          {schoolData &&
                            schoolData.map((school) => (
                              <option
                                key={school.id}
                                value={school.id}
                                className="bg-gray-800"
                              >
                                {school.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </motion.div>

                    {/* Profile Image URL */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Profile Image URL (Optional)
                      </label>
                      <div className="relative">
                        <CiImageOn
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="url"
                          name="profileUrl"
                          value={formData.profileUrl}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="https://example.com/profile.jpg"
                        />
                      </div>
                      {/* Preview section */}
                      {formData.profileUrl && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-400 mb-2">Preview:</p>
                          <img
                            src={formData.profileUrl}
                            alt="Profile preview"
                            className="w-20 h-20 rounded-full object-cover border border-gray-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display =
                                "none";
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg shadow-purple-500/25 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  {isSignUp ? "Create Account" : "Sign In"}
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            className="mt-6 text-center text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Sign in here
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Sign up here
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AuthPage;
