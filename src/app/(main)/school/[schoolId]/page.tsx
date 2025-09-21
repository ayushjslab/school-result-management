/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  School,
  Users,
  GraduationCap,
  User,
  MapPin,
  Phone,
  Mail,
  ImageOff,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Classroom {
  id: string;
  name: string;
  created_at?: string;
  teacher_id: string | null;
}

interface Profile {
  id: string;
  name: string;
  role: string;
  profileUrl: string | null;
  created_at?: string;
}

interface SchoolType {
  id: string;
  name: string;
  email: string | null;
  location: string | null;
  phone: string | null;
  logoUrl: string | null;
  bannerUrl: string | null;
  classrooms: Classroom[];
  profiles: Profile[];
}

export default function SchoolPage() {
  const [schoolData, setSchoolData] = useState<SchoolType | null>(null);
  const [loading, setLoading] = useState(true);

  const { schoolId } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchSchool() {
      try {
        const res = await fetch(`/api/fetch-school?schoolId=${schoolId}`);
        if (!res.ok) throw new Error("Failed to fetch school data");

        const json = await res.json();
        if (json.success) {
          setSchoolData(json.data);
        } else {
          setSchoolData(null);
        }
      } catch (err) {
        console.error("Error fetching school:", err);
        setSchoolData(null);
      } finally {
        setLoading(false);
      }
    }
    if (schoolId) fetchSchool();
  }, [schoolId]);


  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-400 bg-black">
        Loading school details...
      </div>
    );
  }

  if (!schoolData) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-400 bg-black">
        School not found
      </div>
    );
  }

  const heads = schoolData.profiles.filter((p) => p.role === "head");
  const teachers = schoolData.profiles.filter((p) => p.role === "teacher");
  const students = schoolData.profiles.filter((p) => p.role === "student");

  return (
    <div className="bg-black min-h-screen text-gray-100">
      {/* Banner */}
      <div className="relative w-full h-60 bg-gray-800">
        {schoolData.bannerUrl ? (
          <img
            src={schoolData.bannerUrl}
            alt="School Banner"
            className="w-full h-60 object-cover"
          />
        ) : (
          <div className="w-full h-60 flex items-center justify-center bg-gray-800 text-gray-500">
            <ImageOff className="w-8 h-8 mr-2" /> No Banner Image
          </div>
        )}
        {/* Logo */}
        <div className="absolute -bottom-12 left-8">
          {schoolData.logoUrl ? (
            <img
              src={schoolData.logoUrl}
              alt="School Logo"
              className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-lg object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-lg flex items-center justify-center bg-gray-700 text-gray-400">
              <School className="w-8 h-8" />
            </div>
          )}
        </div>
      </div>

      {/* School Info */}
      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-100">{schoolData.name}</h1>
        <div className="flex items-center space-x-6 mt-2 text-gray-400 flex-wrap">
          {schoolData.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{schoolData.location}</span>
            </div>
          )}
          {schoolData.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{schoolData.phone}</span>
            </div>
          )}
          {schoolData.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{schoolData.email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="School Head"
          value={heads.length}
          icon={<User className="w-8 h-8 text-purple-400" />}
          color="purple"
        />
        <StatCard
          title="Teachers"
          value={teachers.length}
          icon={<GraduationCap className="w-8 h-8 text-blue-400" />}
          color="blue"
        />
        <StatCard
          title="Students"
          value={students.length}
          icon={<Users className="w-8 h-8 text-green-400" />}
          color="green"
        />
        <StatCard
          title="Classrooms"
          value={schoolData.classrooms.length}
          icon={<School className="w-8 h-8 text-orange-400" />}
          color="orange"
        />
      </div>

      {/* Classrooms */}
      <Section
        title="Classrooms"
        icon={<School className="w-6 h-6 text-orange-400" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schoolData.classrooms.map((c) => (
            <div
              key={c.id}
              className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:shadow-lg cursor-pointer"
              onClick={() => router.push(`/classroom/${c.id}`)}
            >
              <h3 className="font-semibold text-gray-100">{c.name}</h3>
              <p className="text-sm text-gray-400 mt-1">
                Created: {formatDate(c.created_at)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Heads */}
      {heads.length > 0 && (
        <ProfilesSection
          title="School Leadership"
          profiles={heads}
          color="purple"
        />
      )}

      {/* Teachers */}
      {teachers.length > 0 ? (
        <ProfilesSection
          title={`Teachers (${teachers.length})`}
          profiles={teachers}
          color="blue"
        />
      ) : (
        <EmptyState
          title="No Teachers Yet"
          description="Teachers will appear here once they join the school."
          icon={<GraduationCap className="w-12 h-12 text-gray-500 mx-auto" />}
        />
      )}

      {/* Students */}
      {students.length > 0 && (
        <ProfilesSection
          title={`Students (${students.length})`}
          profiles={students}
          color="green"
        />
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className={`bg-gray-900 rounded-xl shadow-md p-6 border-l-4 border-${color}-400`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-100">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-950 rounded-xl shadow-md mb-8 border border-gray-800">
      <div className="px-6 py-4 border-b border-gray-800 flex items-center space-x-2">
        {icon}
        <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function ProfilesSection({
  title,
  profiles,
  color,
}: {
  title: string;
  profiles: Profile[];
  color: string;
}) {
  return (
    <Section
      title={title}
      icon={<User className={`w-6 h-6 text-${color}-400`} />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((p) => (
          <div
            key={p.id}
            className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={p.profileUrl || "/placeholder.png"}
                alt={p.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-gray-800 shadow-md"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-100">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Joined:{" "}
                  {p.created_at
                    ? new Date(p.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-md p-8 text-center border border-gray-700">
      {icon}
      <h3 className="text-lg font-medium text-gray-100 mt-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
