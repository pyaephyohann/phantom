import { config } from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { addColor } from "@/store/slices/colorsSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  callBack: () => void;
}

const NewColor = ({ open, setOpen, callBack }: Props) => {
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();

  const isDisabled = !name;

  const handleCreateNewColor = async () => {
    const response = await fetch(`${config.apiBaseUrl}/backoffice/colors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const createdColor = await response.json();
    dispatch(addColor(createdColor));
    callBack();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>Create New Color</DialogTitle>
      <DialogContent sx={{ mt: "0.5rem" }}>
        <TextField
          onChange={(event) => setName(event.target.value)}
          label="Name"
        />
      </DialogContent>
      <DialogActions
        sx={{ mb: "1rem", display: "flex", justifyContent: "center" }}
      >
        <Button
          onClick={handleCreateNewColor}
          disabled={isDisabled}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewColor;
