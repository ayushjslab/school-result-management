/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { supabase } from "@/lib/supabase";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: NextRequest) {
  try {
    const { name, teacher_id } = await req.json();

    if (!name || !teacher_id) {
      return NextResponse.json(
        {
          message: "Classroom name and teacher_id are required",
          success: false,
        },
        { status: 400 }
      );
    }

    // 1. Check token
    const token = (await cookies()).get("auth-token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "User is not authenticated", success: false },
        { status: 401 }
      );
    }

    // 2. Decode token
    let decoded: { id: string; email: string };
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired token", success: false },
        { status: 401 }
      );
    }

    // 3. Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, role, school_id")
      .eq("id", decoded.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { message: "Profile not found", success: false },
        { status: 404 }
      );
    }

    if (profile.role !== "head") {
      return NextResponse.json(
        {
          message: "You are not authorized to create classrooms",
          success: false,
        },
        { status: 403 }
      );
    }

    // 4. Create classroom
    const { data: newClassroom, error: classroomError } = await supabase
      .from("classrooms")
      .insert([{ name, school_id: profile.school_id, teacher_id }])
      .select()
      .single();

    if (classroomError || !newClassroom) {
      return NextResponse.json(
        {
          message: classroomError?.message || "Failed to create classroom",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Classroom created successfully",
        success: true,
        classroom: newClassroom,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating classroom:", error.message || error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
