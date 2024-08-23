import React from "react";
import UsersList from "./UsersList";
import "./Chat.css";
import Filler from "./Filler";
import ChatFiled from "./ChatFiled";
import { useState } from "react";

const Chat = ({ curUser }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [userChange, setUserChange] = useState(true);
  const [curId, setCurId] = useState([]);
  const [messageFlag, setMessageFlag] = useState(false)

  
  const handleMessageFlag = () => {
    setMessageFlag((prev) => !prev)
  }

  const handleChosenUser = (user, id) => {
    setUserInfo([user, id]);
  };

  const handleChatChange = () => {
    setUserChange(() => {
      return !userChange
    })
  }

  const curIdHandler = (value) => {
      setCurId(value)
  }
 
  return (
    <div className="chat">
      <UsersList curUser={curUser} curId={curId} handleChosenUser={handleChosenUser} handleChatChange={handleChatChange} messageFlag={messageFlag} />
      {userInfo.length > 0 ? <ChatFiled userChange={userChange} userInfo={userInfo} curUser={curUser} curIdHandler={curIdHandler} handleMessageFlag={handleMessageFlag} /> : <Filler />}
    </div>
  );
};

export default Chat;
