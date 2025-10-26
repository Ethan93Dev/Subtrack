import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import bcryptjs from "bcryptjs";
import { AuthType } from "@/types/types";

export async function POST(req: NextRequest) {
  try {
    const signupBody: AuthType = await req.json();
    const { username, email, password } = signupBody;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const registerUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        isOnline: false,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: registerUser,
    });
  } catch (e) {
    console.error("Error", e);
  }
}
