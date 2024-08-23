import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("")

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      username.length > 0 &&
      email.length > 5 &&
      email.includes("@") &&
      password.length > 8
    ) {
      try {
        const response = await fetch(
          "http://localhost/chatBot/api/registration.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
          }
        );

        const result = await response.json();

        // if (result.success) {
        //   setFlag(true);
        // } else {
        //   setFlag(false);
        // }
      } catch (error) {
        console.error(error);
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setMessage("Account created!")
    } else if(username.length == 0) {
      setMessage("Enter username!")
    } else if (email.length < 3 || !email.includes("@")) {
      setMessage("Wrong email!")
    } else if (password.length < 9) {
      setMessage("Password is too short!")
    }
  };

  return (
    <>
      <h1>Registration</h1>
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
            <label htmlFor="email">Email:</label>
            <input
              className="enter"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
            />
          </div>
          <div className="inputReg last">
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

          <button>Create</button>
        </form>
        <p>{message}</p>
        <p>
          Or <Link to="/login">log in</Link>
        </p>
      </div>
    </>
  );
};

export default Registration;
