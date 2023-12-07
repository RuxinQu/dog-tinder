import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ProfileUpdateAlerts = ({
  buttonDisabled,
  alertMessage,
  handleSubmit,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    handleSubmit();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Button
        variant="contained"
        color="secondary"
        disabled={buttonDisabled}
        onClick={handleClick}
      >
        Update
      </Button>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
