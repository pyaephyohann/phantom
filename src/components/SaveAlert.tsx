import Stack from "@mui/material/Stack";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Box, Button, Typography } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;

  callBack: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SaveAlert = ({ open, setOpen, callBack }: Props) => {
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
      <Snackbar open={open} autoHideDuration={null} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: "3rem" }}>
              Careful - you have unsaved changes!
            </Typography>
            <Button
              color="secondary"
              sx={{ textTransform: "none", color: "#fff" }}
              variant="contained"
            >
              Save Changes
            </Button>
          </Box>
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SaveAlert;
