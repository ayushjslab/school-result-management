import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const classroomId = req.nextUrl.searchParams.get("classroomId");
  const { data, error } = await supabase
    .from("progress")
    .select(
      `
    id,
    classroom_id,
    profiles:student_id (
      id,
      name,
      profileUrl
    )
  `
    )
    .eq("classroom_id", classroomId);

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
        data: data.map((row) => row.profiles),
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
