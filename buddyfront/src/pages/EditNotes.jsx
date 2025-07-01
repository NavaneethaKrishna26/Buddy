import React, { useState, useEffect } from "react";
import "../styles/addnotes.css"; // reuse your AddNotes styles
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditNotes() {
  const { id } = useParams(); // get note id from URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch note data by ID when component mounts
    axios
      .get(`http://localhost:8080/api/notes/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load note:", err);
        alert("Failed to load note");
        navigate("/notes"); // redirect if error
      });
  }, [id, navigate]);

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/notes/${id}`, {
        title,
        description,
      });
      alert("Note updated successfully!");
      navigate("/notes");
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to update note");
    }
  };

  const handleCancel = () => {
    navigate("/notes");
  };

  if (loading) {
    return <p>Loading note data...</p>;
  }

  return (
    <div className="notes-container">
      <div className="head">
        <h2>Edit Note</h2>
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
        <button className="btn" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditNotes;
