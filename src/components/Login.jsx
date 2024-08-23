import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);

  const handleData = (value) => {
    onData(value)
  }

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/chatBot/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        setFlag(false);
        onData(username)
        navigate("/chat");
      } else {
        setFlag(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="inputReg">
            <label htmlFor="login">Username:</label>
            <input
              className="enter"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsername}
              placeholder="Username"
            />
          </div>
          <div className="inputReg">
            <label htmlFor="pass">Password:</label>
            <input
              className="enter"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
            />
          </div>
          <label htmlFor="remember" className="remember">
            <input
              className="rememberCheck"
              type="checkbox"
              id="remember"
              name="remember"
            />
            Remember me
          </label>

          <button type="submit">Log In</button>
        </form>
        {flag ? <p className="error">Invalid password!</p> : ""}
        <p>
          Or <Link to="/register">create</Link> new account
        </p>
      </div>
    </>
  );
};

export default Login;
