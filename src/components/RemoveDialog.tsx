import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  callBack: () => void;
}

const RemoveDialog = ({ open, setOpen, title, callBack }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", pt: "1rem" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ my: "0.5rem" }}>
        This action cannot be undone
      </DialogContent>
      <DialogActions sx={{ mb: "1.5rem", mr: "1.5rem" }}>
        <Button
          sx={{ mr: "2rem" }}
          onClick={() => setOpen(false)}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            callBack();
            setOpen(false);
          }}
          variant="contained"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveDialog;
