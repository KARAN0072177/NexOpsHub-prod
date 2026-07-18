import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// routes 

import authRoutes from "./modules/auth/routes/auth.routes.js";

import projectRoutes from "./modules/project/routes/project.routes.js";

import cookieParser from "cookie-parser";

import { serviceRoutes } from "./modules/service/index.js";

dotenv.config();

const app = express();


app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({
    service: "nexopshub-api",
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "development",
  });
});

app.get("/api/test", (_req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/auth", authRoutes);
app.use("/api", projectRoutes);
app.use("/api" , serviceRoutes);

const PORT = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
  console.log(`🚀 API listening on port ${PORT}`);
});