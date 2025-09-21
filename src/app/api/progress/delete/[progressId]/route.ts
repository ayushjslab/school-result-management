/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ progressId: string }> }
) {
  try {
    const { progressId } = await params;

    if (!progressId) {
      return NextResponse.json(
        { success: false, message: "Progress ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("progress").delete().eq("id", progressId);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Progress deleted successfully",
    });
  } catch (err: any) {
    console.error("DELETE error:", err.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete progress" },
      { status: 500 }
    );
  }
}
