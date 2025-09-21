/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SchoolLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  async function isAuthorized() {
    try {
      const res = await axios.get("/api/authorization"); 

      if (res.data.success) {
        const role = res.data.profile?.role;

        if (role === "student") {
          router.replace(`/student-profile/${res.data.profile.id}`);
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      router.replace("/");
    }
  }

  useEffect(() => {
    isAuthorized();
  }, [isAuthorized]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300 bg-black">
        <p className="animate-pulse">Checking authorization...</p>
      </div>
    );
  }

  return <>{children}</>;
}
