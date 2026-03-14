"use server";

import User from "../models/user.model";
import { connectToDatabase } from "../mongodb/mongoose";
import { revalidatePath } from "next/cache";

/**
 * Fetches user from DB by Clerk ID
 */
export async function upgradeUserRole(userId) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { role: "premium" },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error upgrading user:", error);
    throw new Error("Failed to upgrade user role.");
  }
}

export async function getUserById(userId) {
  try {
    if (!userId) return null;
    await connectToDatabase();
    
    // Explicitly cast to String to prevent type mismatch
    const user = await User.findOne({ clerkId: String(userId) });
    
    if (!user) {
      console.log("⚠️ getUserById: No user found for ID:", userId);
      return null;
    }
    
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

/**
 * Updates progress and XP when a level is completed
 */


// Replace this with your actual data

// Ensure this matches your actual project structure

// Update this to match your actual course map
const COURSE_STRUCTURE = {
  1: { totalUnits: 3 }, 
  2: { totalUnits: 5 }, 
  3: { totalUnits: 2 }, 
};

export async function completeSublevel(clerkId, finishedId) {
  try {
    if (!clerkId) throw new Error("clerkId is required");
    
    await connectToDatabase();
    
    // 1. Parse the ID of the level the user JUST completed
    const parts = finishedId.split("-").map(part => parseInt(part, 10));
    
    const section = !isNaN(parts[0]) ? parts[0] : 1;
    const unit    = !isNaN(parts[1]) ? parts[1] : 1;
    const level   = !isNaN(parts[2]) ? parts[2] : 1;
    
    let nextSection = section;
    let nextUnit = unit;
    let nextLevel = level + 1;

    // 2. THE PROGRESSION GATE
    if (level >= 5) {
      nextLevel = 1; 
      nextUnit = unit + 1; 
      
      const currentSectionData = COURSE_STRUCTURE[section];
      if (currentSectionData && nextUnit > currentSectionData.totalUnits) {
        nextUnit = 1;
        nextSection = section + 1;
      }
    } else {
      nextUnit = unit;
      nextSection = section;
    }

    // 3. Construct the 3-part ID for the database
    const nextProgressId = `${nextSection}-${nextUnit}-${nextLevel}`;

    console.log(`User ${clerkId} finished ${finishedId}. Moving to ${nextProgressId}`);

    // 4. Update the User document
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: String(clerkId) }, 
      { 
        $set: { 
          currentProgress: nextProgressId,
          lastLevelCompletedAt: new Date() 
        }, 
        $inc: { 
          // Incrementing XP by 21 (+1 bonus included)
          xp: 1, 
          // Incrementing walletBalance by 0.05
          
        } 
      },
      { new: true } 
    );

    if (!updatedUser) {
      throw new Error(`User with clerkId ${clerkId} not found in DB.`);
    }

    revalidatePath("/dashboard");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("❌ DB Update Failed:", error.message);
    throw error;
  }
}
/**
 * Creates a new user in the database
 */
export async function createUser(userData) {
  try {
    await connectToDatabase();
    const newUser = await User.create({
      clerkId: String(userData.clerkId),
      email: userData.email,
      username: userData.username,
      photo: userData.photo,
      xp: 0,
      currentProgress: "1-1-1",
      role: 'free' ,// Ensure wallet balance starts at 0
    });
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Updates paid status
 */
export async function updateUserPaidStatus(clerkId) {
  try {
    await connectToDatabase();
    
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: String(clerkId) },
      { role: 'premium' }, // Changed to match your 'role' logic in LessonPage
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log("Error updating paid status:", error);
    return null;
  }
}