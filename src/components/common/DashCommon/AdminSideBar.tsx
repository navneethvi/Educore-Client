import React from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonIcon from "@mui/icons-material/Person";
import Category from "@mui/icons-material/Category";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

interface SideBarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AdminSideBar: React.FC<SideBarProps> = ({ isCollapsed, onToggle }) => {
  const handleFoldClick = () => {
    onToggle();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: isCollapsed ? "80px" : "240px",
        transition: "width 0.3s ease",
        color: "#fff",
        height: "100vh",
        zIndex: 1200,
      }}
      className="bg-zinc-900 shadow-lg"
    >
      <div className="flex items-center p-2">
        <IconButton onClick={handleFoldClick} sx={{ color: "#fff" }}>
          {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
        {!isCollapsed && (
          <h1 className="text-2xl font-reem-kufi pl-4 pr-4">EDUCORE</h1>
        )}
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {[
            { to: "/admin/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
            { to: "/admin/courses", icon: <LibraryBooksIcon />, label: "Courses" },
            { to: "/admin/students", icon: <PersonIcon />, label: "Students" },
            // { to: "/admin/messages", icon: <MessageIcon />, label: "Messages" },
            { to: "/admin/tutors", icon: <SupervisorAccountIcon />, label: "Tutors" },
            { to: "/admin/category", icon: <Category />, label: "Category" },
          ].map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
              animate={{
                opacity: isCollapsed ? 0 : 1,
                scale: isCollapsed ? 0.5 : 1,
                filter: isCollapsed ? "blur(10px)" : "blur(0px)",
              }}
              transition={{ delay: 0.05 * index + 0.1 }}
            >
              <Link
                to={item.to}
                className="p-2 hover:bg-gray-700 rounded flex items-center space-x-4 mb-4"
                onClick={(e) => {
                  if (isCollapsed) {
                    e.preventDefault();
                  }
                }}
              >
                {React.cloneElement(item.icon, {
                  className: "w-6 h-6 text-white",
                })}
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </Box>
  );
};

export default AdminSideBar;
