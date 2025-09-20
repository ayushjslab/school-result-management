import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function GET() {
  try {
    const cookieStore = cookies();
    const existingToken = (await cookieStore).get("auth-token")?.value;

    if (existingToken) {
      const decoded = jwt.verify(existingToken, JWT_SECRET) as {
        id: string;
        email: string;
      };

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", decoded.id)
        .single();
      if (profile && !error) {
        return NextResponse.json({
          message: "User is Authenticated",
          user: decoded,
          profile,
          success: true,
        }, {status: 200});
      }else{
        return NextResponse.json({
            message: "User is not authenticated",
            success: false
        }, {status: 400})
      }
    }

    return NextResponse.json(
      {
        message: "User is not authenticated",
        success: false,
      },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
