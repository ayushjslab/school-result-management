import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    );

    res.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return res;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to log out",
      },
      { status: 500 }
    );
  }
}
