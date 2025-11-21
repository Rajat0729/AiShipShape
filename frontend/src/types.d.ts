export interface Habit {
  _id: string;
  name: string;
  description: string;
  currentStreak: number;
  longestStreak: number;
  lastCompleted: string | null;
  createdAt: string;
  updatedAt: string;
  completions?: string[];
}
