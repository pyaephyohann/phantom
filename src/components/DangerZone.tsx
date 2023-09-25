import { Box, Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";

interface Props {
  id: number;
  handleDelete: () => void;
  deleteDialogTitle: string;
}

const DangerZone = ({ id, handleDelete, deleteDialogTitle }: Props) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <Box
      sx={{
        width: { xs: "25rem", md: "35rem", lg: "45rem" },
        mx: "auto",
      }}
    >
      <Typography variant="h5" sx={{ my: "2rem" }}>
        Danger Zone
      </Typography>
      <Box
        sx={{
          display: { md: "block", lg: "flex" },
          justifyContent: "space-between",
          border: "1px solid grey",
          p: "1.5rem",
          borderRadius: "0.5rem",
        }}
      >
        <Box>
          <Typography sx={{ mb: "0.4rem", fontSize: "1.2rem" }}>
            Delete Your Product
          </Typography>
          <Typography>
            If you are wrong deleted, Dont worry you can find it in trash
          </Typography>
        </Box>
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          sx={{
            width: "fit-content",
            height: "fit-content",
            mt: { xs: "1.5rem", sm: "1.5rem", md: "1.5rem", lg: "0" },
          }}
          color="error"
          variant="contained"
          startIcon={<Delete />}
        >
          Delete
        </Button>
      </Box>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        title={deleteDialogTitle}
        callBack={handleDelete}
      />
    </Box>
  );
};

export default DangerZone;
