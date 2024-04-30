import React, { useState } from "react";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { Login } from "../components/Login";
import { signIn } from "../util/Api";

export const LoginContainer = ({ register, handleClose }) => {
  // hide password input
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [loading, setLoading] = useState(false);

  // Define Yup validation schema
  let validationSchema;
  // couldn't get yup conditional validation to work
  validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle form submission
  const handleLogin = async (values) => {
    // Handle form submission logic here
    setLoading(true);
    const response = await signIn(values, "login");
    const jsonResponse = await response.json();
    const expirationDate = new Date(Date.now() + 2 * 60 * 60 * 1000);
    if (response.ok) {
      Cookies.set("AuthToken", jsonResponse.token, { expires: expirationDate });
      Cookies.set("UserId", jsonResponse.user._id, { expires: expirationDate });
      window.location.assign("/board");
    } else {
      setAlertMessage(jsonResponse.message);
    }
    setLoading(false);
  };

  return (
    <Login
      alertMessage={alertMessage}
      handleClose={handleClose}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      validationSchema={validationSchema}
      handleLogin={handleLogin}
      loading={loading}
    />
  );
};
