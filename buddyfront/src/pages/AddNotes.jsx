import React, { useState } from "react";
import "../styles/addnotes.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddNotes() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/notes", { title, description });
      navigate("/notes");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleCancel = () => {
    navigate("/notes");
  };

  return (
    <div className="notes-container">
      <div className="head">
        <h2>Add New Note</h2>
      </div>

      <div className="inputs">
        <input
          type="text"
          placeholder="Title"
          className="input-field"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="input-area"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
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

export default AddNotes;
