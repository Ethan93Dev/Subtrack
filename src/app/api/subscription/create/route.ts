import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { BillType } from "@/types/types";

export async function POST(req: NextRequest) {
  try {
    const billBody: BillType = await req.json();
    const { name, category, amount, dueDate, status } = billBody;

    const userId = getDataFromToken(req);

    if (!userId) {
      return NextResponse.json(
        { message: "No user or token" },
        { status: 401 }
      );
    }

    // Optionally check if user already has a bill with the same name
    const existingBill = await prisma.bill.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (existingBill) {
      return NextResponse.json(
        { message: "Bill with this name already exists for this user" },
        { status: 400 }
      );
    }

    // Create a new bill
    const createdBill = await prisma.bill.create({
      data: {
        name,
        category,
        amount,
        dueDate: new Date(dueDate),
        status: status || "unpaid",
        createdAt: new Date(),
        userId,
      },
    });

    return NextResponse.json(
      {
        message: "Bill created successfully",
        bill: createdBill,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating bill:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
