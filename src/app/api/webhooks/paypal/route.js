import { NextResponse } from "next/server";
import { updateUserPaidStatus } from "@/lib/actions/user.actions"; // You'll create this action

export async function POST(req) {
  const body = await req.json();

  // 1. Check if the event is a successful payment
  if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    // 2. Get the Clerk ID we passed into 'custom_id' during checkout
    const clerkId = body.resource.custom_id;

    // 3. Update MongoDB to set isPaid: true
    try {
      await updateUserPaidStatus(clerkId);
      return NextResponse.json({ message: "User upgraded" }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ error: "DB Update failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}