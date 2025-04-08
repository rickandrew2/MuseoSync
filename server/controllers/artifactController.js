import { ObjectId } from "mongodb";
import { client } from "../config/db.js";

const db = client.db("MuseoSync");
const collection = db.collection("artifacts_collection");

export const getAllArtifacts = async (req, res) => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("Connected to database");
    console.log("Accessing collection");
    const artifacts = await collection.find({}).toArray();
    console.log("Found artifacts:", artifacts.length);
    res.status(200).json(artifacts);
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ message: "Failed to fetch artifacts", error: error.message });
  }
};

export const getArtifactById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching artifact with ID:", id);

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid artifact ID format" });
    }

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
}; 