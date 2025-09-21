/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function HeadSignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileUrl: "",
    role: "head",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Submitting:", formData);
      const res = await axios.post(`/api/auth/signup`, {...formData})

      if(res.data.success) {
        toast.success(res.data.message);
        router.push(`/create-school/${res.data.user.id}`)
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-md mx-auto mt-10 bg-gray-900/60 p-8 rounded-2xl shadow-xl border border-gray-700 backdrop-blur"
    >
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8">
        Create Head Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="Ayush Saini"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="head@example.com"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="••••••••"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Profile Image URL (Optional)
          </label>
          <div className="relative">
            <ImageIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="url"
              name="profileUrl"
              value={formData.profileUrl}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              placeholder="https://example.com/profile.jpg"
            />
          </div>

          {formData.profileUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-4 flex justify-center"
            >
              <img
                src={formData.profileUrl}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-purple-500 shadow-lg"
              />
            </motion.div>
          )}
        </motion.div>

        <input type="hidden" name="role" value="head" />

        <motion.button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group shadow-lg shadow-purple-500/25 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? "Creating..." : "Sign Up as Head"}
          {!isLoading && (
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={20}
            />
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
