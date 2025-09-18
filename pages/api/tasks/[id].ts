import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Task from "../../../models/Task";
import initMiddleware from "../../../lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initMiddleware(req, res); // ✅ Enable CORS
  await dbConnect();
  const { id } = req.query;

  switch (req.method) {
    case "PUT": {
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (!task) return res.status(404).json({ error: "Task not found" });
      return res.status(200).json(task);
    }
    case "DELETE": {
      const task = await Task.findByIdAndDelete(id);
      if (!task) return res.status(404).json({ error: "Task not found" });
      return res.status(200).json({ message: "Task deleted" });
    }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}