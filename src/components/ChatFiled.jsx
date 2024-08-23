import Picker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./ChatField.css";

const ChatFiled = ({ userInfo, curUser, userChange, curIdHandler, handleMessageFlag }) => {
  const [message, setMessage] = useState("");
  const [userId, setId] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const inputRef = useRef(null)
  const messageEnd = useRef(null);

  let lastMessage = [];

  useEffect(() => {
    if (userId !== 0) {
      curIdHandler(userId)
    }
  }, [userId])

  useEffect(() => {
    if (userId && userInfo[1]) {
      getMessages();
    }
  }, [userId, userInfo, userChange]);

  useEffect(() => {
    getUserId();
  }, [curUser]);

  useEffect(() => {
    moveBottom();
  }, [messages]);

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

  const moveBottom = () => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatDate = (dateStr) => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    return dateStr === today ? "Today" : dateStr;
  };

  let currentDate = "";

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
      <div className="chat-field__messages">
        {messages.map((messageText, key) => {
          if (key === messageText.length - 1) {
            lastMessage.push(messageText.text);
            lastMessage.push(messageText.time);
          }
          let date = "";
          let flag = false;
          const messageDate = formatDate(messageText.time.slice(0, 10));

          if (currentDate !== messageDate) {
            flag = true;
            currentDate = messageDate;
          }

          // if (messageDate != currentDate) {
          //   const dateFormated = formatDate(messageDate);
          //   currentDate = messageDate;
          //   <div className="chat-field__date">{currentDate}</div>;
          // }

          date += messageText.time.slice(10, 16);

          if (messageText.id == userId) {
            return (
              <React.Fragment key={key}>
                {flag ? (
                  <div className="chat-field__date">{messageDate}</div>
                ) : (
                  ""
                )}
                <div
                  key={key}
                  className="chat-field__message chat-field__message--self"
                >
                  {messageText.message}{" "}
                  <p className="chat-field__message--time self-time">{date}</p>
                </div>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={key}>
                {flag ? (
                  <div className="chat-field__date">{messageDate}</div>
                ) : (
                  ""
                )}
                <div
                  key={key}
                  className="chat-field__message chat-field__message--user"
                >
                  {messageText.message}{" "}
                  <p className="chat-field__message--time user-time">{date}</p>
                </div>
              </React.Fragment>
            );
          }
        })}
        <div ref={messageEnd} />
      </div>
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
