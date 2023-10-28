import ProductSkeleton from "@/components/ProductSkeleton";
import RemoveDialog from "@/components/RemoveDialog";
import SuccessAlert from "@/components/SuccessAlert";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { removeDeletedProduct } from "@/store/slices/deletedProductsSlice";
import { fetchProductsCategories } from "@/store/slices/productsCategoriesSlice";
import { addProduct } from "@/store/slices/productsSlice";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const DeletedProducts = () => {
  const { deletedProducts, isLoading } = useAppSelector(backofficeAppDatas);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const [productIdToUndo, setProductIdToUndo] = useState(0);

  const handleUndoProduct = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/backoffice/trash/products?id=${productIdToUndo}`,
      {
        method: "PUT",
      }
    );
    const unDidProduct = await response.json();
    dispatch(removeDeletedProduct(unDidProduct));
    dispatch(addProduct(unDidProduct));
    dispatch(fetchProductsCategories());
    setOpenSuccessAlert(true);
  };

  return (
    <Box>
      <Box>
        {deletedProducts.length ? (
          <Typography sx={{ my: "0.5rem" }} variant="h5">
            Deleted Products
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography sx={{ mt: "1rem" }} variant="h5">
              You dont have any deleted products currently!
            </Typography>
            <Button
              onClick={() => router.push("/backoffice/settings/trash")}
              sx={{ mt: "2rem" }}
              variant="contained">
              Go Back
            </Button>
          </Box>
        )}
      </Box>
      <Box>
        {isLoading ? (
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
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((index) => {
              return (
                <Box sx={{ m: "1rem" }} key={index}>
                  <ProductSkeleton />
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "flex-start",
              },
            }}>
            {deletedProducts.map((product) => {
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
                      alt={product.name as string}
                      src={product.imageUrl as string}
                      width={180}
                      height={180}
                    />
                    <Box sx={{ pl: "0.2rem" }}>
                      <Typography sx={{ my: "0.7rem" }}>
                        {product.name}
                      </Typography>
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
                        justifyContent: "flex-end",
                        mt: "1rem",
                      }}>
                      <Button
                        sx={{ color: "info.main" }}
                        onClick={() => {
                          setProductIdToUndo(product.id);
                          setOpenRemoveDialog(true);
                        }}
                        variant="contained">
                        Undo
                      </Button>
                      <RemoveDialog
                        open={openRemoveDialog}
                        setOpen={setOpenRemoveDialog}
                        title="Are you sure you want to undo this product?"
                        callBack={handleUndoProduct}
                      />
                    </Box>
                  </Card>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="Undid product successfully"
      />
    </Box>
  );
};

export default DeletedProducts;
