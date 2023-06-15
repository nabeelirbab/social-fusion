import React, { useState ,useEffect,useRef} from "react";
import "./LinkedinInbox.css";
import '../chat.css'
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
import VideoModal from "../../VideoModal/VideoModal";
import { getChats,getChat,sendChat } from "../../../Linkedin/helperFunctions";
import ln from '../../../../images/Landing/LinkedIn-Symbole.png'
import axios from "axios";
import { getVideo } from "../../../Linkedin/helperFunctions";
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
  ,
  {
    id: 6,
    img: UserImg,
    name: "Jane Doe",
    message: "Thanks for your help!",
    date: new Date(),
  },
  ,
  {
    id: 7,
    img: UserImg,
    name: "Jane Doe",
    message: "Thanks for your help!",
    date: new Date(),
  },
];


function Message({ text, fromMe, img, videoUrl }) {
  getVideo('urn:li:digitalmediaAsset:D4D23AQGHxqrLfJFTrw')

  const className = fromMe
    ? "message user-message"
    : "message other-message";

  return (
    <div className={className}>
      {console.log(videoUrl)}
      {/* {videoUrl && 
      } */}
      {
        text &&
        <p>{text}</p>
      }
      {
        img &&
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img src={img} alt='image' className="chat-img" />
      }
      {videoUrl && (
    <video video width="320" height="240" controls>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
)}

    </div>
  );
}

const Inbox = () => {
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
  const getVideoUrl=async (urn)=>{
    const res =await axios.get(` https://api.linkedin.com/rest/videos/${urn}`)
    console.log('>>>>>',res);
  }

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
      useEffect(() => {
        // fetch conversations from backend API and set them to state
        getChats().then((data) => {
            setConversations(data);
        });
      }, []);
  
    useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter conversations based on search value
  const filteredConversations = conversationsData.filter(
    (conversation) =>
      conversation.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      conversation.message.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Message functions

  // const [messages, setMessages] = useState([
  //   { text: "Hi there!", isUser: false },
  //   { text: "Hey! How are you?", isUser: true },
  //   { text: "I'm doing well, thanks. How about you?", isUser: false },
  //   { text: "Good, thanks for asking.", isUser: true },
  // ]);

  const [newMessage, setNewMessage] = useState("");

  const handleNewMessage = (event) => {
    setNewMessage(event.target.value);
  };

async function handleSendMessage(profileId) {
   const newMessages = [{ text: newMessage, isUser: true }, ...messages];


  if (profileId) {
    try {
      await sendChat(profileId, newMessage);
    } catch (error) {
      console.log("Error sending message:", error);
      return;
    }
  }

  setMessages(newMessages);
  setNewMessage("");
}


  const [selectedDirectory, setSelectedDirectory] = useState(null);

  // Select file from Computer

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



  const handleConversationClick = ({ conversation, profileId }) => {
    // handle click on conversation item and set selected conversation to state
        setSelectedConversation({ conversation,profileId });
    getChat(profileId).then((data) => {
      console.log('dd',data)
      setMessages(data);
    });
  };
  const getProfilePic = (participants) => {
    for (let i = 0; i < participants?.length; i++) {
      const participant = participants[i];
      if (
        participant?.picture &&
        participant?.picture?.rootUrl &&
        participant?.picture?.artifacts &&
        participant?.picture?.artifacts?.length > 0
      ) {
        return (
          participant?.picture?.rootUrl +
          participant?.picture?.artifacts[0]?.fileIdentifyingUrlPathSegment
        );
      }
    }
  };
  const reversedMessages = messages?.slice().reverse();


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
        {conversations?.map((conversation) => {
          const participant = conversation?.participants[0];
          const name =
            participant?.firstName && participant?.lastName
              ? `${participant.firstName} ${participant.lastName}`
              : null;
          const profilePic = getProfilePic(conversation?.participants);
          const profileId = participant?.profileId;
          const conversationId = conversation?.conversationId;

          if (!name) {
            // if either name or profile pic is undefined, return null
            return null;
          }

          return (
            <div
              key={conversationId}
              className={`conversation-item ${
                selectedConversation?.conversationId === conversationId
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                handleConversationClick({ conversation, profileId })
              }
            >
              {profilePic ? (
                <img
                  src={profilePic}
                  alt={`${name} profile`}
                  className="img-fluid"
                />
              ) : (
                <img
                  src={UserImg}
                  alt={`${name} profile`}
                  className="img-fluid"
                />
              )}
              <span>{name}</span>
            </div>
          );
        })}
      </div>
      {selectedConversation && (
        <div className="col-9">
          <div className="inbox-header">
             <div>
               {selectedConversation?.conversation?.participants[0]?.profileId}
              <h5>{selectedConversation?.conversation?.participants[0]?.firstName} {selectedConversation.conversation?.participants[0]?.lastName}</h5>
              {/* <p>Hr Execute</p> */}
            </div>
            {/* <div className="d-flex align-items-center">
              <img src={SettingIcon} alt="" />
              <img
                style={{ cursor: "pointer" }}
                onClick={handleVideoModal}
                src={CameraIcon}
                alt=""
              />
              <img SRC={StarIcon} alt="" />
            </div> */}
          </div>
          <div className="messaging-template">
            <div className="message-container">
               {reversedMessages
    ?.map((message) => {
      const { text, sentFrom } = message;
      const fromMe = (sentFrom?.profileId || "") !== selectedConversation?.profileId;
      const isVideo = message?.eventContent?.mediaAttachments?.[0]?.mediaType === 'VIDEO';
      console.log('>>>>',isVideo);
      const videoUrl = isVideo ? message?.eventContent?.mediaAttachments?.[0]['*videoPlayMetadata'] : null;
      // const urn=getVideoUrl('urn:li:digitalmediaAsset:D4D23AQGHxqrLfJFTrw')

      console.log('>>>>',videoUrl);

      return (
        <Message
          key={message.messageId}
          text={text}
          img={message?.eventContent?.attachments?.[0]?.reference}
          fromMe={fromMe}
          videoUrl={videoUrl}
        />
      );
    })}
               <div ref={messagesEndRef} />
        </div>
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
                 {/* <img src={GalleryIcon} alt="Gallery" />
            <img src={AttachmentIcon} alt="" />
  <img src={GifIcon} alt="" />*/}
             {/* <img src={EmojiIcon} alt="" />  */}
          </div>
               <div>
            <button onClick={()=>handleSendMessage(selectedConversation?.conversation?.participants[0]?.profileId)}>Send</button>
            {/* <img src={SettingIcon} /> */}
          </div>
        </div>
      </div>
    </div>
  )}
</div>
{isModalOpen && <VideoModal onClose={handleModalClose} />}
</>
);

};

export default Inbox;
