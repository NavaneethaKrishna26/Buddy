import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import axios from "axios";
import { motion } from "framer-motion";

function Dashboard() {
  const [userName, setUserName] = useState("Krishna");
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalGoals, setTotalGoals] = useState(0);
  const [totalStudyTimeHours, setTotalStudyTimeHours] = useState(0);

  const quotes = [
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Don’t wait for opportunity. Create it.",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
    "Discipline is the bridge between goals and accomplishment.",
    "It always seems impossible until it’s done.",
    "Work hard until your idols become your rivals.",
  ];

  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const quoteOfTheDay = quotes[dayOfYear % quotes.length];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj.name) {
          setUserName(userObj.name);
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const tasksRes = await axios.get("http://localhost:8080/api/tasks");
      setTotalTasks(tasksRes.data.length);

      const goalsRes = await axios.get("http://localhost:8080/api/goals");
      setTotalGoals(goalsRes.data.length);

      const sessionsRes = await axios.get("http://localhost:8080/api/sessions");
      const totalSeconds = sessionsRes.data.reduce(
        (sum, session) => sum + session.durationSeconds,
        0
      );
      const totalHours = (totalSeconds / 3600).toFixed(2);
      setTotalStudyTimeHours(totalHours);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div 
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="left-section" variants={itemVariants}>
          <motion.div className="div1" variants={itemVariants}>
            <h1>Hello, {userName}!!!</h1>
          </motion.div>
          <motion.div className="div2" variants={itemVariants}>
            <h4>Today's Quote</h4>
          </motion.div>
          <motion.div className="div3" variants={itemVariants}>
            <p>{quoteOfTheDay}</p>
          </motion.div>
        </motion.div>
        <motion.div className="right-section" variants={itemVariants}>
          <div className="quick">
            <h3>Quick Stats</h3>
          </div>
          <motion.div className="box" variants={containerVariants}>
            <motion.div className="stat" variants={itemVariants}>
              <div>Total Tasks</div>
              <div>
                <h1>{totalTasks}</h1>
              </div>
            </motion.div>
            <motion.div className="stat" variants={itemVariants}>
              <div>Total Goals</div>
              <div>
                <h1>{totalGoals}</h1>
              </div>
            </motion.div>
            <motion.div className="stat" variants={itemVariants}>
              <div>Total Study Time (hrs)</div>
              <div>
                <h1>{totalStudyTimeHours}</h1>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Dashboard;
