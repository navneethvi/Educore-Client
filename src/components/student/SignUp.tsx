import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { studentSignup } from "../../redux/students/studentActions";
import { resetActions } from "../../redux/students/studentSlice";
import { RootState, AppDispatch } from "../../store/store";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, success, error, message } = useSelector(
    (state: RootState) => state.student
  );

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetActions());
      navigate("/verify-email", {
        state: { message: "OTP Sent to your email", email: email },
      });
    }
    if (error) {
      toast.error(error);
      dispatch(resetActions());
    }
  }, [success, error, message, dispatch, navigate]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be between 3 and 20 characters.")
      .max(20, "Name must be between 3 and 20 characters.")
      .required("Name is required."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    phone: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Please enter a valid phone number.")
      .required("Phone number is required."),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], "Confirm password does not match.")
      .required("Confirm password is required."),
  });

  const handleSubmit = (values: any) => {
    setEmail(values.email)
    dispatch(
      studentSignup({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        confirmPassword: values.confirmPassword,
        role: "student",
      })
    );
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
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-6">
                <div className="relative mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="name" component="p" className="text-red-500 text-sm ml-3 mt-1" />
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm ml-3 mt-1" />
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
                  >
                    Phone No
                  </label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="phone" component="p" className="text-red-500 text-sm ml-3 mt-1" />
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-sm ml-3 mt-1" />
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-medium mb-2 font-reem-kufi ml-3"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="block w-full py-2 px-3 border border-gray-500 rounded-lg bg-gray-50 text-gray-800 font-reem-kufi focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm ml-3 mt-1" />
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-800 h-12 text-white px-4 py-2 rounded-lg hover:from-blue-800 hover:to-blue-500 w-full mb-4"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

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
