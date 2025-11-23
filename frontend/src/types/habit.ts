export type Frequency = "Daily" | "Weekly" | "Monthly";

export type Habit = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  timesPerDay: number;
  frequency: Frequency;
  recent: number[]; 
  currentStreak?: number;
  longestStreak?: number;
};
