import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const classroomId = req.nextUrl.searchParams.get("classroomId");
    const { data, error } = await supabase
      .from("classrooms")
      .select(
        `
    id,
    name,

    teacher:profiles!classrooms_teacher_id_fkey (
      id, name, profileUrl, role
    ),

    progress (
      profiles (
        id, name, profileUrl, role
      )
    )
  `
      )
      .eq("id", classroomId)
      .single();


    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error?.message,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Data fetched successfully",
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
