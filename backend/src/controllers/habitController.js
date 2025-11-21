import Habit from '../models/Habit.js';

// Create a new habit
export const createHabit = async (req, res) => {
  const { name, description } = req.body;

  const habitExists = await Habit.findOne({ name, userId: req.user.id });
  if (habitExists) {
    return res.status(400).json({ message: 'Habit with this name already exists' });
  }

  const newHabit = await Habit.create({ name, description, userId: req.user.id });
  res.status(201).json({ habit: newHabit });
};

// Get all habits
export const getHabits = async (req, res) => {
  const habits = await Habit.find(
    { userId: req.user.id },
    { datesCompleted: 0, __v: 0, userId: 0 }
  ).sort({ updatedAt: -1, createdAt: -1 });
  res.json({ habits });
};

// Get a single habit by ID
export const getHabitById = async (req, res) => {
  const habit = await Habit.findOne(
    { _id: req.params.id, userId: req.user.id },
    { __v: 0, userId: 0 }
  );
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }
  res.json({ habit });
};

// Update a habit
export const updateHabit = async (req, res) => {
  const { name, description } = req.body;
  const habit = await Habit.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { name, description },
    { new: true }
  );
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }
  res.json({ message: 'Habit updated' });
};

// Record habit completion
export const recordHabitCompletion = async (req, res) => {
  const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.id });
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }
  habit.recordCompletion();
  await habit.save();
  res.json({ message: 'Habit completion recorded' });
};

// Delete a habit
export const deleteHabit = async (req, res) => {
  const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found' });
  }
  res.json({ message: 'Habit deleted' });
};
