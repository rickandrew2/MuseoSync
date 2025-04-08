import express from "express";
import { getAllArtifacts, getArtifactById } from "../controllers/artifactController.js";
import { getAvailableDates, createBooking } from "../controllers/bookingController.js";
import { submitInquiry, submitLogbook } from "../controllers/contactController.js";

const router = express.Router();

// Artifact routes
router.get("/artifacts", getAllArtifacts);
router.get("/artifacts/:id", getArtifactById);

// Booking routes
router.get("/available-dates", getAvailableDates);
router.post("/bookings", createBooking);

// Contact and logbook routes
router.post("/inquiries", submitInquiry);
router.post("/submit-logbook", submitLogbook);

export default router; 