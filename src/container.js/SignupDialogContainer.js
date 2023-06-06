import React, { useState } from "react";
import * as Yup from "yup";
import { SignupDialog } from "../components/SignupDialog";
import { signUp } from "../util/Api";

export const SignupDialogContainer = ({ title, handleClose }) => {
  // hide password input
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    // Handle form submission logic here
    const response = await signUp(values);
    if (response.ok) {
      window.location.assign("/board");
    } else {
      const jsonResponse = await response.json();
      setAlertMessage(jsonResponse.message);
    }
  };

  return (
    <SignupDialog
      title={title}
      alertMessage={alertMessage}
      handleClose={handleClose}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
    />
  );
};
