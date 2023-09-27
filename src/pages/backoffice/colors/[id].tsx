import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Color } from "@prisma/client";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { config } from "@/config";
import { updateColor } from "@/store/slices/colorsSlice";
import SuccessAlert from "@/components/SuccessAlert";
import Wave from "@/components/Wave";

const EditColor = () => {
  const router = useRouter();
  const colorId = router.query.id;

  const { colors } = useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const isDisabled = !name;

  const handleUpdateColor = async () => {
    const response = await fetch(`${config.apiBaseUrl}/backoffice/colors`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: Number(colorId), name }),
    });
    const updatedColor = await response.json();
    dispatch(updateColor(updatedColor));
    setOpenSuccessAlert(true);
  };

  const color = colors.find((item) => item.id === Number(colorId)) as Color;

  if (!color)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
        <Typography variant="h5">Oops! Your color does not exist</Typography>
      </Box>
    );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "1rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "1.3rem", mr: "0.7rem" }}>
            Edit your color
          </Typography>
          <EditIcon />
        </Box>
        <TextField
          onChange={(event) => setName(event.target.value)}
          sx={{ my: "2rem" }}
          defaultValue={color.name}
          label="Name"
        />
        <Button
          onClick={handleUpdateColor}
          disabled={isDisabled}
          variant="contained"
        >
          Save
        </Button>
      </Box>
      <Box sx={{ mt: "3rem", ml: "2.5rem" }}>
        <Typography sx={{ mb: "1rem" }} variant="h5">
          Note!
        </Typography>
        <Typography>You cannot delete color</Typography>
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

export default EditColor;
