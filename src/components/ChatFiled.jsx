import Picker from "emoji-picker-react";
import React, { useEffect, useState, useRef } from "react";
import "./ChatField.css";
import ChatFieldMessages from "./ChatFieldMessages";


/**
 * ChatField Component
 *
 * This component represents the chat interface. It includes a header with the selected user's name,
 * a message display area, an input for typing messages, and an emoji picker.
 *
 * Props:
 * - userInfo (array): Information about the currently selected user (name, id).
 * - curUser (string): The username of the currently logged-in user.
 * - userChange (boolean): A flag indicating if the user in the chat has changed.
 * - curIdHandler (function): A function to handle setting the current user ID.
 * - handleMessageFlag (function): A function to toggle the message flag, indicating new messages.
 *
 * State:
 * - message (string): Stores the message currently being typed.
 * - userId (number): Stores the current user's ID.
 * - messages (array): List of messages between the current user and the selected user.
 * - showEmojiPicker (boolean): Controls the visibility of the emoji picker.
 *
 * Hooks:
 * - useEffect: Used to fetch user ID and messages when needed.
 *
 * Methods:
 * - handleMessage: Updates the state when the user types a message.
 * - handleEnter: Sends the message when the "Enter" key is pressed.
 * - toggleEmojiPicker: Shows or hides the emoji picker.
 * - onEmojiClick: Adds an emoji to the message.
 * - getUserId: Fetches the current user ID from the API.
 * - addMessage: Sends the new message to the API and updates the message list.
 * - getMessages: Fetches messages between the current user and the selected user.
 *
 * Child Components:
 * - ChatFieldMessages: Displays the list of messages.
 */


const ChatField = ({ userInfo, curUser, userChange, curIdHandler, handleMessageFlag }) => {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (userId && userInfo[1]) {
      getMessages();
    }
  }, [userId, userInfo]);

  useEffect(() => {
    if (userId !== 0) {
      curIdHandler(userId);
    }
  }, [userId]);

  useEffect(() => {
    getUserId();
  }, [curUser]);

  const handleMessage = (e) => setMessage(e.target.value);

  const handleEnter = (e) => {
    if (e.key === "Enter" && message.trim()) {
      addMessage();
    }
  };

  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const onEmojiClick = (event) => {
    setMessage((prev) => prev + event.emoji);
    inputRef.current?.focus();
  };

  const getUserId = async () => {
    try {
      const response = await fetch(
        "http://localhost/chatBot/api/getUserId.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: curUser }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setUserId(result.id);
      } else {
        console.error("No users found:", result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addMessage = async () => {
    try {
      const response = await fetch(
        "http://localhost/chatBot/api/addMessages.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user1: userId,
            user2: userInfo[1],
            message: message.trim(),
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setMessage("");
        handleMessageFlag();
        getMessages();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch(
        "http://localhost/chatBot/api/getMessages.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user1: userId, user2: userInfo[1] }),
        }
      );
      const result = await response.json();
      if (Array.isArray(result)) {
        setMessages(result);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-field">
      <div className="chat-field__user">
        <h2 className="chat-field__user--name">{userInfo[0]}</h2>
        <img src="/userImg.jpg" alt="profileImg" className="chat-field__user--img" />
      </div>
      <ChatFieldMessages messages={messages} userId={userId} />
      <div className="chat-field__input-container">
        <button onClick={toggleEmojiPicker} className="chat-field__emoji-button">
          😊
        </button>
        {showEmojiPicker && (
          <div className="chat-field__emoji-picker">
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <input
          type="text"
          className="chat-field__input"
          placeholder="Enter your message..."
          value={message}
          onKeyPress={handleEnter}
          onChange={handleMessage}
          ref={inputRef}
        />
        <button className="chat-field__send-button" onClick={addMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatField;
