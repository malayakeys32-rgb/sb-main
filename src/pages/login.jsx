Ximport React, { useState } from "react";
import { apiPost } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const result = await apiPost("/api/auth/login", { email, password });

    if (result.ok) {
      localStorage.setItem("sb_token", result.token);
      window.location.href = "/dashboard";
    } else {
      alert(result.error);
    }
  }

  return (
    <div className="login">
      <h1>Sentinel‑Black Login</h1>

      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
