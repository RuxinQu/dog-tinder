import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ProfileUpdateAlerts = ({
  open,
  buttonDisabled,
  alertMessage,
  handleSubmit,
  handleClose,
  handleClick,
}) => {
  return (
    <Box sx={{ my: 3, textAlign: "center" }}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        disabled={buttonDisabled}
        onClick={handleClick}
      >
        Update
      </Button>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
