import axios from "axios";
import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import insta from "../../public/instaWriting.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import ios  from "../../public/appstore.png"
import android  from "../../public/googleplay.png"

const Register = () => {
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3018/api/register",
      {
        mobile,
        username,
        fullname,
        password,
      });
      navigate("/login");
      console.log("Register response:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(
          "Username or mobile number already exists. Please choose a different one."
        );
      } else {
        setError("Error registering user: " + error.message);
      }
    }
  };
  return (

        <div className="container1">
      <div className="form-container">
        <img className="instaWriting" src={insta} alt="" />
        <p className="login-with-facebook">
          <FontAwesomeIcon icon={faFacebook} />
          <span>Login with Facebook</span>
        </p>
        <div className="or">
          <hr className="hr" />
          <p>or</p>
          <hr className="hr" />
        </div>

        <input
          required
          placeholder="Mobile"
          type="tel"
          className="input"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          required
          placeholder="Full Name"
          type="text"
          className="input"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          required
          placeholder="Username"
          type="text"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          placeholder="Password"
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="cookies">
          People who use our service may have uploaded your contact information
          to Instagram.<span className="learn"> Learn More</span>
        </p>
        <p className="cookies">
          By signing up, you agree to our{" "}
          <span className="learn">
            Terms , Privacy Policy and Cookies Policy .
          </span>
        </p>
        {error && <div className="error">{error}</div>}
        <button className="submit" onClick={handleRegister}>
          Sign Up
        </button>
        <div className="register">
          <p className="signin">Do not have an account? </p>
          <Link className="smt" to="/login">
            Sign In
          </Link>
        </div>
        
      </div>
      <p className="get">Get the app.</p>
      <div className="app-container">
         <img className="app" src={ios} alt="" />
    <img className="app" src={android} alt="" />
      </div>
    </div>

  );
};

export default Register;
