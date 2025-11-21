import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TEMP behavior (replace with backend later)
    if (email && password) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="flex h-screen w-full bg-(--bg)">

      {/* LEFT PANEL */}
      <div className="w-1/2 p-16 flex flex-col justify-center">
        <img src="/graphimage.png" alt="Graph" className="w-[320px] mb-8 opacity-90" />

        <h1 className="text-[42px] font-semibold">HabitFlow:</h1>
        <h1 className="text-[36px] font-bold mt-2">
          Master your days,
          <br /> visualize your success.
        </h1>

        <p className="mt-5 text-[#aaaaaa] text-sm">
          A professional habit tracker built for consistency.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 flex justify-center items-center">
        <form className="bg-[#1c1f25] p-9 w-[350px] rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.4)]" onSubmit={handleSubmit}>
          <h2 className="text-[24px] mb-5">Sign In</h2>

          <label className="text-sm block mt-2">Email Address</label>
          <input
            type="email"
            className="w-full p-2.5 mt-1 rounded-md border border-[#333] bg-[#0f1115] text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-sm block mt-2">Password</label>
          <input
            type="password"
            className="w-full p-2.5 mt-1 rounded-md border border-[#333] bg-[#0f1115] text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-end">
            <a className="mt-2 text-[13px] text-[#6db2ff] no-underline" href="#">Forgot password?</a>
          </div>

          <button type="submit" className="w-full bg-(--accent) py-3 rounded-md mt-5 text-base font-semibold hover:bg-[#18a84c]">
            Sign In
          </button>

          <p className="text-center mt-5 text-[#cccccc]">
            Don't have an account? <a className="text-(--accent) no-underline" href="#">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
