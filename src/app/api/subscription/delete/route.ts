import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    // Validate input
    if (!id) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    // Get user token
    const userId = getDataFromToken(req);

    // Validate user token
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid token or no user found" },
        { status: 401 }
      );
    }

    // Verify subscription belongs to user
    const subscription = await prisma.subscription.findFirst({
      where: { id: Number(id), userId },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found or not authorized" },
        { status: 404 }
      );
    }

    // Delete the subscription
    const deletedSubscription = await prisma.subscription.delete({
      where: { id: subscription.id },
    });

    return NextResponse.json(
      {
        message: `Subscription with id ${id} successfully deleted`,
        deletedSubscription,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subscription:", error);
    return NextResponse.json(
      { error: "An internal server error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
