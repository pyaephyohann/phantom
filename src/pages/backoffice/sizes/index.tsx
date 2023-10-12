import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button } from "@mui/material";
import AnimationIcon from "@mui/icons-material/Animation";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewSize from "./NewSize";
import SuccessAlert from "@/components/SuccessAlert";
import ItemSkeleton from "@/components/ItemSkeleton";

const Sizes = () => {
  const { sizes, isLoading } = useAppSelector(backofficeAppDatas);

  const [openNewSize, setOpenNewSize] = useState(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpenNewSize(true)}
          startIcon={<AddIcon />}
          variant="contained">
          New Size
        </Button>
      </Box>
      <Box>
        {isLoading ? (
          <Box sx={{ display: "flex", flexWrap: "wrap", mt: "1rem" }}>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((index) => {
              return (
                <Box sx={{ m: "1rem" }} key={index}>
                  <ItemSkeleton />
                </Box>
              );
            })}
          </Box>
        ) : (
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
            {sizes.map((size) => {
              return (
                <Box sx={{ m: "1rem" }} key={size.id}>
                  <ItemCard
                    name={size.name}
                    icon={
                      <AnimationIcon
                        color="primary"
                        sx={{ fontSize: "2.3rem" }}
                      />
                    }
                    href={`/backoffice/sizes/${size.id}`}
                  />
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <NewSize
        open={openNewSize}
        setOpen={setOpenNewSize}
        callBack={() => setOpenSuccessAlert(true)}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="New Size Created Successfully"
      />
    </Box>
  );
};

export default Sizes;
