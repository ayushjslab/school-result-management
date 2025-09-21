/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/classrooms/add-student/[classroomId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ classroomId: string }> }
) {
  try {
    const { classroomId } = await params;
    const { student_id } = await req.json();

    if (!classroomId || !student_id) {
      return NextResponse.json(
        { success: false, message: "classroom_id and student_id are required" },
        { status: 400 }
      );
    }

    const { data: student, error: studentError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", student_id)
      .single();

    if (studentError || !student) {
      return NextResponse.json(
        { success: false, message: "Student not found in profiles" },
        { status: 404 }
      );
    }

    const { data: existing, error: checkError } = await supabase
      .from("progress")
      .select("id, classroom_id")
      .eq("student_id", student_id);

    if (checkError) throw checkError;

    if (existing && existing.length > 0) {
      const sameClass = existing.some(
        (record) => record.classroom_id === classroomId
      );

      if (sameClass) {
        return NextResponse.json(
          {
            success: false,
            message: "Student already has progress in this class",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: false, message: "You are already in another class" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("progress")
      .insert([
        {
          student_id,
          classroom_id: classroomId,
          subject: "Default Subject",
          score: 0,
          remarks: "Not graded yet",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Default progress created successfully",
      data,
    });
  } catch (error: any) {
    console.error("POST /progress error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
}
