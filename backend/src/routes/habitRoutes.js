import express from "express";
import {
    createHabit,
    getHabits,
    getHabitById,
    updateHabit,
    recordHabitCompletion,
    deleteHabit
} from "../controllers/habitController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(auth);

router.post("/", createHabit);
router.get("/", getHabits);
router.get("/:id", getHabitById);
router.put("/:id", updateHabit);
router.post("/:id/complete", recordHabitCompletion);
router.delete("/:id", deleteHabit);

export default router;
