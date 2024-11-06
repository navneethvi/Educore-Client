import React, { useEffect } from "react";
import socket from "../../../../utils/socket";
import ChatSideBar from "../../../Chat/ChatSideBar";
import MessageSide from "../../../Chat/MessageSide";

const Messages: React.FC = () => {

  useEffect(()=>{
    console.log("hiiii")

   
  },[])

  return (
    <div className="flex h-full">

    <div className="w-1/4 min-w-[200px]">
      <ChatSideBar />
    </div>
 
    <div className="flex-1">
      <MessageSide />
    </div>
  </div>
  )
};

export default Messages;
