import React, { useState } from "react";
import { Menu, MenuItem, Button, Avatar, Typography, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { tutorLogout } from "../../../redux/tutors/tutorSlice";

interface TutorData {
  name: string;
  image: string;
}

const Body: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { tutorData, tutorToken } = useSelector((state: RootState) => state.tutor);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    if (tutorToken) {
      await dispatch(tutorLogout(tutorToken));
      navigate("/tutor/signin");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      sx={{ p: 2 }}
    >
      <Button
        onClick={handleClick}
        sx={{
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          src={tutorData?.image || "/default-avatar.jpg"}
          alt="Profile Picture"
          sx={{ width: 30, height: 30 }}
        />
        {tutorData && (
          <Typography variant="body1">{tutorData.name}</Typography>
        )}
        <ArrowDropDownIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            fontSize: "1rem",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            fontSize: "1rem",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Body;
