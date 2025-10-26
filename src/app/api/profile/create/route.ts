import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { ProfileType } from "@/types/types";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(req: NextRequest) {
  try {
    const profileBody: ProfileType = await req.json();
    const { firstName, lastName, state, city, county } = profileBody;

    const userToken = getDataFromToken(req);

    if (!userToken) {
      return NextResponse.json({ error: "No user logged in" }, { status: 401 });
    }

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "Missing firstName or lastName" },
        { status: 400 }
      );
    }

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: userToken },
    });

    if (existingProfile) {
      return NextResponse.json(
        { message: "Profile already exists" },
        { status: 409 }
      );
    }

    const createProfile = await prisma.profile.create({
      data: {
        firstName,
        lastName,
        state,
        city,
        county,
        userId: userToken,
      },
    });

    return NextResponse.json(
      {
        profile: createProfile,
        token: userToken,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
