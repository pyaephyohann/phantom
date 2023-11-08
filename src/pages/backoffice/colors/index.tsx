import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewColor from "./NewColor";
import SuccessAlert from "@/components/SuccessAlert";
import ItemSkeleton from "@/components/ItemSkeleton";

const Colors = () => {
  const { colors, isLoading } = useAppSelector(backofficeAppDatas);

  const [open, setOpen] = useState(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  if (isLoading)
    return (
      <Box>
        <ItemSkeleton />
      </Box>
    );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}>
          New Color
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: "1rem",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-start",
          },
        }}>
        {colors.map((color) => {
          return (
            <Box sx={{ m: "1rem" }} key={color.id}>
              <ItemCard
                name={color.name}
                icon={
                  <PaletteIcon color="primary" sx={{ fontSize: "2.3rem" }} />
                }
                href={`/backoffice/colors/${color.id}`}
              />
            </Box>
          );
        })}
      </Box>
      <NewColor
        open={open}
        setOpen={setOpen}
        callBack={() => setOpenSuccessAlert(true)}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="New Color created successfully"
      />
    </Box>
  );
};

export default Colors;
