import React, { useState } from "react";
import "../styles/addtask.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTask() {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/api/tasks", { title });
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      alert("Failed to save task!");
    }
  };

  return (
    <div className="task-container">
      <div className="head">
        <h2>Add New Task</h2>
      </div>

      <div className="inputs">
        <input
          type="text"
          placeholder="Title"
          className="input-field"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="buttons">
        <button className="btn" onClick={handleSave}>
          Save
        </button>
        <button className="btn" onClick={() => navigate("/tasks")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddTask;
