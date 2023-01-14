import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import "./ChatBox.css";

function ChatBox({ chat, currentUser, setSendMessage, receiveMessage }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const  scroll = useRef();

  // set  value of input
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Fetching Data for headers
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) {
      getUserData();
    }
  }, [chat, currentUser]);


  // fetching  messages
  useEffect(() => {
    const fetchingMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      fetchingMessages();
    }
  }, [chat]);

  // Always scroll to last Message
  
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages]) 

  
  //  send Message function
  const handleSend = async (event) => {
    event.preventDefault();

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    // send message  to socket server
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });

    // Send messages to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  
  
  useEffect(() => {
    if (receiveMessage !== null  && receiveMessage?.chatId===chat?._id) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.React + "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>

            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div ref = {scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            {/* Chat Sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a Chat Conversation...
          </span>
        )}
      </div>
    </>
  );
}

export default ChatBox;
