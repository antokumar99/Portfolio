import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  category: { type: String, required: true },
  level:    { type: Number, required: true, min: 1, max: 100 },
  icon:     { type: String },
});

export default mongoose.models.Skill ||
  mongoose.model("Skill", SkillSchema);