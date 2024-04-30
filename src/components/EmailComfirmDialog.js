import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export const EmailConfirmDialog = ({
  emailText,
  afterSentEmail,
  showEmailConfirm,
  handleSubmit,
  setAlertMessage,
  handleCloseEmailConfirm,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={showEmailConfirm}
        onClose={handleCloseEmailConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {emailText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {afterSentEmail ? (
            <Button
              onClick={() => {
                // so the emailText shows email sent instead of asking for comfirm
                handleCloseEmailConfirm();
              }}
            >
              Close
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  setAlertMessage("Failed to create user.");
                  handleCloseEmailConfirm();
                }}
              >
                Disagree
              </Button>
              <Button onClick={handleSubmit} autoFocus>
                Agree
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
