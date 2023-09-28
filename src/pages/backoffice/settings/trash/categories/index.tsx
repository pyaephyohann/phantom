import ItemCard from "@/components/ItemCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { config } from "@/config";
import { removeDeletedCategory } from "@/store/slices/deletedCategoriesSlice";
import { addCategory } from "@/store/slices/categoriesSlice";
import { fetchProductsCategories } from "@/store/slices/productsCategoriesSlice";
import { useState } from "react";
import SuccessAlert from "@/components/SuccessAlert";
import RemoveDialog from "@/components/RemoveDialog";

const DeletedCategories = () => {
  const { deletedCategories, productsCategories } =
    useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const [categoryIdToUndo, setCategoryIdToUndo] = useState(0);

  const getProductCount = (categoryId: number) => {
    return productsCategories.filter((item) => item.categoryId === categoryId)
      .length;
  };

  const handleUndoCategory = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/backoffice/trash/categories?id=${categoryIdToUndo}`,
      {
        method: "PUT",
      }
    );
    const unDidCategory = await response.json();
    dispatch(removeDeletedCategory(unDidCategory));
    dispatch(addCategory(unDidCategory));
    dispatch(fetchProductsCategories());
    setOpenSuccessAlert(true);
  };

  return (
    <Box>
      <Box>
        {deletedCategories.length ? (
          <Typography sx={{ my: "0.5rem" }} variant="h5">
            Deleted Categories
          </Typography>
        ) : (
          <Typography sx={{ mt: "1rem", textAlign: "center" }} variant="h5">
            You dont have any deleted categories
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {deletedCategories.map((category) => {
          return (
            <Box sx={{ m: "1rem" }} key={category.id}>
              <Paper
                sx={{
                  width: "11rem",
                  py: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <RemoveDialog
                  open={openRemoveDialog}
                  setOpen={setOpenRemoveDialog}
                  title="Are you sure you want to undo this category?"
                  callBack={handleUndoCategory}
                />
                <Chip
                  sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
                  color="primary"
                  label="Undo"
                  onClick={() => {
                    setCategoryIdToUndo(category.id);
                    setOpenRemoveDialog(true);
                  }}
                />
                <CategoryIcon
                  color="primary"
                  sx={{ fontSize: "2.3rem", mt: "1.5rem" }}
                />
                <Typography sx={{ my: "1.5rem" }}>{category.name}</Typography>
                <Typography>{getProductCount(category.id)} Products</Typography>
              </Paper>
            </Box>
          );
        })}
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="Undid Category Successfully"
      />
    </Box>
  );
};

export default DeletedCategories;
