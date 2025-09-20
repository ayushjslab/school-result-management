import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ profileId: string }> }
) {
  try {
    const { profileId } = await params;
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        {
          message: "School name is required",
          sccess: false,
        },
        { status: 401 }
      );
    }
    const { data: newSchool, error: schoolError } = await supabase
      .from("schools")
      .insert([{ name }])
      .select()
      .single();

    if (schoolError || !newSchool) {
      return NextResponse.json(
        {
          message: schoolError?.message || "Failed to create school",
          success: false,
        },
        { status: 500 }
      );
    }

    const { data: updatedProfile, error: profileError } = await supabase
      .from("profiles")
      .update({ school_id: newSchool.id })
      .eq("id", profileId)
      .select()
      .single();

    if (profileError) {
      return NextResponse.json(
        { message: profileError.message, success: false },
        { status: 500 }
      );
    }

      return NextResponse.json(
        {
          message: "School created and profile updated successfully",
          success: true,
          school: newSchool,
          profile: updatedProfile,
        },
        { status: 201 }
      );
  } catch (error) {
   console.error("Error creating school:", error);
   return NextResponse.json(
     { message: "Internal server error", success: false },
     { status: 500 }
   );
  }
}
