import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import Notes from "./pages/Notes";
import AddNotes from "./pages/AddNotes";
import Goals from "./pages/Goals";
import AddGoal from "./pages/AddGoal";
import AskAI from "./pages/AskAI";
import Profile from "./pages/Profile";
import Timer from "./pages/Timer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditNotes from "./pages/EditNotes";
import EditTask from "./pages/EditTask";
import "./app.css";
import "./assets/buddy.jpg";
import user from "./assets/user.png"
function App() {
  const location = useLocation();

  // Paths where you DON'T want the navbar
  const hideNavbarPaths = ["/login", "/signup","/"];

  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/add-note" element={<AddNotes />} />
        <Route path="/study-goals" element={<Goals />} />
        <Route path="/add-goal" element={<AddGoal />} />
        <Route path="/ask-ai" element={<AskAI />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit-note/:id" element={<EditNotes />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
      </Routes>
    </>
  );
}

export default App;
