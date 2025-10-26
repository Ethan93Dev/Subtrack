// app/api/auth/session/route.ts
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken"; // your function

export async function GET(req: NextRequest) {
  try {
    const userId = getDataFromToken(req); // returns ID if token is valid

    // Token exists and is valid
    return NextResponse.json({ loggedIn: true, userId });
  } catch {
    // No token or invalid token
    return NextResponse.json({ loggedIn: false });
  }
}
