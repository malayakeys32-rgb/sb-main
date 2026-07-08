import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: "open" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    notes: { type: String }
  },
  { timestamps: true }
);

export const Case = mongoose.model("Case", caseSchema);

