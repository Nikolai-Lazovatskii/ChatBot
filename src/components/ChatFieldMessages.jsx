import React, { useEffect, useRef } from "react";

const ChatFieldMessages = ({ messages, userId }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatDate = (dateStr) => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    return dateStr === today ? "Today" : dateStr;
  };

  let lastDisplayedDate = "";

  // const isEmoji = (message) => {
  //   const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
  //   return emojiRegex.test(message);
  // };

  return (
    <div className="chat-field__messages">
      {messages.map((message, index) => {
        const messageDate = formatDate(message.time.slice(0, 10));
        const displayTime = message.time.slice(11, 16);
        const isUserMessage = message.id === userId;
        const shouldDisplayDate = lastDisplayedDate !== messageDate;

        if (shouldDisplayDate) {
          lastDisplayedDate = messageDate;
        }

        return (
          <React.Fragment key={index}>
            {shouldDisplayDate && (
              <div className="chat-field__date">{messageDate}</div>
            )}

            <div
              className={`chat-field__message ${
                isUserMessage
                  ? "chat-field__message--self"
                  : "chat-field__message--user" 
                  // &&  message.message.length === 1 &&
                  //   isEmoji(message.message)
                  // ? "chat-field__message--emoji"
                  // : ""
              }`}
            >
              {message.message}
              <p
                className={`chat-field__message--time ${
                  isUserMessage ? "self-time" : "user-time"
                }`}
              >
                {displayTime}
              </p>
            </div>
          </React.Fragment>
        );
      })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatFieldMessages;
