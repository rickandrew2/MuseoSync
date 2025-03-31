import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" }); // Specify the path to the .env file

dotenv.config(); // Load environment variables

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection
const Db = process.env.ATLAS_URI;
if (!Db) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1); // Exit if the URI is not found
}

const client = new MongoClient(Db);
console.log("MongoDB URI:", Db);  // Log to check if the URI is being loaded correctly

// Route to submit logbook data
app.post("/submit-logbook", async (req, res) => {
  const { name, gender, address } = req.body;

  if (!name || !gender || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await client.connect();
    const db = client.db("MuseoSync");
    const collection = db.collection("Logbook");

    // Insert the form data into the MongoDB collection
    const result = await collection.insertOne({
        name,
        gender,
        address,
        timestamp: new Date() 
      });
    
    res.status(200).json({ message: "Data submitted successfully!", result });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data" });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
