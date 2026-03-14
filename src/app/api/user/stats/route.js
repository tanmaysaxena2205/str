import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // Updated import path
import { getUserById } from "@/lib/actions/user.actions";

export async function GET() {
  try {
    // In App Router API routes, auth() must be awaited in newer versions
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ xp: 0 }, { status: 401 });
    }

    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json({ xp: 0 }, { status: 404 });
    }

    return NextResponse.json({ 
      xp: user.xp || 0 
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ xp: 0 }, { status: 500 });
  }
}