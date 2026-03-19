import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { sequelize } from "./db/db.js";
import "./models/index.js";
import router from "./routes/routes.js";

// ================== CONFIG ==================
dotenv.config();
const PORT = process.env.PORT || 5000;

// ================== APP INIT ==================
const app = express();

// ================== MIDDLEWARE ==================
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ================== LOGGER ==================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// ================== ROUTES ==================
app.use("/api", router);

// ================== SERVER START ==================
const startServer = async () => {
  try {
    // DB connection
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Sync models
    await sequelize.sync({ alter: false });
    console.log("✅ Models synchronized");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();