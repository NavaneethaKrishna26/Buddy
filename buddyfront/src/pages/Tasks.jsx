import React, { useState, useEffect } from "react";
import "../styles/tasks.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Remove task immediately for animation
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      // Optionally fetch again if needed:
      // fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div className="taskcontainer">
        <div className="top">
          <div className="tasks-header">
            <h1>Tasks</h1>
            <p>Manage your to-dos and stay organised</p>
          </div>
          <Link to="/add-task" className="plus">+</Link>
        </div>
        <div className="listitems">
          <ul>
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.li
                  key={task.id}
                  className="task-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, height: 0, margin: 0, padding: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="task-title">{task.title}</span>
                  <div className="task-actions">
                    <Link to={`/edit-task/${task.id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Tasks;
