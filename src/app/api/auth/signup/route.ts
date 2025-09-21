/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: Request) {
  try {
    const { email, password, name, role, school_id, profileUrl, rollnumber } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required", success: false },
      );
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

        if (data.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: data.user.id,
                name: name || "",
                role: role || "student",
                school_id: school_id || null,
                profileUrl: profileUrl || "",
                rollnumber: rollnumber || "",
              },
            ]);

          if (profileError) {
            return NextResponse.json(
              {
                message: "User created but profile insert failed",
                error: profileError.message,
                success: false,
              },
              { status: 500 }
            );
          }
        }

        const token = jwt.sign(
          {
            id: data.user?.id,
            email: data.user?.email,
          },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        (await
          cookies()).set("auth-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

    return NextResponse.json({
      message: "Signup successful. Please check your email to confirm.",
      success: true,
      user: data.user,
    });
  } catch (err: any) {
    console.log(err)
    return NextResponse.json(
      { message: err.message || "Server error", success: false },
      { status: 500 }
    );
  }
}
