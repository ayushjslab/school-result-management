import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const schoolId = req.nextUrl.searchParams.get("schoolId");

    const { data, error } = await supabase
      .from("profiles")
      .select(
        `id,name,
        profileUrl
  `
      )
      .eq("school_id", schoolId)
      .eq("role", "teacher");

    if (error) {
      return NextResponse.json(
        {
          message: error.message || "Something is wrong",
          success: false,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "All data fetched",
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
