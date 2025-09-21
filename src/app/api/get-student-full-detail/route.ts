/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profileId = req.nextUrl.searchParams.get("profileId");

    if (!profileId) {
      return NextResponse.json(
        { success: false, message: "profileId is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("progress")
      .select(
        `
        id,
        subject,
        classroom_id,
        score,
        remarks,
        student_id,
        profiles:student_id (
          id,
          name,
          profileUrl
        )
      `
      )
      .eq("student_id", profileId);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
