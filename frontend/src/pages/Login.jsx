import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/github";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await login(username, password);

      localStorage.setItem("token", data.access_token);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#161b22] rounded-2xl border border-gray-800 shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          DevHub
        </h1>

        <p className="text-gray-400 text-center mb-8">Sign in to continue</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2">Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold disabled:bg-gray-700"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
