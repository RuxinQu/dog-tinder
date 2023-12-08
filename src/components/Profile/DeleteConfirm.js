import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const DeleteConfirm = ({ handleDeleteImg, imageDeleteAlert }) => {
  const [open, setOpen] = React.useState(false);
  // const [imageDeleteAlert, setimageDeleteAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "inline-block",
        position: "absolute",
        top: -17,
        right: -17,
      }}
    >
      <IconButton
        aria-label="delete"
        onClick={handleClickOpen}
        size="small"
        color="error"
        // style={{ backgroundColor: "#FFCDD2" }}
      >
        <HighlightOffIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete the Image</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this image? This action is
            irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleClose}>
            close
          </Button>
          <Button color="error" onClick={handleDeleteImg} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
