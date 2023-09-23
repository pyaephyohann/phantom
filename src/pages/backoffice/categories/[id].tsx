import { Box, Button, TextField, Typography } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Category } from "@prisma/client";
import { useState } from "react";
import { config } from "@/config";
import SuccessAlert from "@/components/SuccessAlert";
import { updateCategory } from "@/store/slices/categoriesSlice";

const EditCategory = () => {
  const router = useRouter();
  const categoryId = router.query.id;

  const { categories } = useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const [updatedCategoryName, setUpdatedCategoryName] = useState("");

  const [successAlertMessage, setSuccessAlertMessage] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const isDisabled = !updatedCategoryName;

  const category = categories.find(
    (item) => item.id === Number(categoryId)
  ) as Category;

  const handleUpdateCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/backoffice/categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: category.id, name: updatedCategoryName }),
    });
    const updatedCategory = await response.json();
    dispatch(updateCategory(updatedCategory));
    setSuccessAlertMessage("Updated Successfully");
    setOpenSuccessAlert(true);
  };

  if (!category)
    return (
      <Box>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Your Category does not exist!
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
          mt: "1rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ fontSize: "1.3rem", mr: "0.5rem" }}>
            Edit Category Name
          </Typography>
          <ModeEditOutlineIcon />
        </Box>
        <TextField
          onChange={(event) => setUpdatedCategoryName(event.target.value)}
          defaultValue={category.name}
          sx={{ my: "2rem" }}
          label="Name"
        />
        <Button
          disabled={isDisabled}
          onClick={handleUpdateCategory}
          variant="contained"
        >
          Save
        </Button>
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message={successAlertMessage}
      />
    </Box>
  );
};

export default EditCategory;
