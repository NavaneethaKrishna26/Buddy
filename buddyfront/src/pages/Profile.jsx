import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";
import { motion } from "framer-motion";

function Profile() {
  const [user, setUser] = useState({
    name: "Guest",
    email: "guest@example.com",
    id: "N/A",
  });

  const [stats, setStats] = useState({
    totalTasksDone: 0,
    totalGoalsDone: 0,
    totalStudyTime: "0h 0m",
  });

  useEffect(() => {
    const fetchUserAndStats = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser({
            name: userData.name || "Unknown",
            email: userData.email || "No email",
            id: userData.id || "N/A",
          });
        }

        const tasksRes = await axios.get("http://localhost:8080/api/tasks");
        const totalTasksDone = tasksRes.data.length;

        const goalsRes = await axios.get("http://localhost:8080/api/goals");
        const totalGoalsDone = goalsRes.data.length;

        const sessionsRes = await axios.get("http://localhost:8080/api/sessions");
        const totalSeconds = sessionsRes.data.reduce(
          (sum, session) => sum + (session.durationSeconds || 0),
          0
        );
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const totalStudyTime = `${hours}h ${minutes}m`;

        setStats({
          totalTasksDone,
          totalGoalsDone,
          totalStudyTime,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserAndStats();
  }, []);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.4 },
    }),
  };

  return (
    <motion.div
      className="profile-container"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <motion.div className="profile-card">
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-id">User ID: {user.id}</p>

        <div className="profile-stats">
          {[
            { label: "Total Tasks Done", value: stats.totalTasksDone },
            { label: "Total Goals Done", value: stats.totalGoalsDone },
            { label: "Total Study Time", value: stats.totalStudyTime },
          ].map((stat, index) => (
            <motion.div
              className="stat-item"
              key={stat.label}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={statVariants}
            >
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Profile;
