import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize the cors middleware
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: "*", // Allow all origins for now (can restrict later)
});

// Helper to wait for middleware to execute
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default function initMiddleware(req: NextApiRequest, res: NextApiResponse) {
  return runMiddleware(req, res, cors);
}