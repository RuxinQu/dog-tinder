import React, { useState } from "react";
import { useCookies } from "react-cookie";
import * as Yup from "yup";
import { Signup } from "../components/Signup";
import { signIn } from "../util/Api";

export const SignupContainer = ({ register, handleClose }) => {
  // hide password input
  const [cookie, setCookie] = useCookies("user");
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
    //only do validation on comfirmPassword input when signup
    confirmPassword: Yup.string().when(`${register}`, {
      is: true,
      then: () =>
        Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm password is required"),
      otherwise: () => Yup.string().strip(),
    }),
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    // Handle form submission logic here
    const option = register === true ? "register" : "login";
    const response = await signIn(values, option);
    const jsonResponse = await response.json();
    const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
    if (response.ok) {
      setCookie("AuthToken", jsonResponse.token, {
        expires: expirationDate,
      });
      setCookie("UserId", jsonResponse.user._id, {
        expires: expirationDate,
      });
      option === "register"
        ? window.location.assign("/profile")
        : window.location.assign("/board");
    } else {
      setAlertMessage(jsonResponse.message);
    }
  };

  return (
    <Signup
      register={register}
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
