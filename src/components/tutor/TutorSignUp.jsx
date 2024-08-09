import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { tutorSignup } from "../../redux/tutors/tutorActions";
import { resetActions } from "../../redux/tutors/tutorSlice";

const TutorSignUp = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error, message } = useSelector((state) => state.tutor);

  
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "tutor",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be between 3 and 20 characters.")
        .max(20, "Name must be between 3 and 20 characters.")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Please enter a valid phone number")
        .required("Phone number is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      setEmail(values.email);
      dispatch(tutorSignup(values));
    },
  });
  

  useEffect(() => {
    if (success) {
      toast.success(message);
      navigate("/tutor/verify-otp", {
        state: { message: "OTP Sented to your email", email: email },
      });
      dispatch(resetActions());
    }
    if (error) {
      toast.error(error || "Sign up failed. Please try again.");
      dispatch(resetActions());
    }
  }, [success, error, message, navigate, dispatch]);

  return (
    <>
      <ToastContainer />
      <div className="signup-container flex pl-20 pr-20 pt-10 justify-between space-x-28 items-center">
        <div className="left w-full max-w-lg ml-20">
          <div className="heading">
            <h1 className="text-4xl font-reem-kufi text-gray-600">
              WELCOME TO EDUCORE 🎓
            </h1>
            <p className="w-96 mt-4 text-gray-500 font-medium">
              Share Your Knowledge, Inspire the Future
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-6">
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
                {...formik.getFieldProps("name")}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-500 text-sm ml-3 mt-1">
                  {formik.errors.name}
                </p>
              ) : null}
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
                onChange={(e)=>setEmail(e.target.value)}
                {...formik.getFieldProps("email")}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm ml-3 mt-1">
                  {formik.errors.email}
                </p>
              ) : null}
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
                {...formik.getFieldProps("phone")}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-500 text-sm ml-3 mt-1">
                  {formik.errors.phone}
                </p>
              ) : null}
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
                {...formik.getFieldProps("password")}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-sm ml-3 mt-1">
                  {formik.errors.password}
                </p>
              ) : null}
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
                className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <p className="text-red-500 text-sm ml-3 mt-1">
                  {formik.errors.confirmPassword}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-4"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <Link to={"/tutor/signin"}>
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

export default TutorSignUp;
