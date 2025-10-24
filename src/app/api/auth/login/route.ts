import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthType } from "@/types/types";
export async function POST(request: NextRequest) {
  try {
    const req: AuthType = await request.json();
    const { email, password } = req;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // check if emaill is correct
    if (!user) {
      return NextResponse.json(
        { error: "User dose not exist" },
        { status: 400 }
      );
    }

    // update isOnline = true
    await prisma.user.update({
      where: { email },
      data: {
        isOnline: true,
      },
    });

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: user.id,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      token: token,
      username: user.username,
      email: user.email,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
