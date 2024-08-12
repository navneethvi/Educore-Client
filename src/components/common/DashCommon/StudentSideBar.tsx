import { Link } from "react-router-dom";
import React, { useState } from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AddCardIcon from "@mui/icons-material/AddCard";

import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const StudentSideBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFoldClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`sidebar-container bg-zinc-900 text-white flex flex-col fixed top-0 left-0 bottom-0 transition-all ${
        isCollapsed ? "w-16" : "w-60"
      }`}
      style={{
        transition: "width 0.3s ease, opacity 0.3s ease",
      }}
    >
      <div className="flex items-center p-2">
        <button
          onClick={handleFoldClick}
          className="bg-gray-800 text-white w-12 h-12 flex items-center justify-center rounded-full"
        >
          {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </button>
        {!isCollapsed && (
          <h1 className="text-2xl font-reem-kufi pl-4 pr-4">EDUCORE</h1>
        )}
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/tutor/dashboard"
              className="p-2 hover:bg-gray-700 rounded flex items-center space-x-4 mb-4"
            >
              <DashboardIcon className="w-6 h-6 text-white font-reem-kufi" />{" "}
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/tutor/courses"
              className="p-2 hover:bg-gray-700 rounded flex items-center space-x-4 mb-4"
            >
              <LibraryBooksIcon className="w-6 h-6 text-white font-reem-kufi" />{" "}
              {!isCollapsed && <span>Courses</span>}
            </Link>
          </li>
         
          <li>
            <Link
              to="/tutor/message"
              className="p-2 hover:bg-gray-700 rounded flex items-center space-x-4 mb-4"
            >
              <MessageIcon className="w-6 h-6 text-white font-reem-kufi" />{" "}
              {!isCollapsed && <span>Message</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/tutor/webinar"
              className="p-2 hover:bg-gray-700 rounded flex items-center space-x-4 mb-4"
            >
              <LiveTvIcon className="w-6 h-6 text-white font-reem-kufi" />{" "}
              {!isCollapsed && <span>Webinar</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/tutor/add-course"
              className="p-2 hover:bg-gray-700 rounded flex items-center space-x-4 mb-4 whitespace-nowrap"
            >
              <AddCardIcon className="w-6 h-6 text-white font-reem-kufi" />{" "}
              {!isCollapsed && <span className="ml-2">Store</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div> 
  );
};

export default StudentSideBar;
