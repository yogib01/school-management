import { connectToDatabase } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const conn = await connectToDatabase();
      const [rows] = await conn.execute("SELECT id, name, address, city, image FROM schools");
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
