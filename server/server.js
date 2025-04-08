import express from "express";
import { corsMiddleware, helmetMiddleware, rateLimiter } from "./middleware/security.js";
import { connectDB } from "./config/db.js";
import apiRoutes from "./routes/index.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') });
console.log("Current directory:", __dirname);
console.log("Environment variables loaded:", process.env.ATLAS_URI ? "ATLAS_URI exists" : "ATLAS_URI is missing");

const app = express();
const port = process.env.PORT || 5000;

// Apply middleware
app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(express.json());
app.use(rateLimiter);

// Connect to MongoDB
connectDB();

// API routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
