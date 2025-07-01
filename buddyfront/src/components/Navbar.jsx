import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/navbar.css";
import buddy from "../assets/buddy.jpg";
import user from "../assets/user.png";

function Navbar() {
  // Animation variants for nav links sliding down
  const navLinksVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const navItemVariant = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Animation for the logo
  const logoVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="navcontainer">
      <motion.div
        className="logo"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link to="/dashboard">
          <img src={buddy} alt="buddylogo" />
        </Link>
      </motion.div>

      <motion.div 
        className="navlinks" 
        variants={navLinksVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="items" variants={navItemVariant}>
          <Link to="/tasks">My Tasks</Link>
        </motion.div>
        <motion.div className="items" variants={navItemVariant}>
          <Link to="/notes">My Notes</Link>
        </motion.div>
        <motion.div className="items" variants={navItemVariant}>
          <Link to="/study-goals">My Goals</Link>
        </motion.div>
        <motion.div className="items" variants={navItemVariant}>
          <Link to="/ask-ai">Ask AI</Link>
        </motion.div>
        <motion.div className="items" variants={navItemVariant}>
          <Link to="/timer">Timer</Link>
        </motion.div>
      </motion.div>

      <div className="profile">
        <motion.div 
          className="imgitem"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/profile">
            <img src={user} alt="User Profile" />
          </Link>
        </motion.div>

        <div className="profileitems">
          <Link to="/">Logout</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
