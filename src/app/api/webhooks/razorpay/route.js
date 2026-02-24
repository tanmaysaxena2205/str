import { NextResponse } from "next/server";
import crypto from "crypto";
import { upgradeUserRole } from "@/lib/actions/user.actions";

export async function POST(request) {
  try {
    // 1. Get the raw body as text for signature verification
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature) {
      return NextResponse.json({ error: "No signature found" }, { status: 400 });
    }

    // 2. Verify the signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Razorpay Webhook: Invalid Signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 3. Parse the data
    const payload = JSON.parse(body);
    const event = payload.event;

    // 4. Handle successful payment
    if (event === "payment.captured") {
      const paymentEntity = payload.payload.payment.entity;
      
      // We extract the userId we tucked into the "notes" during order creation
      const userId = paymentEntity.notes?.userId;

      if (userId) {
        console.log(`Webhook: Upgrading user ${userId}`);
        await upgradeUserRole(userId);
      } else {
        console.warn("Webhook: Payment captured but no userId found in notes.");
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}