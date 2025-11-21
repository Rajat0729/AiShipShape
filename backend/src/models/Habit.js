import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
  longestStreak: {
    type: Number,
    default: 0,
  },
  lastCompleted: {
    type: Date | null,
    default: null,
  },
  datesCompleted: {
    type: [Date],
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
});

habitSchema.index({ userId: 1, name: 1 }, { unique: true });

habitSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

habitSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedAt = new Date();
  next();
});

habitSchema.methods.recordCompletion = function () {
  const date = new Date();
  const dateCurrent = new Date(date);
  dateCurrent.setHours(0, 0, 0, 0);

  if (!this.datesCompleted.some(d => {
    const dateCompleted = new Date(d);
    dateCompleted.setHours(0, 0, 0, 0);
    return dateCompleted.getTime() === dateCurrent.getTime();
  })) {
    this.datesCompleted.push(date);

    if (this.lastCompleted) {
      const lastDate = new Date(this.lastCompleted);
      lastDate.setHours(0, 0, 0, 0);

      const diffTime = dateCurrent - lastDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        this.currentStreak += 1;
      } else if (diffDays > 1) {
        this.currentStreak = 1;
      }
    } else {
      this.currentStreak = 1;
    }
    this.lastCompleted = date;

    if (this.currentStreak > this.longestStreak) {
      this.longestStreak = this.currentStreak;
    }
    return this.save();
  }
  return Promise.resolve(this);
}

export default mongoose.model("Habit", habitSchema);
