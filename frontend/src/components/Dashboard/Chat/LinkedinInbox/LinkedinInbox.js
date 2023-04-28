import React, {useState} from "react";
import "./LinkedinInbox.css";
import MessageIcon from "../../../../images/Inbox/message.png";
import Settings from "../../../../images/Inbox/Oval.png";
import SearchIcon from "../../../../images/Inbox/SearchIcon.png";
import MoreIcon from "../../../../images/Inbox/more.png";
import UserImg from "../../../../images/Inbox/userImg.png";
import SettingIcon from "../../../../images/Inbox/settings.png";
import StarIcon from "../../../../images/Inbox/star.png";
import CameraIcon from "../../../../images/Inbox/video.png";
import GalleryIcon from "../../../../images/Inbox/Gallery.png";
import AttachmentIcon from "../../../../images/Inbox/attachment.png";
import GifIcon from "../../../../images/Inbox/gif.png";
import EmojiIcon from "../../../../images/Inbox/emoji.png";
import VideoModal from "../../../../components/Dashboard/VideoModal/VideoModal";

const conversationsData = [
  {
    id: 1,
    img: UserImg,
    name: "Andrew Martin",
    message: "Can you send me the invoice",
    date: new Date(),
  },
  {
    id: 2,
    img: UserImg,
    name: "John Doe",
    message: "Hello, how are you?",
    date: new Date(),
  },
  {
    id: 3,
    img: UserImg,
    name: "Jane Doe",
    message: "Thanks for your help!",
    date: new Date(),
  },
  ,
  {
    id: 4,
    img: UserImg,
    name: "Jane Doe",
    message: "Thanks for your help!",
    date: new Date(),
  },
  ,
  {
    id: 5,
    img: UserImg,
    name: "Jane Doe",
    message: "Thanks for your help!",
    date: new Date(),
  },
  {
    id: 6,
    img: UserImg,
    name: "Jane Doe",
    message: "Thanks for your help!",
    date: new Date(),
  },
  {
    id: 7,
    img: UserImg,
    name: "Jane Doe",
    message: "Thanks for your help!",
    date: new Date(),
  },
];

function Message({ text, isUser }) {
  return (
    <div className={`message ${isUser ? "user-message" : "other-message"}`}>
      <p>{text}</p>
    </div>
  );
}

const Inbox = () => {
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const handleFocus1 = () => {
    setIsFocused1(true);
  };                      

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  // Add a new state for search input value
  const [searchValue, setSearchValue] = useState("");

  // Add a function to handle search input value change
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Filter conversations based on search value
  const filteredConversations = conversationsData.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      conversation.message.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Message functions

  const [messages, setMessages] = useState([
    { text: "Hi there!", isUser: false },
    { text: "Hey! How are you?", isUser: true },
    { text: "I'm doing well, thanks. How about you?", isUser: false },
    { text: "Good, thanks for asking.", isUser: true },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const newMessages = [...messages, { text: newMessage, isUser: true }];
    setMessages(newMessages);
    setNewMessage("");
  };

  // Select file from Computer


  // const [selectedDirectory, setSelectedDirectory] = useState(null);

  // const [file, setFile] = useState(null);

  // function handleFileChange(event) {
  //   setFile(event.target.files[0]);
  // }

  // function handleButtonClick() {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*";
  //   input.onchange = handleFileChange;
  //   input.click();
  // }

  // Modal

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="lichat-main">
        <div className="left-inbox col-3">
          <div className="heading">
            <h2>Messaging</h2>
            <div>
              <img
                style={{ cursor: "pointer" }}
                onClick={handleVideoModal}
                src={Settings}
                alt=""
              />
              <a href="/">
                <img src={MessageIcon} alt="" />
              </a>
            </div>
          </div>
          <div className="search">
            <div>
              <img src={SearchIcon} alt="" />
              <input
                placeholder="Search Messages"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
            <img src={MoreIcon} alt="" />
          </div>
          <div className="focused">
            <button
              className={isFocused1 ? "focused-btn" : "focused-button"}
              onFocus={handleFocus1}
              onBlur={handleBlur1}
            >
              Focused
            </button>
            <button
              className={isFocused2 ? "focused-btn" : "focused-button"}
              onFocus={handleFocus2}
              onBlur={handleBlur2}
            >
              Other
            </button>
          </div>
          {filteredConversations.map((conversation) => (
            <div className="conversations" key={conversation.id}>
              <div className="d-flex align-items-center">
                <img src={conversation.img} alt="" className="img-fluid" />
                <div className="align-items-center">
                  <h5>{conversation.name}</h5>
                  <p>{conversation.message}</p>
                </div>
              </div>

              <span>
                {conversation.date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
        <div className="col-9 overflow-hidden ">
          <div className="inbox-header">
            <div>
              <h5>Andrew Martin </h5>
              <p>Hr Execute</p>
            </div>
            <div className="d-flex align-items-center">
              <img src={SettingIcon} alt="" />
              <img
                style={{ cursor: "pointer" }}
                onClick={handleVideoModal}
                src={CameraIcon}
                alt=""
              />
              <img SRC={StarIcon} alt="" />
            </div>
          </div>
          <div className="messaging-template">
            <div className="message-container">
              {messages.map((message, index) => (
                <Message
                  key={index}
                  text={message.text}
                  isUser={message.isUser}
                />
              ))}
            </div>
          </div>
          <div className="chatting">
            <div className="input-container">
              <input
                type="text"
                placeholder="Write a message..."
                value={newMessage}
                onChange={handleNewMessage}
              />
            </div>
            <div className="attachments">
              <div>
                {/* <div>
                  <button onClick={handleButtonClick}>
                    
                  </button>
                  {file && <p>Selected file: {file.name}</p>}
                </div> */}
                <img src={GalleryIcon} alt="Gallery" />
                <img src={AttachmentIcon} alt="" />
                <img src={GifIcon} alt="" />
                <img src={EmojiIcon} alt="" />
              </div>
              <div>
                <button onClick={handleSendMessage}>Send</button>
                <img src={SettingIcon} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <VideoModal onClose={handleModalClose} />}
    </>
  );
};

export default Inbox;
