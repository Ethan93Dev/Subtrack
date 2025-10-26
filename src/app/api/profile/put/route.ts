import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { ProfileType } from "@/types/types";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function PUT(req: NextRequest) {
  try {
    const profileBody: ProfileType = await req.json();
    const { firstName, lastName, state, city, county } = profileBody;

    const userToken = getDataFromToken(req);

    if (!userToken) {
      return NextResponse.json({ error: "No user logged in" }, { status: 401 });
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: userToken },
    });

    if (!existingProfile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const updatedProfile = await prisma.profile.update({
      where: { userId: userToken },
      data: { firstName, lastName, state, city, county },
    });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (e) {
    console.error("Error", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
