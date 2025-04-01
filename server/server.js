import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // Specify the path to the .env file

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB connection setup
const Db = process.env.ATLAS_URI;
if (!Db) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1); // Exit if the URI is not found
}

const client = new MongoClient(Db);

// Function to connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");

    // Optionally, you can log the collections
    const collections = await client.db("MuseoSync").collections();
    collections.forEach((collection) => console.log(collection.collectionName)); 
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

// Connect to MongoDB when the server starts
connectDB();

// Route to get all artifacts
app.get("/api/artifacts", async (req, res) => {
  try {
    const db = client.db("MuseoSync");
    const collection = db.collection("artifacts_collection"); // Your artifacts collection
    const artifacts = await collection.find().toArray(); // Get all artifacts from the collection

    res.status(200).json(artifacts);
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    res.status(500).json({ message: "Failed to fetch artifacts" });
  }
});

// Route to submit logbook data
app.post("/submit-logbook", async (req, res) => {
  const { name, gender, address } = req.body;

  if (!name || !gender || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = client.db("MuseoSync");
    const collection = db.collection("Logbook");

    // Insert the form data into the MongoDB collection
    const result = await collection.insertOne({
      name,
      gender,
      address,
      timestamp: new Date(),
    });

    res.status(200).json({ message: "Data submitted successfully!", result });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
