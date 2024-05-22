import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import insta from "../../public/instaWriting.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import ios from "../../public/appstore.png";
import android from "../../public/googleplay.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3018/api/login', { username, password });
      if (response.data && response.data.token) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate("/profile");
      } else {
        setError('Login failed. Token not found in response.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <>
      <div className="main">
        <form className="login-container">
          <img className="instaWriting" src={insta} alt="" />
          <label htmlFor="text label">
            <input
              required=""
              placeholder="UserName"
              type="text"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password label">
            <input
              required=""
              placeholder="Password"
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
          <div className="or">
            <hr className="hr" />
            <p>or</p>
            <hr className="hr" />
          </div>
          <p className="login-with-facebook-btn">
            <FontAwesomeIcon icon={faFacebook} />
            <span>Login with Facebook</span>
          </p>
          <div className="register">
            <p className="signin">Do not have an account? </p>
            <Link className="smt" to="/register">
              Sign up
            </Link>
          </div>
        </form>
        <p className="get">Get the app.</p>
        <div className="app-container">
          <img className="app" src={ios} alt="" />
          <img className="app" src={android} alt="" />
        </div>

        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default Login;
