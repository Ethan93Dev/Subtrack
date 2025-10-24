import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    if (!userId) {
      return NextResponse.json({ error: "No user logged in" }, { status: 401 });
    }

    // Fetch only the logged-in user's subscriptions
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        category: true,
        cost: true,
        frequency: true,
        nextPayment: true,
        createdAt: true,
      },
    });

    if (subscriptions.length === 0) {
      return NextResponse.json(
        { message: "No subscriptions found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Subscriptions retrieved successfully", subscriptions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
