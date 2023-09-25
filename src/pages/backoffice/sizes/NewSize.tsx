import { config } from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { addSize } from "@/store/slices/sizesSlice";
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

const NewSize = ({ open, setOpen, callBack }: Props) => {
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();

  const isDisabled = !name;

  const handleCreateNewSize = async () => {
    const response = await fetch(`${config.apiBaseUrl}/backoffice/sizes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const createdSize = await response.json();
    dispatch(addSize(createdSize));
    callBack();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>Create New Size</DialogTitle>
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
          onClick={handleCreateNewSize}
          disabled={isDisabled}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewSize;
