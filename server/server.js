import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });
console.log("Current directory:", __dirname);
console.log("Environment variables loaded:", process.env.ATLAS_URI ? "ATLAS_URI exists" : "ATLAS_URI is missing");

const app = express();
const port = process.env.PORT || 5000;

// Remove BASE_PATH and update CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://museo-sync.vercel.app', 'https://museo-sync-client.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure Helmet with custom CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "http://localhost:5000", "http://localhost:5173", "https://museo-sync.vercel.app", "https://museo-sync-client.vercel.app"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"],
      wasm: ["'self'", "'unsafe-eval'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Other Middleware
app.use(express.json());

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

// Route to get available dates
app.get("/api/available-dates", async (req, res) => {
  try {
    const db = client.db("MuseoSync");
    const collection = db.collection("available_dates");
    const availableDates = await collection.find({}).toArray();
    
    if (!availableDates) {
      return res.status(404).json({ message: "No available dates found" });
    }

    console.log("Fetched available dates:", availableDates.length);
    res.status(200).json(availableDates);
  } catch (error) {
    console.error("Error fetching available dates:", error);
    res.status(500).json({ message: "Failed to fetch available dates", error: error.message });
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

// Route to create a new booking
app.post("/api/bookings", async (req, res) => {
  try {
    const { visitor_name, email, selected_date, selected_time, recaptchaToken } = req.body;

    if (!visitor_name || !email || !selected_date || !selected_time || !recaptchaToken) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Format the date to YYYY-MM-DD to match MongoDB format
    const formattedSelectedDate = new Date(selected_date).toISOString().split('T')[0];
    
    console.log('Booking request details:', {
      received_date: selected_date,
      formatted_date: formattedSelectedDate,
      time: selected_time
    });

    // Verify reCAPTCHA token
    console.log("Attempting reCAPTCHA verification with token:", recaptchaToken.substring(0, 20) + "...");
    
    const recaptchaVerification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaVerification.json();
    console.log("reCAPTCHA verification response:", recaptchaData);

    if (!recaptchaData.success) {
      console.error("reCAPTCHA verification failed:", recaptchaData["error-codes"] || "No error codes provided");
      return res.status(400).json({ 
        message: "reCAPTCHA verification failed",
        details: recaptchaData["error-codes"] || []
      });
    }

    const db = client.db("MuseoSync");
    
    // Check if the selected time slot is still available
    const availableDatesCollection = db.collection("available_dates");
    
    // Log the query we're about to make
    console.log('Searching for date in MongoDB:', {
      query_date: formattedSelectedDate
    });
    
    const dateDoc = await availableDatesCollection.findOne({
      date: formattedSelectedDate
    });
    
    console.log('MongoDB query result:', {
      found: !!dateDoc,
      dateDoc: dateDoc ? {
        date: dateDoc.date,
        timeSlots: dateDoc.timeSlots.map(slot => ({
          time: slot.time,
          isAvailable: slot.isAvailable,
          currentBookings: slot.currentBookings
        }))
      } : null
    });

    if (!dateDoc) {
      return res.status(400).json({ message: "Selected date is not available" });
    }

    // Find the specific time slot
    const timeSlot = dateDoc.timeSlots.find(slot => slot.time === selected_time);
    
    if (!timeSlot) {
      return res.status(400).json({ message: "Selected time slot not found" });
    }

    if (!timeSlot.isAvailable || timeSlot.currentBookings >= timeSlot.maxCapacity) {
      return res.status(400).json({ message: "Selected time slot is not available" });
    }

    // Create the booking
    const bookingsCollection = db.collection("bookings");
    const booking = {
      visitor_name,
      email,
      selected_date: formattedSelectedDate,
      selected_time,
      status: "Pending",
      timestamp: new Date().toISOString(),
      reference_code: "MMDT" + Math.random().toString(36).substr(2, 6).toUpperCase()
    };

    const result = await bookingsCollection.insertOne(booking);

    // Update the available_dates collection to increment currentBookings
    await availableDatesCollection.updateOne(
      {
        date: formattedSelectedDate,
        "timeSlots.time": selected_time
      },
      {
        $inc: { "timeSlots.$.currentBookings": 1 }
      }
    );

    res.status(201).json({ 
      message: "Booking created successfully", 
      booking: { ...booking, _id: result.insertedId } 
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
