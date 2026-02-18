import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { createUser } from '@/lib/actions/user.actions';

export async function POST(req) {
  // 1. Get the Webhook Secret from Clerk Dashboard
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env');
  }

  // 2. Get headers for Svix verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: No svix headers', { status: 400 });
  }

  // 3. Get the body data
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  // 4. Verify the payload (Security Check)
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', { status: 400 });
  }

  // 5. Handle the event
  const eventType = evt.type;

  if (eventType === 'user.created') {
   const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

const user = {
  clerkId: id,
  // Use ?. to check if it exists, and a fallback string if it doesn't
  email: email_addresses?.[0]?.email_address || "no-email@test.com", 
  username: username || first_name || `user_${id.slice(-4)}`, 
  firstName: first_name || "New",
  lastName: last_name || "User",
  photo: image_url || "",
};

    console.log(`Creating user in DB: ${user.email}`);
    const newUser = await createUser(user);
    
    return NextResponse.json({ message: 'OK', user: newUser });
  }

  return new Response('', { status: 200 });
}