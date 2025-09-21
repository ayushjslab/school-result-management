/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(req: NextRequest) {
  try {
    const { student_id, classroom_id } = await req.json();

    if (!student_id || !classroom_id) {
      return NextResponse.json(
        {
          success: false,
          message: "student_id and classroom_id are required",
        },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("progress")
      .delete()
      .eq("student_id", student_id)
      .eq("classroom_id", classroom_id);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Student removed from classroom successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
