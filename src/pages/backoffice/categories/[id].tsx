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
import { getProductsByCategoryId } from "@/utils/client";
import BackofficeProductCard from "@/components/BackofficeProductCard";
import AddIcon from "@mui/icons-material/Add";
import AddProduct from "./AddProduct";

const EditCategory = () => {
  const router = useRouter();
  const categoryId = router.query.id;

  const { categories, products, productsCategories } =
    useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const [updatedCategoryName, setUpdatedCategoryName] = useState("");

  const [successAlertMessage, setSuccessAlertMessage] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [openAddProduct, setOpenAddProduct] = useState(false);

  const validProducts = getProductsByCategoryId(
    Number(categoryId),
    products,
    productsCategories
  );

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
      {/* title and add product */}
      <Box
        sx={{
          mt: "3rem",
          display: "flex",
          justifyContent: "space-between",
          px: "2rem",
        }}
      >
        <Box>
          {validProducts.length === 0 ? (
            ""
          ) : (
            <Typography variant="h5">Products</Typography>
          )}
        </Box>
        <Button
          onClick={() => setOpenAddProduct(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Product
        </Button>
      </Box>
      {/* show connected products */}
      <Box
        sx={{
          mt: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-start",
          },
        }}
      >
        {validProducts.map((product) => {
          return (
            <Box sx={{ m: "1rem" }} key={product.id}>
              <BackofficeProductCard
                name={product.name}
                imageUrl={product.imageUrl as string}
                price={product.price}
                genderId={product.genderId}
                href={`/backoffice/products/${product.id}`}
                discountPrice={
                  product.discountPrice ? product.discountPrice : 0
                }
              />
            </Box>
          );
        })}
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message={successAlertMessage}
      />
      <AddProduct
        joinedProducts={validProducts}
        categoryId={Number(categoryId)}
        open={openAddProduct}
        setOpen={setOpenAddProduct}
        callBack={() => {
          setSuccessAlertMessage("Added Successfully");
          setOpenSuccessAlert(true);
        }}
      />
    </Box>
  );
};

export default EditCategory;
