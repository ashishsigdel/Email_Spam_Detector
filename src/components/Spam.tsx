"use client";

import React, { useState } from "react";
import axios from "axios";

const SpamDetector: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setResult("");

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        message,
      });

      if (response.data.spam === 1) {
        setResult("Spam");
      } else {
        setResult("Not Spam");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Error detecting spam. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Email/SMS Spam Detector
        </h1>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={5}
            cols={50}
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
          />
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md transition-colors duration-200"
            >
              Detect Spam
            </button>
          </div>
        </form>

        {result && (
          <h2 className="text-2xl font-semibold text-center text-green-700 mt-6">
            {result === "Spam" ? "🚫 Spam" : "✅ Not Spam"}
          </h2>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default SpamDetector;
