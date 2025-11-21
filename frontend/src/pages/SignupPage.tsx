import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../services/api.js";

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
      } else {
        setSuccess("Account created successfully!");
        setTimeout(() => navigate("/login"), 1200);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full bg-(--bg)">
      <div className="w-1/2 p-16 flex flex-col justify-center">
        <img src="/graphimage.png" alt="Graph" className="w-[320px] mb-8 opacity-90" />
        <h1 className="text-[42px] font-semibold">HabitFlow:</h1>
        <h1 className="text-[36px] font-bold mt-2">
          Master your days,
          <br /> visualize your success.
        </h1>
        <p className="mt-5 text-[#aaaaaa] text-sm">A professional habit tracker built for consistency.</p>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <form className="bg-[#1c1f25] p-9 w-[350px] rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.4)]" onSubmit={handleSubmit}>
          <h2 className="text-[24px] mb-5">Create account</h2>

          <label className="text-sm block mt-2">Email Address</label>
          <input
            type="email"
            className="w-full p-2.5 mt-1 rounded-md border border-[#333] bg-[#0f1115] text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#0f1115",
              color: "white",
            }}
          />

          <label className="text-sm block mt-2">Password</label>
          <input
            type="password"
            className="w-full p-2.5 mt-1 rounded-md border border-[#333] bg-[#0f1115] text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#0f1115",
              color: "white",
            }}
          />

          <label className="text-sm block mt-2">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2.5 mt-1 rounded-md border border-[#333] bg-[#0f1115] text-white"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              marginBottom: "12px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#0f1115",
              color: "white",
            }}
          />

          {error && (
            <div style={{ color: "salmon", marginBottom: "10px" }}>{error}</div>
          )}
          {success && (
            <div style={{ color: "lightgreen", marginBottom: "10px" }}>
              {success}
            </div>
          )}

          <button type="submit" className="w-full bg-(--accent) py-3 rounded-md mt-5 text-base font-semibold hover:bg-[#18a84c]" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>

          <p className="text-center mt-5 text-[#cccccc]">
            Already have an account? <Link className="text-(--accent) no-underline" to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
