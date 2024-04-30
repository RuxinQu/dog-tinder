import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Alert from "@mui/material/Alert";

export const Login = ({
  alertMessage,
  handleClose,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  validationSchema,
  handleLogin,
  loading,
}) => {
  // Define initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="signup-form">
      <div onClick={handleClose} style={{ textAlign: "right" }}>
        <CancelOutlinedIcon />
      </div>

      <h2 className="itim" style={{ textAlign: "center" }}>
        LOGIN YOUR ACCOUNT
      </h2>
      <small style={{ padding: "15px 0" }}>
        By clicking Submit, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </small>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
        validateOnBlur={false}
      >
        <Form
          style={{
            minHeight: 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingTop: 30,
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

          <Button
            type="submit"
            className="itim"
            variant="contained"
            sx={{
              m: 3,
              width: "30ch",
              borderRadius: 25,
              fontSize: 18,
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? "SUBMITING" : "SUBMIT"}
          </Button>
        </Form>
      </Formik>
      {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
    </div>
  );
};
