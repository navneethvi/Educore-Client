/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetActions } from "../../redux/tutors/tutorSlice";
import { Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

import { tutorSignin } from "../../redux/tutors/tutorActions";

import { tutorGoogleSignin } from "../../redux/tutors/tutorActions";

import { RootState, AppDispatch } from "../../store/store";


const TutorSignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  const {loading, error, message, success} = useSelector((state : RootState)=> state.tutor)

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(resetActions());
    }
    if(success){
      toast.success(message);
      dispatch(resetActions());
      navigate("/tutor/dashboard", {
        state: { message: "You've successfully signed in.", email: email },
      });
    }
  })

  

  const handleSignIn = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return;
    }

    dispatch(tutorSignin({email, password}))

  };

  const validateEmail = (email : string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const responseGoogle = (response: CredentialResponse) => {
    if (response.credential) {
      // Send id_token to your server for verification
      dispatch(tutorGoogleSignin({ token: response.credential }));
    } else {
      console.error('ID token is missing');
    }
  };

  return (
    <div className="signin-container pl-20 pr-20 flex justify-between items-center">
      <ToastContainer />
      <div className="left w-full max-w-lg ml-20">
        <div className="heading">
          <h1 className="text-4xl font-reem-kufi text-gray-600">
            WELCOME BACK 🎓
          </h1>
          <p className="w-96 mt-4 text-gray-500 font-medium">
          Log in to continue your journey of learning and teaching. We're glad to have you back!
          </p>
        </div>
        <div className="mt-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500 mb-8"
          />
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Link to={"/tutor/recover-account"}>
        <p className="text-end text-sm font-reem-kufi mt-4 cursor-pointer mb-5">
          Forgot password?
        </p>
        </Link>
        <button className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-4" onClick={handleSignIn} disabled={loading}>
         {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="w-full mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={() => console.error("Google Sign-In Error")}
          />
        </div>
        <Link to={"/tutor/signup"}>
          <h2 className="text-sm font-semibold font-reem-kufi text-center mt-6 text-gray-600 hover:text-blue-600 cursor-pointer">
            Don't have an account?{" "}
            <span className="text-blue-600">Sign Up</span>
          </h2>
        </Link>
        <div>

        </div>
      </div>
      <div className="right mt-6">
        <img
          src="/src/assets/signin.png"
          alt="Description of the image"
          className="w-82 object-center rounded-lg"
        />
      </div>
    </div>
    
  );
};

export default TutorSignIn;
