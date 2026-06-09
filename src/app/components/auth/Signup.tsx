import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AuthShell } from "./AuthShell";

export function Signup() {
  const { signup, setAuthView } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!signup(name, email, password)) {
      setError("Fill in all fields.");
      return;
    }
    setError("");
  };

  return (
    <AuthShell title="Start with signal" subtitle="Create your account and validate ideas with evidence.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)", display: "block", marginBottom: "6px" }}>
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jake Kim"
            className="w-full rounded-xl px-3 py-2.5 outline-none"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(15,23,42,0.12)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#0f172a",
            }}
          />
        </div>
        <div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)", display: "block", marginBottom: "6px" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@startup.com"
            className="w-full rounded-xl px-3 py-2.5 outline-none"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(15,23,42,0.12)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#0f172a",
            }}
          />
        </div>
        <div>
          <label style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(15,23,42,0.45)", display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl px-3 py-2.5 outline-none"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(15,23,42,0.12)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#0f172a",
            }}
          />
        </div>
        {error && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#ef4444" }}>{error}</p>
        )}
        <button
          type="submit"
          className="w-full py-3 rounded-xl mt-2"
          style={{
            background: "#0f172a",
            color: "#fff",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          Create account
        </button>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(15,23,42,0.5)", textAlign: "center" }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setAuthView("login")}
            style={{ color: "#0f172a", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
          >
            Sign in
          </button>
        </p>
      </form>
    </AuthShell>
  );
}
