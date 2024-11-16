import React, { useEffect, useState } from "react";
import ChatSideBar from "../../../Chat/ChatSideBar";
import MessageSide from "../../../Chat/MessageSide";
import { useNavigate, useLocation } from "react-router-dom";
import {
  studentGetTutorInfo,
  getUsersWithExistingChat,
} from "../../../../redux/students/studentActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import socket from "../../../../utils/socket";

interface TutorInfo {
  name: string;
  image: string;
  _id: string;
}

interface ChatMember {
  name: string;
  image: string;
  _id: string;
}

export interface ExistingChat {
  chatMembers: ChatMember[];
  _id: string;
}

const Messages: React.FC = () => {
  const [tutorInfo, setTutorInfo] = useState<TutorInfo | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<{
    name: string;
    image: string;
    _id: string;
  } | null>(null);
  const [existingChats, setExistingChats] = useState<ExistingChat[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { tutorId } = location.state || {};
  const { studentToken, studentData } = useSelector(
    (state: RootState) => state.student
  );
  const dispatch: AppDispatch = useDispatch();

  const handleTutorSelect = (tutor: {
    name: string;
    image: string;
    _id: string;
  }) => {
    setSelectedTutor(tutor);
  };

  console.log("selectedTutor=====>", selectedTutor);

  useEffect(() => {
    const fetchExistingChats = async () => {
      try {
        const response = await dispatch(
          getUsersWithExistingChat({
            token: studentToken as string,
            userId: studentData._id,
            userType: "Student",
          })
        );
        setExistingChats(response.payload.chats as ExistingChat[]); // Cast to correct type
        console.log("Fetched existing chats:", response.payload); // Check the response structure
      } catch (error) {
        console.error("Failed to fetch existing chats:", error);
      }
    };

    fetchExistingChats();
  }, [dispatch, studentToken]);

  useEffect(() => {
    if (!tutorId) {
      // Handle case when no tutorId is provided
      return;
    }

    const fetchTutorInfo = async () => {
      try {
        const response = await dispatch(
          studentGetTutorInfo({ token: studentToken as string, tutorId })
        );
        console.log("tutorInfo fetched=====>", response.payload);

        setTutorInfo(response.payload);
      } catch (error) {
        console.error("Failed to fetch tutor info:", error);
      }
    };

    fetchTutorInfo();
  }, [dispatch, tutorId, studentToken]);

  console.log("existing Chat=====>", existingChats);

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-1/4 min-w-[200px]">
        <ChatSideBar
          tutorInfo={{
            name: tutorInfo?.name as string,
            image: tutorInfo?.image as string,
            _id: tutorInfo?._id as string,
          }}
          existingChats={existingChats}
          onTutorSelect={handleTutorSelect}
        />
      </div>
      <div className="flex-1 w-full">
        {tutorInfo || selectedTutor ? (
          <MessageSide
            tutorInfo={{
              name: tutorInfo?.name ?? "",
              image: tutorInfo?.image ?? "",
              tutorId: tutorInfo?._id ?? "",
            }}
            existingChats={existingChats.map((chat) => ({
              _id: chat._id,
              name: chat.chatMembers[0]?.name || "Unknown",
              image: chat.chatMembers[0]?.image || "",
            }))}
            setExistingChats={setExistingChats}
            selectedTutor={selectedTutor}
          />
        ) : (
          <MessageSide />
        )}
      </div>
    </div>
  );
};

export default Messages;
