import React from "react";
import UsersList from "./UsersList";
import "./Chat.css";
import Filler from "./Filler";
import ChatFiled from "./ChatFiled";
import { useState } from "react";


/**
 * Chat Component
 * 
 * This is the main component for rendering the chat interface. It includes a user list on the left 
 * and the chat field on the right. It manages the state of the selected user, user messages, 
 * and handles communication between child components like UsersList, ChatFiled, and Filler.
 *
 * Props:
 * - curUser (object): The currently logged-in user object. Used to identify the user in the chat.
 *
 * State:
 * - userInfo (array): Stores the selected user's information (name, id) for the chat.
 * - userChange (boolean): A flag that tracks whether the user in the chat has changed.
 * - curId (array): Holds the ID of the currently selected user.
 * - messageFlag (boolean): Flag that indicates whether new messages are being processed or not.
 *
 * Methods:
 * - handleMessageFlag: Toggles the messageFlag state.
 * - handleChosenUser: Accepts user and ID, then updates the selected user's information.
 * - handleChatChange: Toggles the userChange state when the user in the chat is changed.
 * - curIdHandler: Updates the curId state with the given value.
 *
 * Child Components:
 * - UsersList: Displays the list of users that the current user can chat with.
 * - ChatFiled: Renders the chat interface when a user is selected.
 * - Filler: Renders a placeholder when no user is selected for chat.
 */


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
