import { NextResponse } from "next/server";

const envxxx = process.env.NEXTAUTH_URL;

export async function GET(req) {
  return NextResponse.redirect(envxxx);
}
