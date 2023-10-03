import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Category } from "@prisma/client";
import { useState } from "react";
import { config } from "@/config";
import SuccessAlert from "@/components/SuccessAlert";
import { deleteCategory, updateCategory } from "@/store/slices/categoriesSlice";
import { getProductsByCategoryId } from "@/utils/client";
import AddIcon from "@mui/icons-material/Add";
import AddProduct from "./AddProduct";
import Image from "next/image";
import { fetchProductsCategories } from "@/store/slices/productsCategoriesSlice";
import RemoveDialog from "@/components/RemoveDialog";
import DangerZone from "@/components/DangerZone";
import { addDeletedCategory } from "@/store/slices/deletedCategoriesSlice";

const EditCategory = () => {
  const router = useRouter();
  const categoryId = router.query.id;

  const { categories, products, productsCategories } =
    useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const [updatedCategoryName, setUpdatedCategoryName] = useState("");

  const [successAlertMessage, setSuccessAlertMessage] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [removeDialogMessage, setRemoveDialogMessage] = useState("");

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const [openAddProduct, setOpenAddProduct] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

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
    setIsUpdating(true);
    const response = await fetch(`${config.apiBaseUrl}/backoffice/categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: category.id, name: updatedCategoryName }),
    });
    const updatedCategory = await response.json();
    dispatch(updateCategory(updatedCategory));
    setIsUpdating(false);
    setSuccessAlertMessage("Updated Successfully");
    setOpenSuccessAlert(true);
  };

  const handleRemoveProduct = async (productId: number) => {
    await fetch(`${config.apiBaseUrl}/backoffice/categories/removeProduct`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, categoryId: Number(categoryId) }),
    });
    dispatch(fetchProductsCategories());

    setSuccessAlertMessage("Removed Successfully");
    setOpenSuccessAlert(true);
  };

  const handleDeleteCategory = async () => {
    await fetch(`${config.apiBaseUrl}/backoffice/categories?id=${categoryId}`, {
      method: "DELETE",
    });
    dispatch(deleteCategory(category));
    dispatch(addDeletedCategory(category));
    dispatch(fetchProductsCategories());
    router.push("/backoffice/categories");
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
        }}>
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
          variant="contained">
          {isUpdating ? (
            <CircularProgress sx={{ color: "#fff" }} size="2rem" />
          ) : (
            "Save"
          )}
        </Button>
      </Box>
      {/* title and add product */}
      <Box
        sx={{
          mt: "3rem",
          display: "flex",
          justifyContent: "space-between",
          px: "2rem",
        }}>
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
          startIcon={<AddIcon />}>
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
        }}>
        {validProducts.map((product) => {
          return (
            <Box sx={{ m: "1rem" }} key={product.id}>
              <Card
                sx={{
                  py: "1rem",
                  px: "1.5rem",
                  borderRadius: "0.5rem",
                  position: "relative",
                }}>
                {product.discountPrice ? (
                  <Chip
                    sx={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      color: "white",
                    }}
                    label="Discount"
                    color="secondary"
                  />
                ) : (
                  ""
                )}
                <Image
                  style={{ borderRadius: "0.5rem", marginBottom: "0.5rem" }}
                  alt={product.name}
                  src={product.imageUrl as string}
                  width={180}
                  height={180}
                />
                <Box sx={{ pl: "0.2rem" }}>
                  <Typography sx={{ my: "0.7rem" }}>{product.name}</Typography>
                  <Box sx={{ mb: "0.5rem" }}>
                    {product.discountPrice ? (
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            textDecoration: "line-through",
                            mr: "0.5rem",
                          }}>
                          {product.price} Ks
                        </Typography>
                        <Typography>{product.discountPrice} Ks</Typography>
                      </Box>
                    ) : (
                      <Typography>{product.price} Ks</Typography>
                    )}
                  </Box>
                  <Box>
                    {product.genderId === 1 && (
                      <Typography>For Male</Typography>
                    )}
                    {product.genderId === 2 && (
                      <Typography>For Female</Typography>
                    )}
                    {product.genderId === 3 && (
                      <Typography>Non-binary</Typography>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: "1rem",
                  }}>
                  <Chip
                    color="primary"
                    label="Edit"
                    onClick={() => {
                      router.push(`/backoffice/products/${product.id}`);
                    }}
                  />
                  <Chip
                    color="primary"
                    label="Remove"
                    onClick={() => {
                      setRemoveDialogMessage(
                        `Are you sure you want to remove ${product.name} from this category`
                      );
                      setOpenRemoveDialog(true);
                    }}
                  />
                </Box>
                <RemoveDialog
                  open={openRemoveDialog}
                  setOpen={setOpenRemoveDialog}
                  title={removeDialogMessage}
                  callBack={() => handleRemoveProduct(product.id)}
                />
              </Card>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mb: "3rem" }}>
        <DangerZone
          id={Number(categoryId)}
          handleDelete={handleDeleteCategory}
          deleteDialogTitle="Are you sure you want to delete this category"
        />
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
