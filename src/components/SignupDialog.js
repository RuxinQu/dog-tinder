import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const SignupDialog = ({ title, handleClose }) => {
  // hide password input
  const [showPassword, setShowPassword] = useState(false);
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

  // Define initial form values
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  // Handle form submission
  const handleSubmit = (values) => {
    // Handle form submission logic here
    console.log(values);
  };

  return (
    <div className="signup-form">
      <div onClick={handleClose} style={{ textAlign: "right" }}>
        ⓧ
      </div>

      <h2 className="kalam" style={{ textAlign: "center" }}>
        {title}
      </h2>
      <p style={{ padding: "15px 0" }}>
        By clicking Submit, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
      >
        <Form
          style={{
            minHeight: 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <Field
              label="Email"
              variant="outlined"
              as={TextField}
              type="email"
              name="email"
              autoComplete="on"
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red", fontSize: "14px" }}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <Field
              as={OutlinedInput}
              autoComplete="on"
              name="password"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red", fontSize: "14px" }}
            />
          </FormControl>

          {title === "CREATE ACCOUNT" && (
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Confirm Password
              </InputLabel>
              <Field
                as={OutlinedInput}
                autoComplete="on"
                name="confirmPassword"
                id="outlined-adornment-confirm-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="confirm-password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                style={{ color: "red", fontSize: "14px" }}
              />
            </FormControl>
          )}

          <Button
            type="submit"
            className="kalam"
            variant="outlined"
            color="secondary"
            sx={{
              m: 3,
              width: "30ch",
              borderRadius: 25,
              fontSize: 18,
            }}
          >
            SUBMIT
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
