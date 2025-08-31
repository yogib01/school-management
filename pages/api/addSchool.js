import formidable from "formidable";
import fs from "fs";
import path from "path";
import { connectToDatabase } from "../../lib/db"; // make sure this points to your DB connection

export const config = {
  api: {
    bodyParser: false, // we use formidable instead
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public", "schoolImages");

  // Ensure the folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      return Date.now() + "_" + part.originalFilename.replace(/\s+/g, "_");
    },
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable error:", err);
      return res.status(500).json({ error: "File upload error" });
    }

    try {
      // Extract form fields (formidable gives arrays, so take [0])
      const name = fields.name?.[0] || "";
      const address = fields.address?.[0] || "";
      const city = fields.city?.[0] || "";
      const state = fields.state?.[0] || "";
      const contact = fields.contact?.[0] || "";
      const email_id = fields.email_id?.[0] || "";
      const image = files.image
        ? "/schoolImages/" + files.image[0].newFilename
        : "";

      console.log("Received school data:", {
        name,
        address,
        city,
        state,
        contact,
        email_id,
        image,
      });

      // Insert into DB
      const conn = await connectToDatabase();
      const query = `
        INSERT INTO schools (name, address, city, state, contact, email_id, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      await conn.query(query, [name, address, city, state, contact, email_id, image]);

      return res.status(200).json({ message: "School added successfully!" });
    } catch (dbErr) {
      console.error("DB Insert Error:", dbErr);
      return res.status(500).json({ error: "Database insert failed" });
    }
  });
}
