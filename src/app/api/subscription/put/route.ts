import { NextRequest, NextResponse } from "next/server";
import prisma from "@/database/prisma";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { BillType } from "@/types/types";

export async function PUT(req: NextRequest) {
  try {
    const billBody: BillType = await req.json();
    const { id, name, category, amount, status, dueDate } = billBody;

    const userId = getDataFromToken(req);

    if (!userId) {
      return NextResponse.json({ error: "No user logged in" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json(
        { error: "Bill ID is required" },
        { status: 400 }
      );
    }

    // Ensure the bill belongs to this user
    const existingBill = await prisma.bill.findUnique({
      where: { id },
    });

    if (!existingBill || existingBill.userId !== userId) {
      return NextResponse.json(
        { error: "Bill not found or not authorized" },
        { status: 404 }
      );
    }

    // Update the bill
    const updatedBill = await prisma.bill.update({
      where: { id },
      data: {
        name,
        category,
        amount,
        status,
        dueDate: dueDate ? new Date(dueDate) : existingBill.dueDate,
      },
    });

    return NextResponse.json(
      { message: "Bill updated successfully", bill: updatedBill },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating bill:", error);
    return NextResponse.json(
      { error: "Failed to update bill" },
      { status: 500 }
    );
  }
}
