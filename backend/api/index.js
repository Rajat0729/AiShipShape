import "dotenv/config";
import mongoose from "mongoose";
import app from "../src/app.js";

const port = process.env.PORT || 5000;
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables.");
    process.exit(1);
}

console.log("[server]: Starting server...");
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("[server]: Connected to MongoDB!");
    app.listen(port, () => {
        console.log(`[server]: Server is listening on port ${port}!`);
    });
}).catch((err) => {
    console.error(err);
    process.exit(1);
});
