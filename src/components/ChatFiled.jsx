import Picker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./ChatField.css";
import ChatFieldMessages from "./ChatFieldMessages";

const ChatFiled = ({ userInfo, curUser, userChange, curIdHandler, handleMessageFlag }) => {
  const [message, setMessage] = useState("");
  const [userId, setId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const inputRef = useRef(null)


  useEffect(() => {
    if (userId && userInfo[1]) {
      getMessages();
    }
  }, [userId, userInfo, userChange]);

  useEffect(() => {
    if (userId !== 0) {
      curIdHandler(userId)
    }
  }, [userId])

  useEffect(() => {
    getUserId();
  }, [curUser]);


  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      addMessages();
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => {
      return !prev;
    });
  };

  const onEmojiClick = (event) => {
    setMessage((prev) => prev + event.emoji);
    if (inputRef.current) {
      inputRef.current.focus()
    }
  };

  const getUserId = async () => {
    try {
      const response = await fetch(
        "http://localhost/chatBot/api/getUserId.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: curUser }),
        }
      );

      const result = await response.json();

      if (result.success === false && result.message === "No id found") {
        console.error("No users found:", result.message);
      } else {
        setId(result.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addMessages = async () => {
    try {
      const response = await fetch(
        "http://localhost/chatBot/api/addMessages.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user1: userId,
            user2: userInfo[1],
            message: message,
          }),
        }
      );

      const result = await response.json();

      if (!result.success) {
        console.error(result.message);
      } else {
        setMessage("");
        handleMessageFlag()
        getMessages();
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user1: userId, user2: userInfo[1] }),
        }
      );

      const result = await response.json();

      if (result.success == false) {
        console.error(result.message);
      } else if (Array.isArray(result)) {
        setMessages(result);
      }
    } catch (error) {
      console.error(error);
    }
  };
   
  return (
    <div className="chat-field">
      <div className="chat-field__user">
        <h2 className="chat-field__user--name">{userInfo[0]}</h2>
        <img
          src="/userImg.jpg"
          alt="profileImg"
          className="chat-field__user--img"
        />
      </div>
      <ChatFieldMessages messages={messages} userId={userId} />
      <div className="chat-field__input-container">
        <button
          onClick={toggleEmojiPicker}
          className="chat-field__emoji-button"
        >
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
        <button className="chat-field__send-button" onClick={addMessages}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatFiled;
