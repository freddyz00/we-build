// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createReadStream } from "fs";

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log(typeof req.body);
  }
  res.status(200).json({ name: "John Doe" });
}
