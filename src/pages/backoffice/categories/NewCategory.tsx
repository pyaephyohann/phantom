import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewCategory = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Create New Category
      </DialogTitle>
      <DialogContent>
        <TextField sx={{ width: "15rem" }} label="Name" />
      </DialogContent>
      <DialogActions sx={{ mb: "1rem" }}>
        <Button sx={{ mx: "auto" }} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewCategory;
