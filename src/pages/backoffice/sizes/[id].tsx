import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Size } from "@prisma/client";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { config } from "@/config";
import SuccessAlert from "@/components/SuccessAlert";
import { updateSize } from "@/store/slices/sizesSlice";
import Wave from "@/components/Wave";

const EditSize = () => {
  const router = useRouter();
  const sizeId = router.query.id;

  const { sizes } = useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const isDisabled = !name;

  const handleUpdateSize = async () => {
    setIsUpdating(true);
    const response = await fetch(`${config.apiBaseUrl}/backoffice/sizes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: Number(sizeId), name }),
    });
    const updatedSize = await response.json();
    dispatch(updateSize(updatedSize));
    setIsUpdating(false);
    setName("");
    setOpenSuccessAlert(true);
  };

  const size = sizes.find((item) => item.id === Number(sizeId)) as Size;

  if (!size)
    return (
      <Box>
        <Typography variant="h5" sx={{ textAlign: "center", mt: "1.5rem" }}>
          Oops! Your size does not exist
        </Typography>
      </Box>
    );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "2rem",
        }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "1.3rem", mr: "0.7rem" }}>
            Edit your size
          </Typography>
          <EditIcon />
        </Box>
        <TextField
          onChange={(event) => setName(event.target.value)}
          sx={{ my: "2rem" }}
          defaultValue={size.name}
          label="Name"
        />
        <Button
          onClick={handleUpdateSize}
          disabled={isDisabled}
          variant="contained">
          {isUpdating ? (
            <CircularProgress sx={{ color: "#fff" }} size="2rem" />
          ) : (
            "Save"
          )}
        </Button>
      </Box>
      <Box sx={{ mt: "3rem", ml: "2.5rem" }}>
        <Typography sx={{ mb: "1rem" }} variant="h5">
          Note!
        </Typography>
        <Typography>You cannot delete size</Typography>
      </Box>
      <Wave />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="Updated successfully"
      />
    </Box>
  );
};

export default EditSize;
