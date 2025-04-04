import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });
console.log("Current directory:", __dirname);
console.log("Environment variables loaded:", process.env.ATLAS_URI ? "ATLAS_URI exists" : "ATLAS_URI is missing");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(helmet()); 
app.use(express.json()); 
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://museosync.vercel.app'
  ],
  methods: ["GET", "POST"],
  credentials: true,
}));


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// MongoDB connection setup
const Db = process.env.ATLAS_URI;
if (!Db) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1);
}

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: { version: "1", strict: true, deprecationErrors: true },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}
connectDB();

// Route to get all artifacts
app.get("/api/artifacts", async (req, res) => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const db = client.db("MuseoSync");
    console.log("Connected to database");
    const collection = db.collection("artifacts_collection");
    console.log("Accessing collection");
    const artifacts = await collection.find({}).toArray();
    console.log("Found artifacts:", artifacts.length);
    res.status(200).json(artifacts);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ message: "Failed to fetch artifacts", error: error.message });
  }
});

// Route to get a single artifact by ID
app.get("/api/artifacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching artifact with ID:", id);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid artifact ID format" });
    }

    const db = client.db("MuseoSync");
    const collection = db.collection("artifacts_collection");
    
    const artifact = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }

    console.log("Found artifact:", artifact.artifact_name);
    res.status(200).json(artifact);
  } catch (error) {
    console.error("Error fetching artifact:", error);
    res.status(500).json({ message: "Failed to fetch artifact", error: error.message });
  }
});

// Route to submit logbook data
app.post("/api/submit-logbook", async (req, res) => {
  const { name, gender, address } = req.body;

  if (!name || !gender || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = client.db("MuseoSync");
    const collection = db.collection("Logbook");
    const sanitizedData = {
      name: name.trim(),
      gender: gender.trim(),
      address: address.trim(),
      timestamp: new Date(),
    };
    const result = await collection.insertOne(sanitizedData);
    res.status(200).json({ message: "Data submitted successfully!", result });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to insert data" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
