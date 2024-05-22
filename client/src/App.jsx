import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

function App() {
  return <>
  <Router>
      <Routes> 
      <Route exact path="/profile" element={<Profile/>} /> 
        <Route exact path="/login" element={<Login/>} /> 
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router> 
  </>;
}

export default App;
