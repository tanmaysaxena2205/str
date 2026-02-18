import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import LessonPage from "./LessonPage";
import { SECTION_1_DATA } from "@/data/sections/section-1";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  // Wait for the URL parameters
  const { unitId, levelId } = await params;

  // Get the authenticated user's ID from Clerk
  const { userId: clerkIdFromAuth } = await auth();
  if (!clerkIdFromAuth) redirect("/sign-in");

  // Fetch the user document from MongoDB
  const rawUser = await getUserById(clerkIdFromAuth);
  if (!rawUser) redirect("/dashboard");

  // SERIALIZATION: Convert MongoDB/Clerk objects into plain strings 
  // This prevents the "User ID not found" error on the client side
  const serializedUser = {
    clerkId: String(rawUser.clerkId || clerkIdFromAuth),
    role: String(rawUser.role || "free"),
    lastLevelCompletedAt: rawUser.lastLevelCompletedAt 
      ? new Date(rawUser.lastLevelCompletedAt).toISOString() 
      : null,
  };

  // Prepare the questions for the UI
  const unit = SECTION_1_DATA.find((u) => u.unitId === unitId);
  const levelData = unit?.levels.find((l) => l.levelId === levelId);
  const questions = levelData?.questions || [];

  return (
    <LessonPage 
      user={serializedUser} 
      unitId={unitId} 
      levelId={levelId} 
      questions={questions} 
    />
  );
}