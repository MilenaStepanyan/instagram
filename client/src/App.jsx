import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Post from "./components/Post";
import Search from "./components/Search";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/search" element={<Search/>}/>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/post" element={<Post/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
