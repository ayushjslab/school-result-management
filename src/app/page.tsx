"use client"

import React, { useEffect } from 'react'
import { supabase } from "@/lib/supabase";

const HomePage = () => {

  async function getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) console.error("Error getting session:", error);
    console.log("Current session:", session);
    return session;
  }

  useEffect(() => {
    getSession();
  },[])
  return (
    <div>
      
    </div>
  )
}

export default HomePage
