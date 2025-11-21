import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/authRoutes.js";
import habitRouter from "./routes/habitRoutes.js";

export const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_, res) => {
    res.json({ message: "AiShipshape API is running." });
});

// Routers
app.use("/api/auth", authRouter);
app.use("/api/habits", habitRouter);

app.use((err, _, res, __) => {
    console.error(err);
    res.status(500);
    res.json({ message: "Internal Server Error" });
    res.end();
});

app.use((_, res) => {
    res.status(404);
    res.json({ message: "Resource not Found" });
    res.end();
});

export default app;
