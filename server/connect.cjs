const { MongoClient } = require("mongodb");
const path = require("path");
require("dotenv").config({ path: "./config.env" });

async function connectDB() {
    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db);

    try {
        await client.connect();
        console.log("MongoDB connected successfully");

        const collections = await client.db("MuseoSync").collections();
        collections.forEach((collection) => console.log(collection.collectionName)); // Corrected this line
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    } finally {
        // Optionally close the connection here or keep it open for further operations
        // await client.close(); // Uncomment this line if you want to close the connection immediately
    }
}

connectDB();
