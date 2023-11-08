import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewCategory from "./NewCategory";
import SuccessAlert from "@/components/SuccessAlert";
import ItemSkeleton from "@/components/ItemSkeleton";

const Categories = () => {
  const { categories, productsCategories, isLoading } =
    useAppSelector(backofficeAppDatas);

  const [open, setOpen] = useState(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const getProductCount = (categoryId: number) => {
    return productsCategories.filter((item) => item.categoryId === categoryId)
      .length;
  };

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
          New Category
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
        {categories.map((category) => {
          return (
            <Box sx={{ m: "1rem" }} key={category.id}>
              <ItemCard
                name={category.name}
                icon={
                  <CategoryIcon color="primary" sx={{ fontSize: "2.3rem" }} />
                }
                href={`/backoffice/categories/${category.id}`}
                subtitle={`${getProductCount(category.id)} Products`}
              />
            </Box>
          );
        })}
      </Box>
      <NewCategory
        open={open}
        setOpen={setOpen}
        callBack={() => setOpenSuccessAlert(true)}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="New Category Created Successfully"
      />
    </Box>
  );
};

export default Categories;
