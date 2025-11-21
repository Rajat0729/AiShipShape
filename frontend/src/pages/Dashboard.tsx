import React, { useEffect, useState } from "react";

type Habit = {
  id: string;
  name: string;
  frequency: "Daily" | "Weekly" | "Monthly";
  timesPerDay: number;       // NEW
  description?: string;
  createdAt: string;
  recent: number[];          // NOW STORING intensity (0–4)
};

const STORAGE_KEY = "habitflow_habits_v2";

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Modal fields
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<"Daily" | "Weekly" | "Monthly">("Daily");
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [description, setDescription] = useState("");

  // Load habits
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setHabits(JSON.parse(raw));
      } catch {
        setHabits([]);
      }
    }
  }, []);

  // Save habits
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  function openModal() {
    setName("");
    setFrequency("Daily");
    setTimesPerDay(1);
    setDescription("");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function createHabit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!name.trim()) return alert("Please enter a habit name");

    const newHabit: Habit = {
      id: Date.now().toString(),
      name: name.trim(),
      frequency,
      timesPerDay,
      description: description.trim(),
      createdAt: new Date().toISOString(),
      recent: Array(21).fill(0),        // 0 = not done
    };

    setHabits((s) => [newHabit, ...s]);
    setShowModal(false);
  }

  function markToday(id: string) {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const newArr = [...h.recent];
        let todayCount = newArr[0] ?? 0;

        todayCount = Math.min(todayCount + 1, 4); // cap at 4 (exceeded)

        newArr[0] = todayCount;
        return { ...h, recent: newArr };
      })
    );
  }

  function deleteHabit(id: string) {
    if (!confirm("Delete this habit?")) return;
    setHabits((p) => p.filter((h) => h.id !== id));
  }

  const isEmpty = habits.length === 0;

  return (
    <div className="min-h-screen bg-(--bg) text-[#e9eef1]">
      <header className="h-[58px] flex items-center px-6 border-b border-white/5 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-linear-to-b from-[#0af575] to-[#0f8f4b] rounded-sm" />
          <div className="text-[16px] font-bold">HabitFlow</div>
        </div>
        <div className="ml-auto">
          <div className="username">John Doe</div>
        </div>
      </header>

      <main className="p-7 max-w-[1100px] mx-auto">
        <div className="flex items-center gap-3">
          <button
            className="py-2.5 px-3.5 rounded-lg font-semibold cursor-pointer bg-linear-to-br from-[#0af575] to-[#0f8f4b] text-[#04150d]"
            onClick={openModal}
          >
            + Add Habit
          </button>

          <div className="flex-1" />

          <div className="px-3.5 py-2.5 rounded-lg bg-white/5">Sort by ▾</div>
        </div>

        {isEmpty ? (
          <div className="text-center mt-20">
            <h2>Welcome to HabitFlow</h2>
            <p className="text-[20px] mt-2 text-[#bccdd1]">
              Start small. Stay consistent. Build a better you.
            </p>
            <p className="text-sm text-[#9fb3b7]">This message disappears when you add your first habit.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5 mt-6">
            {habits.map((h) => (
              <div key={h.id} className="flex items-center gap-4 bg-white/5 rounded-xl p-5 shadow-lg">
                <div className="w-[260px]">
                  <div className="text-[18px] font-bold">{h.name}</div>
                  <div className="text-[13px] text-[#9fb3b7] mt-1">
                    Current Streak:{" "}
                    {(() => {
                      let cnt = 0;
                      for (let i = 0; i < h.recent.length; i++) {
                        const v = h.recent[i] ?? 0;
                        if (v > 0) cnt++;
                        else break;
                      }
                      return cnt;
                    })()}{" "}
                    🔥
                  </div>
                  <div className="text-[13px] text-[#9fb3b7] mt-1">Goal: {h.timesPerDay} times/day</div>
                </div>

                {/* HEATMAP */}
                <div className="flex gap-1.5 flex-wrap w-[320px]">
                  {h.recent.map((v, i) => (
                    <div
                      key={i}
                      className={
                        `w-4 h-4 rounded-md ` +
                        (v === 0
                          ? "bg-[#1a1d21] border border-black"
                          : v === 1
                          ? "bg-[#4ade80]"
                          : v === 2
                          ? "bg-[#22c55e]"
                          : v === 3
                          ? "bg-[#16a34a]"
                          : "bg-[#0d8c3d]")
                      }
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-2 ml-auto">
                  <button
                    className="py-1.5 px-2.5 text-sm rounded-lg font-semibold bg-white/5"
                    onClick={() => markToday(h.id)}
                  >
                    Mark Today
                  </button>
                  <button
                    className="py-1.5 px-2.5 text-sm rounded-lg font-semibold bg-transparent border border-white/10 text-[#9fb3b7]"
                    onClick={() => deleteHabit(h.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onMouseDown={closeModal}>
          <div
            className="w-[640px] bg-[#1b2024] rounded-xl p-6 text-[#e8eef0] shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">Create a new habit.</h3>

            <form className="flex flex-col gap-3.5" onSubmit={createHabit}>
              <div className="flex gap-3.5">
                <label className="flex flex-col text-sm gap-1.5 w-1/2">
                  <span>Habit Name</span>
                  <input
                    className="py-2.5 px-2.5 rounded-lg bg-[#0f1114] border border-white/6 text-[#e8eef0]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label className="flex flex-col text-sm gap-1.5 w-1/2">
                  <span>Frequency</span>
                  <select
                    className="py-2.5 px-2.5 rounded-lg bg-[#0f1114] border border-white/6 text-[#e8eef0]"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col text-sm gap-1.5">
                <span>Times Per Day (required)</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={timesPerDay}
                  onChange={(e) => setTimesPerDay(Number(e.target.value))}
                  className="py-2.5 px-2.5 rounded-lg bg-[#0f1114] border border-white/6 text-[#e8eef0]"
                />
              </label>

              <label className="flex flex-col text-sm gap-1.5">
                <span>Description / Goal (optional)</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="py-2.5 px-2.5 rounded-lg bg-[#0f1114] border border-white/6 text-[#e8eef0] min-h-20"
                />
              </label>

              <div className="flex justify-end gap-3 mt-2">
                <button type="button" className="py-2.5 px-3.5 rounded-lg bg-transparent border border-white/10 text-[#9fb3b7]" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="py-2.5 px-3.5 rounded-lg bg-linear-to-br from-[#0af575] to-[#0f8f4b] text-[#04150d]">
                  Create Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
