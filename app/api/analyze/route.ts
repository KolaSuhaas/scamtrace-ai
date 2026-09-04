import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "ScamTrace analysis API is running",
  });
}
