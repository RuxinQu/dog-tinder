import React, { useState, createRef } from "react";
import * as Yup from "yup";
import { Signup } from "../components/Signup";
import { EmailConfirmDialog } from "../components/EmailComfirmDialog";
import { signIn } from "../util/Api";

export const SignupContainer = ({ handleClose }) => {
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
    //only do validation on comfirmPassword input when signup
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // for email DomainVerification
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const formRef = createRef();
  const handleOpenEmailComfirm = () => {
    setShowEmailConfirm(true);
  };
  const handleCloseEmailConfirm = () => {
    setShowEmailConfirm(false);
  };
  // ask user if agree to send email when afterSentEmail is false
  // tell user email is sent after when aftersendEmail is true
  const [emailText, setEmailText] = useState("");
  const [afterSentEmail, setAfterSentEmail] = useState(false);

  // Handle form submission
  const handleRegister = async (values) => {
    setLoading(true);
    const response = await signIn(values, "register");
    const jsonResponse = await response.json();
    if (!response.ok) {
      setAlertMessage(jsonResponse.message);
    } else {
      setAfterSentEmail(true);
      setEmailText(
        "Verification email sent successfully! If you couldn't find the email, please check the spam"
      );
      handleOpenEmailComfirm();
    }
    setLoading(false);
  };

  // handle popping the dialog for user to confirm sending email
  const handleEmail = () => {
    setAfterSentEmail(false);
    setAlertMessage("");
    handleOpenEmailComfirm();
    setEmailText(
      "Would you like us to send an email verification to confirm your identity?"
    );
  };

  // trigger the submission of a form managed by Formik programmatically
  const handleSubmit = () => {
    handleCloseEmailConfirm();
    // accesses the current value of the formRef ref object.
    formRef.current.submitForm();
    // .submitForm calls the submitForm() function on the Formik form component
  };
  return (
    <>
      <Signup
        alertMessage={alertMessage}
        handleClose={handleClose}
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        validationSchema={validationSchema}
        loading={loading}
        handleEmail={handleEmail}
        handleRegister={handleRegister}
        formRef={formRef}
      />
      <EmailConfirmDialog
        emailText={emailText}
        afterSentEmail={afterSentEmail}
        showEmailConfirm={showEmailConfirm}
        handleSubmit={handleSubmit}
        setAlertMessage={setAlertMessage}
        handleCloseEmailConfirm={handleCloseEmailConfirm}
      />
    </>
  );
};
