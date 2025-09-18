import mongoose, { Schema, Document, models } from "mongoose";

export interface ITask extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model<ITask>("Task", TaskSchema);
export default Task;