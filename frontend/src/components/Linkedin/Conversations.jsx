import { useState, useEffect } from "react";
import { getChats, getChat } from "./helperFunctions";
import ln from '../../images/LinkedIn-Symbole.png'
import Chat from "./chat";

export default function Conversations() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // fetch conversations from backend API and set them to state
        getChats().then((data) => {
            setConversations(data);
        });
    }, []);

    const handleConversationClick = ({ conversation, profileId }) => {
    // handle click on conversation item and set selected conversation to state
        setSelectedConversation({ conversation,profileId });
    // getChat(conversation.profileId).then((data) => {
    //   setMessages(data);
    // });
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

  return (
    <div className="conversations-container">
      <div className="conversations-list">
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
                  className={`conversation-item ${selectedConversation?.conversationId === conversationId
                          ? "selected"
                          : ""
                      }`}
                  onClick={() => handleConversationClick({conversation,profileId})}
              >
                  {
                     profilePic ?( 
                          <img src={profilePic} alt={`${name} profile`} />) 
                          : <img src={ln} style={{height:99,width:100}} alt={`${name} profile`} />
                  }
              <span>{name}</span>
            </div>
          );
        })}
      </div>
      {selectedConversation && (
        <Chat
          conversation={selectedConversation}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </div>
  );
}
