import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/signup.css";
import buddy from "../assets/buddy.jpg";
import { motion } from "framer-motion";

function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );
      alert(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <motion.img
          src={buddy}
          alt="Buddy Logo"
          className="buddy-logo"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      <div>
        <motion.div
          className="login-box"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;
