"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const MainLayoutPage = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  async function checkAuthentication() {
    try {
      const res = await axios.get("/api/authorization");
      if (res.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/auth");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      router.replace("/auth");
    }
  }

  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated === null) {
    // Loading state
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <div>{children}</div>;
};

export default MainLayoutPage;
