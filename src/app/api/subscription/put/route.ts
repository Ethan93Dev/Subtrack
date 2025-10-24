import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { SubscriptionType } from "@/types/types";

export async function PUT(req: NextRequest) {
  try {
    const subscriptionBody: SubscriptionType = await req.json();
    const { name, category, cost, frequency, nextPayment } = subscriptionBody;

    const userId = getDataFromToken(req);

    if (!userId) {
      return NextResponse.json({ error: "No user logged in" }, { status: 401 });
    }

    // Find the first subscription for this user (or you could identify by ID if sent in body)
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId },
    });

    if (!existingSubscription) {
      return NextResponse.json(
        { error: "Subscription not found for this user" },
        { status: 404 }
      );
    }

    // Update the subscription
    const updatedSubscription = await prisma.subscription.update({
      where: { id: existingSubscription.id },
      data: {
        name,
        category,
        cost,
        frequency,
        nextPayment,
      },
    });

    return NextResponse.json(updatedSubscription, { status: 200 });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
