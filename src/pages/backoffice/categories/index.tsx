import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewCategory from "./NewCategory";

const Categories = () => {
  const { categories, productsCategories } = useAppSelector(backofficeAppDatas);

  const [open, setOpen] = useState(false);

  const getProductCount = (categoryId: number) => {
    return productsCategories.filter((item) => item.categoryId === categoryId)
      .length;
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Category
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
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
      <NewCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Categories;
