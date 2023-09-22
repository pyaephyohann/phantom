import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  message: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WarningAlert = ({ open, setOpen, message }: Props) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default WarningAlert;
