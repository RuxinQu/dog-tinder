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
  handleClose,
  status,
  handleSubmit,
}) => {
  return (
    <Box sx={{ my: 3, textAlign: "center" }}>
      <Button
        variant="contained"
        size="large"
        disabled={buttonDisabled}
        onClick={handleSubmit}
      >
        Update
      </Button>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
