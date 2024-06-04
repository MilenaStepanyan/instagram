import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Post from "./components/Post";
import Search from "./components/Search";
import Chat from "./components/Chat";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3018");

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/post" element={<Post />} />
        <Route path="/chat/:username" element={<Chat socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
