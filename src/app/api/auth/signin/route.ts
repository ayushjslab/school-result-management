/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required", success: false },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const existingToken = (await cookieStore).get("auth-token")?.value;

    if (existingToken) {
      try {
        const decoded = jwt.verify(existingToken, JWT_SECRET) as {
          id: string;
          email: string;
        };

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", decoded.id)
          .single();

          console.log(profile)

        if (profile && !error) {
          return NextResponse.json({
            message: "Already signed in",
            user: decoded,
            profile,
            success: true,
          });
        }
      } catch (error) {
        console.log(error)
        console.warn("Invalid/expired token, re-authenticating...");
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { message: error.message, success: false },
        { status: 401 }
      );
    }

    const user = data.user;
    const session = data.session;

    if (user) {
      const { data: profile} = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) {
        await supabase.from("profiles").insert([
          {
            id: user.id,
            email: user.email,
          },
        ]);
      }
    }

    const newToken = jwt.sign(
      { id: user?.id, email: user?.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Signin successful",
      user,
      success: true,
      session,
    });

    response.cookies.set("auth-token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, 
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Server error", success: false },
      { status: 500 }
    );
  }
}
