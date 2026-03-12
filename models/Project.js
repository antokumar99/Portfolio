import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title:           { type: String, required: true },
  description:     { type: String, required: true },
  longDescription: { type: String },
  tags:            { type: [String], default: [] },
  image:           { type: String },
  liveUrl:         { type: String },
  githubUrl:       { type: String },
  featured:        { type: Boolean, default: false },
  createdAt:       { type: Date, default: Date.now },
});

// Prevents recompiling model on every hot reload
export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);