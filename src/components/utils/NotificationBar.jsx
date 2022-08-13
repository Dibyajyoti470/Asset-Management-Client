import React, { useContext, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { GlobalContext } from "../../contexts/Context";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationBar = () => {
  const { message, status, setStatus, showSnackbar, setShowSnackbar } =
    useContext(GlobalContext);

  const clearMessage = () => {
    setStatus(status);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSnackbar(false);
    clearMessage();
  };

  useEffect(() => {
    if (showSnackbar) {
      setShowSnackbar(true);
    }
  }, [showSnackbar]);

  return (
    <div>
      <Snackbar
        sx={{ fontSize: "1rem" }}
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NotificationBar;
