/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  School,
  Users,
  GraduationCap,
  TrendingUp,
  Award,
  Globe,
  Shield,
  Zap,
  Heart,
  Star,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  Sparkles,
  Target,
  BarChart3,
  UserPlus,
  Building,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Profile {
  id: string;
  name: string;
  profileUrl: string | null;
  school_id: string;
  role: string;
}

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const [user, setUser] = useState<Profile | null>(null);
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track student progress with comprehensive analytics and detailed performance insights.",
      color: "purple",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description:
        "Connect teachers, students, and administrators in one unified platform.",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Enterprise-grade security ensuring your educational data stays protected.",
      color: "green",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized performance for seamless learning experiences across all devices.",
      color: "yellow",
    },
    {
      icon: Globe,
      title: "Global Access",
      description:
        "Access your educational content from anywhere, anytime, on any device.",
      color: "pink",
    },
    {
      icon: Award,
      title: "Achievement Tracking",
      description:
        "Gamified learning with badges, certificates, and milestone celebrations.",
      color: "indigo",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Students", icon: GraduationCap },
    { number: "2.5K+", label: "Expert Teachers", icon: Users },
    { number: "500+", label: "Partner Schools", icon: School },
    { number: "98%", label: "Success Rate", icon: TrendingUp },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal, Westfield Academy",
      content:
        "EduPortal transformed our school management. The analytics help us make data-driven decisions.",
      avatar:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
    },
    {
      name: "Prof. Michael Chen",
      role: "Mathematics Teacher",
      content:
        "The platform makes teaching interactive and engaging. My students love the progress tracking.",
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Student, Grade 12",
      content:
        "I can track my progress and connect with teachers easily. It made learning so much better!",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
    },
  ];

  async function fetchUserData() {
    try {
      const res = await axios.get("/api/authorization"); // server checks cookie + JWT

      if (res.data.success) {
        setUser(res.data.profile);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-6 lg:px-12"
        >
          <div className="flex items-center">
            <Sparkles className="text-purple-400 mr-2" size={32} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              EduPortal
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Testimonials
            </a>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => router.push(`/student-profile/${user.id}`)}
                  >
                    <img
                      src={
                        user.profileUrl ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name || "User"
                        )}`
                      }
                      alt={user.name}
                      className="w-10 h-10 rounded-full border border-purple-500"
                    />
                    <span className="text-gray-200 font-medium">
                      {user.name}
                    </span>
                  </motion.div>

                  {user.role !== "student" && (
                    <motion.button
                      onClick={async () => {
                        router.push(`/school/${user.school_id}`);
                      }}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-5 py-2 rounded-xl font-semibold transition-all duration-300 text-white"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Dashboard
                    </motion.button>
                  )}
                  <motion.button
                    onClick={async () => {
                      await axios.post("/api/logout");
                      setUser(null);
                      router.push("/auth");
                    }}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 px-5 py-2 rounded-xl font-semibold transition-all duration-300 text-white"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => router.push("/auth")}
                    className="text-gray-300 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sign In
                  </motion.button>

                  <motion.button
                    onClick={() => router.push("/auth")}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 py-2 rounded-xl font-semibold transition-all duration-300 text-white"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </motion.nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 p-6"
          >
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Testimonials
              </a>
              <button
                onClick={() => router.push("/auth")}
                className="text-left text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push("/auth")}
                className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-2 rounded-xl font-semibold text-left"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}

        {/* Hero Section */}
        <section className="px-6 lg:px-12 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              The Future of Education is Here
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Empower your educational journey with our comprehensive platform
              designed for students, teachers, and schools worldwide.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                onClick={() => router.push("/create-school")}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8 py-4 rounded-xl font-semibold text-lg flex items-center group shadow-lg shadow-purple-500/25"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Building className="mr-2" size={24} />
                Create Your School
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </motion.button>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => router.push("/auth")}
                  className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-purple-500/50 px-6 py-4 rounded-xl font-semibold flex items-center transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GraduationCap className="mr-2" size={20} />
                  Join as Student
                </motion.button>

                <motion.button
                  onClick={() => router.push("/auth")}
                  className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-blue-500/50 px-6 py-4 rounded-xl font-semibold flex items-center transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Users className="mr-2" size={20} />
                  Join as Teacher
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="px-6 lg:px-12 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center bg-gray-900/30 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
                >
                  <stat.icon
                    className="text-purple-400 mx-auto mb-4"
                    size={32}
                  />
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 lg:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to create, manage, and excel in your
                educational journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 group"
                  whileHover={{ y: -5 }}
                >
                  <feature.icon
                    className={`text-${feature.color}-400 mb-4 group-hover:scale-110 transition-transform`}
                    size={40}
                  />
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-6 lg:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Revolutionizing Education
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  EduPortal is more than just a learning management system.
                  We&apos;re building the future of education with cutting-edge
                  technology, intuitive design, and a deep understanding of how
                  learning happens.
                </p>
                <div className="space-y-4">
                  {[
                    "AI-powered personalized learning paths",
                    "Real-time collaboration tools",
                    "Comprehensive progress analytics",
                    "Mobile-first responsive design",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <CheckCircle className="text-green-400 mr-3" size={20} />
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-xl border border-gray-800">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 rounded-2xl p-6 text-center">
                      <Target
                        className="text-purple-400 mx-auto mb-3"
                        size={32}
                      />
                      <div className="text-2xl font-bold text-white">99.9%</div>
                      <div className="text-gray-400 text-sm">Uptime</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-2xl p-6 text-center">
                      <Heart className="text-pink-400 mx-auto mb-3" size={32} />
                      <div className="text-2xl font-bold text-white">4.9/5</div>
                      <div className="text-gray-400 text-sm">User Rating</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-2xl p-6 text-center">
                      <Zap className="text-yellow-400 mx-auto mb-3" size={32} />
                      <div className="text-2xl font-bold text-white">50ms</div>
                      <div className="text-gray-400 text-sm">Response Time</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-2xl p-6 text-center">
                      <Globe className="text-blue-400 mx-auto mb-3" size={32} />
                      <div className="text-2xl font-bold text-white">150+</div>
                      <div className="text-gray-400 text-sm">Countries</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="px-6 lg:px-12 py-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-300">
                Join thousands of educators and students who trust EduPortal
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-current"
                        size={20}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 lg:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-gray-800 rounded-3xl p-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the educational revolution and create meaningful learning
              experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={() => router.push("/head-signup")}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center group shadow-lg shadow-purple-500/25"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Building className="mr-2" size={24} />
                Start Your School
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </motion.button>
              <motion.button
                onClick={() => router.push("signup")}
                className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-purple-500/50 px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus className="mr-2" size={24} />
                Join Now
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="px-6 lg:px-12 py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Sparkles className="text-purple-400 mr-2" size={24} />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  EduPortal
                </span>
              </div>
              <div className="text-gray-400 text-center md:text-right">
                <p>&copy; 2025 EduPortal. All rights reserved.</p>
                <p className="text-sm mt-1">Empowering education worldwide</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
