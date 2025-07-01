import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/addgoal.css";

function AddGoal() {
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/api/goals", form);
      alert("Goal added successfully!");
      navigate("/study-goals");
    } catch (err) {
      alert("Failed to add goal");
      console.error(err);
    }
  };

  const handleCancel = () => {
    navigate("/study-goals");
  };

  return (
    <div className="goal-container">
      <div className="head">
        <h2>Add New Goal</h2>
      </div>

      <div className="inputs">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input-field"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          className="input-field"
          value={form.startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          className="input-field"
          value={form.endDate}
          onChange={handleChange}
        />
      </div>

      <div className="buttons">
        <button className="btn" onClick={handleSave}>
          Save
        </button>
        <button className="btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddGoal;
