/* eslint-disable react/no-unescaped-entities */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { studentSignup } from "../../redux/students/studentActions";
import { resetActions } from "../../redux/students/studentSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm_password] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state) => state.student
  );

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetActions());
      navigate("/verify-email", {
        state: { message: "OTP Sented to your email", email: email },
      });
    }
    if (error) {
      toast.error(error);
      dispatch(resetActions());
    }
  }, [success, error, message, dispatch, navigate]);

  const validateName = (value) => {
    if (value.length < 3 || value.length > 20) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be between 3 and 20 characters.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validatePhone = (value) => {
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid phone number.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setErrors((prev) => ({
        ...prev,
        confirm_password: "Confirm password does not match.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirm_password: "" }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "name":
        setName(value);
        validateName(value);
        break;
      case "email":
        setEmail(value);
        validateEmail(value);
        break;
      case "phone":
        setPhone(value);
        validatePhone(value);
        break;
      case "password":
        setPassword(value);
        validatePassword(value);
        validateConfirmPassword(confirmPassword);
        break;
      case "cpassword":
        setConfirm_password(value);
        validateConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (name.length < 3 || name.length > 20) {
      toast.warning("Name must be between 3 and 20 characters.");
      isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.warning("Please enter a valid email address.");
      isValid = false;
    }
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
      toast.warning("Please enter a valid phone number.");
      isValid = false;
    }
    if (password.length < 8) {
      toast.warning("Password must be at least 8 characters long.");
      isValid = false;
    }
    if (password !== confirmPassword) {
      toast.warning("Confirm password does not match.");
      isValid = false;
    }

    if (isValid) {
      dispatch(
        studentSignup({
          name,
          email,
          phone,
          password,
          confirmPassword,
          role: "student",
        })
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signup-container flex pl-20 pr-20 pt-10 justify-between space-x-28 items-center">
        <div className="left w-full max-w-lg ml-20">
          <div className="heading">
            <h1 className="text-4xl font-reem-kufi text-gray-600">
              WELCOME BACK🚀
            </h1>
            <p className="w-96 mt-4 text-gray-500 font-medium">
              Today is a new day, it's your day, you shape it. Sign in to
              continue your learning.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="relative mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm ml-3 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm ml-3 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
              >
                Phone No
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm ml-3 mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm ml-3 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="cpassword"
                className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                value={confirmPassword}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-sm ml-3 mt-1">
                  {errors.confirm_password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <Link to={"/signin"}>
            <h2 className="text-sm font-semibold font-reem-kufi text-center mt-6 text-gray-600 hover:text-blue-600 cursor-pointer">
              Already have an account?{" "}
              <span className="text-blue-600">Sign In</span>
            </h2>
          </Link>
        </div>
        <div className="right mt-6">
          <img
            src="/src/assets/signup.png"
            alt="Description of the image"
            className="w-82 object-center rounded-lg"
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
