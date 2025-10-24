import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { SubscriptionType } from "@/types/types";

export async function POST(req: NextRequest) {
  try {
    const subscriptionBody: SubscriptionType = await req.json();
    const { name, category, cost, frequency, nextPayment } = subscriptionBody;

    const userId = getDataFromToken(req);

    if (!userId) {
      return NextResponse.json(
        { message: "No user or token" },
        { status: 401 }
      );
    }

    // Check if user already has a subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: { userId },
    });

    if (existingSubscription) {
      return NextResponse.json(
        { message: "User already has an existing subscription" },
        { status: 400 }
      );
    }

    // Create a new subscription
    const createdSubscription = await prisma.subscription.create({
      data: {
        name,
        category,
        cost,
        frequency,
        nextPayment: new Date(nextPayment),
        createdAt: new Date(),
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Subscription created successfully",
        subscription: createdSubscription,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
