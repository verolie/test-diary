"use client";

import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showMessage("Email and password are required!", "error");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data.user.username);

      if (response.ok) {
        // Simpan username & token di localStorage
        localStorage.setItem(
          "authData",
          JSON.stringify({ username: data.user.username, token: data.token })
        );

        showMessage("Login successful!", "success");

        // Redirect ke dashboard atau halaman lain (opsional)
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        showMessage(data.message || "Login failed!", "error");
      }
    } catch (error) {
      showMessage("Network error. Please try again.", "error");
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {message.text && (
          <div
            className={`mt-4 p-2 text-center text-sm font-semibold rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}
