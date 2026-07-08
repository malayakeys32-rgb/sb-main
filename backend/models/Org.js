import mongoose from "mongoose";

const orgSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export const Org = mongoose.model("Org", orgSchema);

