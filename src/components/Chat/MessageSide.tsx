import { useRef, useEffect } from "react";
import React, { useState } from "react";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import Picker from "emoji-picker-react";
import ReceiverMessageBox from "./RecieverMessageBox";
import SenderMessageBox from "./SenderMessageBox";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/configs";
import { ExistingChat } from "../common/contents/student/Messages";
import socket from "../../utils/socket";

interface MessageSideProps {
  tutorInfo?: { name: string; image: string; tutorId: string };
  existingChats?: { _id: string; name: string; image: string }[]; // Example shape
  setExistingChats?: React.Dispatch<React.SetStateAction<ExistingChat[]>>;
  selectedTutor?: { name: string; image: string; _id: string } | null;
}
const MessageSide: React.FC<MessageSideProps> = ({
  tutorInfo,
  existingChats = [],
  setExistingChats,
  selectedTutor,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [chatId, setChatId] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const { studentToken, studentData } = useSelector(
    (state: RootState) => state.student
  );

  const messageEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    console.log("selectedTutor=====>", selectedTutor);

    if (tutorInfo || selectedTutor) {
      const chatId = [
        studentData?._id,
        tutorInfo?.tutorId || selectedTutor?._id,
      ]
        .filter(Boolean) // Ensure no undefined values
        .sort() // Alphabetical order for consistency
        .join("_"); // Join with separator

      console.log("Generated chatId (Tutor Side):", chatId);

      socket.emit("join-room", chatId);

      socket.on("receive_message", (message: any) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket.off("receive_message");
      console.log("Socket event unsubscribed (Tutor Side)");
    };
  }, [tutorInfo, selectedTutor, studentData?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageToChat = (chatId: string, text: string) => {
    if (!chatId || !text.trim()) return;

    const messagePayload = { roomId: chatId, message: text, sender: "me" };
    socket.emit("send_message", messagePayload);
    setMessages((prevMessages) => [...prevMessages, { text, sender: "me" }]);
  };



  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        console.log("handleSend message invoked");

        // Ensure `existingChats` is valid
        if (Array.isArray(existingChats)) {
          if (!existingChats.some((chat) => chat._id === tutorInfo?.tutorId)) {
            console.log("condition passed");

            const response = await fetch(`${BASE_URL}/chat/create-chat`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${studentToken}`,
              },
              body: JSON.stringify({
                chatMembers: [studentData._id, tutorInfo?.tutorId],
                chatMemberModel: ["Student", "Tutor"],
              }),
            });
            const data = await response.json();
            console.log("response received", data);

            setChatId(data._id);
            if (setExistingChats) {
              setExistingChats([...existingChats, data]);
            }
          }
        } else {
          console.error("existingChats is not an array");
          return;
        }

        await sendMessageToChat(chatId, message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, sender: "me" },
        ]);
        setMessage(""); // Clear the input field
      } catch (error) {
        console.error("Failed to create chat or send message:", error);
      }
    }
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowPicker(false); // Close the picker after selection
  };

  if (!tutorInfo && !selectedTutor) {
    // Fallback message when no tutor is selected
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="text-center text-gray-500 flex-1 h-full bg-slate-200 rounded-xl flex flex-col justify-center items-center p-4"
      >
        <h3 className="text-lg font-bold bg-gradient-to-r from-violet-500 to-blue-600 bg-clip-text text-transparent">
          Welcome to Messages
        </h3>
        <p className="mt-2 w-78">
          Connect and collaborate! Start a conversation to resolve issues and
          share knowledge.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="message-side flex-1 h-full bg-slate-200 rounded-xl flex flex-col">
      {/* Message Header */}
      <div className="message-header flex items-center p-4 border-b border-gray-300">
        <div className="profile-container flex-shrink-0">
          <img
            src={tutorInfo?.image || selectedTutor?.image} // Using the tutor's image from the prop
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="name ml-3 text-lg text-gray-800 font-reem-kufi">
          {tutorInfo?.name || selectedTutor?.name}
        </div>
      </div>

      {/* Message Screen */}
      <div className="message-screen flex-grow p-4 overflow-y-auto h-[400px] max-h-full">
        {messages.length > 0 ? (
          messages.map((msg, index) =>
            msg.sender === "me" ? (
              <SenderMessageBox
                key={index}
                message={msg.text}
                timestamp="10:10"
              />
            ) : (
              <ReceiverMessageBox
                key={index}
                message={msg.text}
                timestamp="10:20"
              />
            )
          )
        ) : (
          <div className="text-center text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      {/* Sending Options */}
      <div className="sending-options flex items-center p-2 border-t border-gray-300 bg-slate-200 rounded-xl relative">
        <div
          className="relative flex-shrink-0 mr-2"
          onClick={() => setShowPicker((prev) => !prev)}
        >
          <EmojiEmotionsOutlinedIcon
            style={{ fontSize: "24px", cursor: "pointer" }}
          />
          {showPicker && (
            <div className="absolute z-10 left-0 bottom-7">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className="relative w-full">
          <input
            type="text"
            id="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-full h-10 focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 pr-12 shadow-sm placeholder-gray-500"
            placeholder="Type a message..."
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={handleSendMessage}
          >
            <SendIcon className="text-violet-500 hover:text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSide;
