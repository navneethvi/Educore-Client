import { Link } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AddCardIcon from "@mui/icons-material/AddCard";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import useSidebarAnimation from "../../../hooks/useSidebarAnimation";

const SideBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scope = useSidebarAnimation(isCollapsed);

  const handleFoldClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      ref={scope}
      className="sidebar-container bg-zinc-900 text-white flex flex-col fixed top-0 left-0 bottom-0 transition-all"
      style={{
        transition: "width 0.3s ease",
        width: isCollapsed ? "4rem" : "15rem", // Dynamic width based on collapse state
      }}
    >
      <div className="flex items-center p-2">
        <button
          onClick={handleFoldClick}
          className="bg-zinc-700 text-white w-12 h-12 flex items-center justify-center rounded-full"
        >
          {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </button>
        {!isCollapsed && (
          <h1 className="text-2xl font-reem-kufi pl-4 pr-4">EDUCORE</h1>
        )}
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {[
            { to: "/tutor/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
            { to: "/tutor/courses", icon: <LibraryBooksIcon />, label: "Courses" },
            { to: "/tutor/students", icon: <PersonIcon />, label: "Students" },
            { to: "/tutor/message", icon: <MessageIcon />, label: "Message" },
            { to: "/tutor/webinar", icon: <LiveTvIcon />, label: "Webinar" },
            { to: "/tutor/add-course", icon: <AddCardIcon />, label: "Add Course" },
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.05 * index + 0.1 }}
              className="relative" // Ensure relative positioning for absolute child elements
            >
              <Link
                to={item.to}
                className={`flex items-center p-2 hover:bg-gray-700 rounded mb-4 ${isCollapsed ? 'justify-center' : ''}`}
                style={{ width: "100%" }}
              >
                {React.cloneElement(item.icon, {
                  className: `w-6 h-6 text-white font-reem-kufi`,
                  style: { marginRight: isCollapsed ? 0 : '1rem' } // Add margin only when not collapsed
                })}
                {!isCollapsed && <span className="ml-4">{item.label}</span>}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;

