import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Task from "../../../models/Task";
import initMiddleware from "../../../lib/cors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await initMiddleware(req, res); // ✅ Enable CORS
  await dbConnect();

  switch (req.method) {
    case "GET": {
      const tasks = await Task.find().sort({ createdAt: -1 });
      return res.status(200).json(tasks);
    }
    case "POST": {
      const { title } = req.body;
      if (!title) return res.status(400).json({ error: "Title is required" });

      const newTask = await Task.create({ title });
      return res.status(201).json(newTask);
    }
    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}