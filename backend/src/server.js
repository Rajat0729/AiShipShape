import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";



dotenv.config();
connectDB();

const app = express();

console.log("MONGO_URI =", process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
