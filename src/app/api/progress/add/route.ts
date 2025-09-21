import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { student_id, classroom_id, subject, score, remarks } =
      await req.json();

    if (!student_id || !classroom_id || !subject || !score || !remarks) {
      return NextResponse.json(
        {
          message: "Please provide all required fields",
          success: false,
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("progress")
      .insert([{ student_id, classroom_id, subject, score, remarks }])
      .select("id, subject, score, remarks, profiles(id, name, profileUrl)")
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          message: error?.message || "Failed to create progress",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Progress created successfully",
        success: true,
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating progress:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
