import React, { useEffect, useState } from "react";
import "../styles/notes.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        // Optimistically remove note for animation
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        await axios.delete(`http://localhost:8080/api/notes/${id}`);
        // No need to refetch since we updated state already
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  return (
    <>
      <div className="notescontainer">
        <div className="top">
          <div className="tasks-header">
            <h1>Notes</h1>
            <p>Manage your to-dos and stay organised</p>
          </div>
          <Link to="/add-note" className="plus">
            +
          </Link>
        </div>
        <div className="bottom">
          <div className="note-grid">
            {notes.length === 0 && <p>No notes found.</p>}

            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  className="note"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, height: 0, margin: 0, padding: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="title">{note.title}</div>
                  <div className="para">
                    <Link to={`/show-note/${note.id}`} className="shownote">
                      <p>{note.description}</p>
                    </Link>
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => navigate(`/edit-note/${note.id}`)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(note.id)}>Delete</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;
