import express from "express";
import {
    createHabit,
    getHabits,
    getHabitById,
    updateHabit,
    recordHabitCompletion,
    deleteHabit
} from "../controllers/authController.js";

const router = express.Router();

router.post("/", createHabit);
router.get("/", getHabits);
router.get("/:id", getHabitById);
router.put("/:id", updateHabit);
router.post("/:id/complete", recordHabitCompletion);
router.delete("/:id", deleteHabit);

export default router;
