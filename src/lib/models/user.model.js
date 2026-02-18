import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: false }, // For the Leaderboard
  photo: { type: String, required: true },                 // To show the avatar in the Navbar
  lastLevelCompletedAt: { type: Date, default: null },
  // Progress Tracking
  currentProgress: { type: String, default: "1-1-1" }, 
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },

  role: { 
    type: String, 
    enum: ['free', 'premium', 'admin'], 
    default: 'free' 
  },
  
  createdAt: { type: Date, default: Date.now }
});

const User = models?.User || model("User", UserSchema);
export default User;