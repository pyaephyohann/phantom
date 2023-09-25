import { config } from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { addCategory } from "@/store/slices/categoriesSlice";
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

const NewCategory = ({ open, setOpen, callBack }: Props) => {
  const [newCategoryName, setNewCategoryName] = useState("");

  const dispatch = useAppDispatch();

  const handleCreateNewCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/backoffice/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCategoryName }),
    });
    const createdCategory = await response.json();
    dispatch(addCategory(createdCategory));
    callBack();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Create New Category
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={(event) => setNewCategoryName(event.target.value)}
          sx={{ width: "15rem" }}
          label="Name"
        />
      </DialogContent>
      <DialogActions sx={{ mb: "1rem" }}>
        <Button
          onClick={handleCreateNewCategory}
          sx={{ mx: "auto" }}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCategory;
