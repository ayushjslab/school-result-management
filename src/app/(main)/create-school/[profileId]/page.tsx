/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import { CiImageOn } from "react-icons/ci";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
export default function SchoolForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    bannerUrl: "",
    logoUrl: "",
  });

  const { profileId } = useParams(); 
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
        setLoading(true);
      const res = await axios.post(`/api/school/${profileId}/create`, {...formData});
      if (res.data.success) {
        toast.success(res.data.message);
        router.push(`/school/${res.data.school.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-6 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <motion.div
        className="relative grid lg:grid-cols-2 gap-10 bg-gray-900/40 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl w-full max-w-6xl p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Create Your School
          </h2>

          {[
            {
              label: "School Name",
              name: "name",
              placeholder: "Oxford International School",
              icon: <Building2 size={20} className="text-gray-400" />,
            },
            {
              label: "Location",
              name: "location",
              placeholder: "New Delhi, India",
              icon: <MapPin size={20} className="text-gray-400" />,
            },
            {
              label: "Phone Number",
              name: "phone",
              placeholder: "+91 9876543210",
              icon: <Phone size={20} className="text-gray-400" />,
            },
            {
              label: "Email",
              name: "email",
              placeholder: "contact@oxfordschool.com",
              icon: <Mail size={20} className="text-gray-400" />,
            },
            {
              label: "Banner Image URL",
              name: "bannerUrl",
              placeholder: "https://example.com/banner.jpg",
              icon: <CiImageOn size={20} className="text-gray-400" />,
            },
            {
              label: "Logo Image URL",
              name: "logoUrl",
              placeholder: "https://example.com/logo.png",
              icon: <CiImageOn size={20} className="text-gray-400" />,
            },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  {field.icon}
                </span>
                <input
                  type={field.name.includes("Url") ? "url" : "text"}
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                />
              </div>
            </div>
          ))}

          <motion.button
            type="button"
            className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 
                 hover:from-purple-600 hover:to-blue-600 text-white font-semibold 
                 py-3 px-6 rounded-xl transition-all duration-300 
                 flex items-center justify-center gap-2 
                 shadow-lg shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
              
                Creating...
              </>
            ) : (
              <>🚀 Create School</>
            )}
          </motion.button>
        </motion.div>

        <motion.div
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex flex-col justify-center shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <img
              src={
                formData.bannerUrl ||
                "https://img.freepik.com/free-vector/back-school-cover-illustration-with-education-elements_47987-23351.jpg?semt=ais_incoming&w=740&q=80"
              }
              alt="Banner"
              className="w-full h-40 object-cover rounded-xl border border-gray-700"
            />
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
              <img
                src={
                  formData.logoUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSctwKxKYDXbUdnmAZTmqCNiKK-QRhGtFPOj3pTLFVoqQw2rY63TiS4_qReDlnFzaSQ6n8&usqp=CAU"
                }
                alt="Logo"
                className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-lg object-cover"
              />
            </div>
          </div>

          <div className="mt-14 text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">
              {formData.name || "Your School Name"}
            </h3>
            <p className="text-gray-400 flex items-center justify-center gap-2">
              <MapPin size={16} /> {formData.location || "Location"}
            </p>
            <p className="text-gray-400 flex items-center justify-center gap-2">
              <Phone size={16} /> {formData.phone || "Phone Number"}
            </p>
            <p className="text-gray-400 flex items-center justify-center gap-2">
              <Mail size={16} /> {formData.email || "Email Address"}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
