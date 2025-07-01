import React, { useState, useEffect } from "react";
import "../styles/addtask.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await axios.get(`http://localhost:8080/api/tasks/${id}`);
        setForm({
          title: res.data.title,
          description: res.data.description,
          dueDate: res.data.dueDate,
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load task data!");
      }
    }
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.placeholder.toLowerCase().replace(" ", "")]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${id}`, form);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
      alert("Failed to update task!");
    }
  };

  return (
    <div className="task-container">
      <div className="head">
        <h2>Edit Task</h2>
      </div>

      <div className="inputs">
        <input
          type="text"
          placeholder="Title"
          className="input-field"
          value={form.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          className="input-field"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Due Date"
          className="input-field"
          value={form.dueDate}
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

export default EditTask;
