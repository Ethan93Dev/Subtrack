import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function DELETE(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: No valid token found" },
        { status: 401 }
      );
    }

    // Update isOnline to false
    await prisma.user.update({
      where: { id: userId }, // Ensure correct type
      data: { isOnline: false },
    });

    // Clear cookie
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error: unknown) {
    console.error("Logout error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
