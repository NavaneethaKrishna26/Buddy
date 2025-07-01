import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/goals.css";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [strikedIds, setStrikedIds] = useState(new Set());

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/goals");
      setGoals(res.data);
    } catch (err) {
      console.error("Error fetching goals:", err);
    }
  };

  const handleGoalClick = (id) => {
    // Add id to strikedIds to trigger CSS strike-through animation
    setStrikedIds((prev) => new Set(prev).add(id));

    // Wait 600ms (animation duration + buffer) before deleting
    setTimeout(async () => {
      try {
        await axios.delete(`http://localhost:8080/api/goals/${id}`);
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
        setStrikedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      } catch (err) {
        alert("Failed to delete goal");
        setStrikedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        console.error(err);
      }
    }, 600); // Match the animation duration here
  };

  return (
    <div className="goals-container">
      <div className="goals-header">
        <h2 className="title">Goals</h2>
        <Link to="/add-goal" className="plus">
          +
        </Link>
      </div>

      <div className="goal-table">
        <div className="goal-row header">
          <div>Goals</div>
          <div className="goal-date-label">Start Date</div>
          <div className="goal-date-label">End Date</div>
        </div>

        {goals.length === 0 ? (
          <div className="goal-row">No goals found.</div>
        ) : (
          goals.map((goal) => (
            <div
              key={goal.id}
              className={`goal-row ${strikedIds.has(goal.id) ? "striked" : ""}`}
              onClick={() => handleGoalClick(goal.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="goal-name">{goal.title}</div>
              <div className="goal-date">{goal.startDate}</div>
              <div className="goal-date">{goal.endDate}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Goals;
