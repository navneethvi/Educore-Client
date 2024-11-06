import React, { useState } from "react";
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import Picker from 'emoji-picker-react';
import ReceiverMessageBox from "./RecieverMessageBox";
import SenderMessageBox from "./SenderMessageBox";

const MessageSide: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: "me" }]);
      setMessage(""); // Clear input after sending
    }
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowPicker(false); // Close the picker after selection
  };

  return (
    <div className="message-side flex-1 h-full bg-slate-200 flex flex-col">
      {/* Message Header */}
      <div className="message-header flex items-center p-4 border-b border-gray-300">
        <div className="profile-container flex-shrink-0">
          <img
            src="https://avatars.githubusercontent.com/u/108149371?v=4"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="name ml-3 text-lg font-semibold text-gray-800">User Name</div>
      </div>

      {/* Message Screen */}
      <div className="message-screen flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          msg.sender === "me" ? (
            <SenderMessageBox key={index} message={msg.text} timestamp={"10:10"} />
          ) : (
            <ReceiverMessageBox key={index} message={msg.text} timestamp={"10:20"} />
          )
        ))}
      </div>

      {/* Sending Options */}
      <div className="sending-options flex items-center p-2 border-t border-gray-300 bg-white relative">
        <div className="relative flex-shrink-0 mr-2" onClick={() => setShowPicker((prev) => !prev)}>
          <div className="emoji-picker-icon">
            <EmojiEmotionsOutlinedIcon style={{ fontSize: '24px', cursor: 'pointer' }} />
          </div>

          {/* Emoji Picker positioned above the icon */}
          {showPicker && (
            <div className={`absolute z-10 left-0 bottom-7 transition-opacity duration-300 ease-in-out ${showPicker ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>

        <div className="message-input flex-grow">
          <input
            type="text"
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-full h-10 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm placeholder-gray-500"
            placeholder="Type a message..."
          />
        </div>
        <div className="send-btn ml-2">
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageSide;
