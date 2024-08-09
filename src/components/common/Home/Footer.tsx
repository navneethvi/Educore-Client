import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="footer-container p-20 flex justify-between items-start">
        <div className="left">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            EDUCORE
          </h2>
          <p className="w-96 mt-2 text-gray-600 font-medium">
            Educore aims to revolutionize the way educators and leaners interact
            and engage in the digital learning environment
          </p>
          <div className="socials flex space-x-4 mt-5">
            <InstagramIcon className="text-gray-400 gradient-hover cursor-pointer" />
            <LinkedInIcon className="text-gray-400 gradient-hover cursor-pointer" />
            <FacebookIcon className="text-gray-400 gradient-hover cursor-pointer" />
            <XIcon className="text-gray-400 gradient-hover cursor-pointer" />
          </div>
        </div>
        <div className="right flex justify-between space-x-20 text-left pr-20 font-bold">
        <h2>Services</h2>
        <h2>About</h2>
        <h2>Help</h2>
        </div>
      
      </div>
      <div className="end text-center">
            <p className='text-gray-600 font-normal pb-4'>&copy; 2024 Educore. All rights reserved.</p>
        </div>
    </>
  );
};

export default Footer;
