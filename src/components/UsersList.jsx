import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const UsersList = ({ curUser, curId, handleChosenUser, handleChatChange, messageFlag }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");


  const searchHandler = (e) => {
    setSearch(e.target.value);
  };


  const getUserData = async (userId) => {
    try {
      const response = await fetch("http://localhost/chatBot/api/userMessageData.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({curId, userId})
      })

      const result = await response.json()

      if (result.success === false) {
        console.log("Dont work");
      } else if (Array.isArray(result)) {
        return result[0]
      }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const getUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost/chatBot/api/userList.php",
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (data.success === false && data.message === "No users found") {
        console.error("No users found:", data.message);
        return;
      }

      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getUsers()
  }, []);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const updatedUsers = await Promise.all(
  //       users.map(async (user) => {
  //         const userInfo = await getUserData(user.id);
  //         return {
  //           ...user,
  //           text: userInfo?.text || "",
  //           time: userInfo?.time || "",
  //         };
  //       })
  //     );
  //     setUsers(updatedUsers);
  //   };

  //   if (users.length > 0) {
  //     fetchUserData()
  //   }

  // }, [messageFlag])
  


  return (
    <div className="userList">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={searchHandler}
        />
        <i className="fas fa-search"></i>
      </div>
      <div className="users">
        {users.map((userArr, key) => {
          const user = userArr.username;
          if (user != curUser) {
            if (search.length > 0) {
              let flag = true;
              for (let i = 0; i < search.length; i++) {
                if (user[i] != search[i]) {
                  flag = false;
                }
              }
              if (flag) {
                return (
                  <div
                    className="user"
                    key={key}
                    onClick={() => {
                      handleChosenUser(user, userArr.id);
                      handleChatChange();
                    }}
                  >
                    <div className="userInfo">
                      <h3 className="name">{user}</h3>
                      <p className="msgTime">12:30</p>
                    </div>
                    <p className="lastMsg">hello</p>
                  </div>
                );
              }
            } else {
              return (
                <div
                  className="user"
                  key={key}
                  onClick={() => {
                    handleChosenUser(user, userArr.id);
                    handleChatChange();
                  }}
                >
                  <div className="userInfo">
                    <h3 className="name">{user}</h3>
                    <p className="msgTime">{user}</p>
                  </div>
                  <p className="lastMsg">{user}</p>
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default UsersList;
