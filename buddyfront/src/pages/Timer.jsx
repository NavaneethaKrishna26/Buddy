import React, { useState, useEffect } from "react";
import "../styles/timer.css";
import axios from "axios";

function TimerPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, "0")} : ${mins
      .toString()
      .padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  const saveSession = async (seconds) => {
    try {
      await axios.post("http://localhost:8080/api/sessions", {
        durationSeconds: seconds,
      });
      console.log("Session saved successfully!");
    } catch (error) {
      console.error("Error saving session:", error);
      alert("Failed to save session!");
    }
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = async () => {
    setIsRunning(false);

    if (elapsedSeconds > 0) {
      await saveSession(elapsedSeconds);
    }
  };

  const handleReset = async () => {
    setIsRunning(false);

    if (elapsedSeconds > 0) {
      await saveSession(elapsedSeconds);
    }

    setElapsedSeconds(0);
  };

  return (
    <div className="timer-container">
      <h1>Study Timer</h1>
      <div className="timer-display">{formatTime(elapsedSeconds)}</div>

      <div className="timer-buttons">
        {!isRunning ? (
          <button className="start-btn" onClick={handleStart}>
            Start
          </button>
        ) : (
          <button className="stop-btn" onClick={handleStop}>
            Stop
          </button>
        )}

        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {!isRunning && elapsedSeconds > 0 && (
        <p className="summary-text">
          You studied for: <strong>{formatTime(elapsedSeconds)}</strong>
        </p>
      )}
    </div>
  );
}

export default TimerPage;
