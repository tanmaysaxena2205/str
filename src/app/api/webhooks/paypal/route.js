import { NextResponse } from "next/server";
import { upgradeUserRole } from "@/lib/actions/user.actions"; 

export async function POST(req) {
  try {
    const body = await req.json();
    const eventType = body.event_type;

    console.log("⚓ Webhook received:", eventType);

    if (eventType === "PAYMENT.CAPTURE.COMPLETED") {
      const resource = body.resource;

      // PayPal nests the custom_id deeply. We check all possible locations:
      const clerkId = 
        resource.custom_id || 
        resource.custom || 
        resource.purchase_units?.[0]?.custom_id ||
        resource.supplementary_data?.related_ids?.order_id; // Fallback

      if (!clerkId || clerkId === "guest") {
        console.error("❌ No Clerk ID found in PayPal resource");
        return NextResponse.json({ error: "No User ID provided" }, { status: 400 });
      }

      console.log(`🚀 Upgrading user: ${clerkId}`);

      try {
        // Using the action name we discussed for role upgrading
        await upgradeUserRole(clerkId); 
        return NextResponse.json({ message: "User upgraded to Premium" }, { status: 200 });
      } catch (err) {
        console.error("❌ DB Update failed:", err);
        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
      }
    }

    // Acknowledge other PayPal events so they don't keep retrying
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}