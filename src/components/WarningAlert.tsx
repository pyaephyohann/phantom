import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import Alert from "@mui/material/Alert";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  message: string;
}

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
        <Alert severity="warning">{message}</Alert>
      </Snackbar>
    </Stack>
  );
};

export default WarningAlert;
