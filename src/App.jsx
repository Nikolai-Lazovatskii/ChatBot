import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import { useState } from "react";

function App() {

  const [curUser, setCurUser] = useState(() => {
    return localStorage.getItem("curUser") || ""
  })

  const handleUser = (data) => {
    setCurUser(data);
    localStorage.setItem("curUser", data);
  };

  return (
    <>
      <Router>
        <Routes>
        <Route path="/login" element={<Login onData={handleUser} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Login onData={handleUser} />} />
        <Route path="/chat" element={<Chat curUser={curUser} />} />
        </Routes>
      </Router>
      {/* <Login />
      <Registration /> */}
    </>
  );
}

export default App;
