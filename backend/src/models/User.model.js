import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    // BASIC INFO
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },

    // PASSWORD FOR BOTH APP + WEBSITE
    passwordHash: { type: String, required: true },

    // OPTIONAL FIELDS
    phone: { type: String, default: "" },
    avatar: { type: String, default: "" },

    // ROLES SUPPORTED BY BOTH APP + WEBSITE
    role: {
      type: String,
      enum: ["user", "donor", "ngo", "admin", "delivery"],
      default: "user",
    },

    // WEBSITE FEATURES
    points: { type: Number, default: 0 },
    donationsCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },

    // APP FEATURES
    pushToken: { type: String },
    lastActiveAt: { type: Date },
    appPreferences: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
