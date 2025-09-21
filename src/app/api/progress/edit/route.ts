/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PATCH(req: NextRequest) {
  try {
    const { id, subject, score, remarks } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "Progress ID is required",
          success: false,
        },
        { status: 400 }
      );
    }

    const updatePayload: Record<string, any> = {};
    if (subject) updatePayload.subject = subject;
    if (score) updatePayload.score = score;
    if (remarks) updatePayload.remarks = remarks;

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json(
        {
          message: "No fields provided to update",
          success: false,
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("progress")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json(
        {
          message: error?.message || "Failed to update progress",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Progress updated successfully",
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
