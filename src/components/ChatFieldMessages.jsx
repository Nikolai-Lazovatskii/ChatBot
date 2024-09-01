import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const ChatFieldMessages = ({ messages, userId }) => {

  const messageEnd = useRef(null);

  let lastMessage = [];

  useEffect(() => {
    moveBottom();
  }, [messages]);


  const formatDate = (dateStr) => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    return dateStr === today ? "Today" : dateStr;
  };

  let currentDate = "";

  const moveBottom = () => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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
  );
};

export default ChatFieldMessages;
