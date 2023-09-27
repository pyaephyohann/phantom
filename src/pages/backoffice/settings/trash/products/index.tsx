import RemoveDialog from "@/components/RemoveDialog";
import SuccessAlert from "@/components/SuccessAlert";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { removeDeletedProduct } from "@/store/slices/deletedProductsSlice";
import { addProduct } from "@/store/slices/productsSlice";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const DeletedProducts = () => {
  const { deletedProducts } = useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const handleUndoProduct = async (productId: number) => {
    const response = await fetch(
      `${config.apiBaseUrl}/backoffice/trash/products?id=${productId}`,
      {
        method: "PUT",
      }
    );
    const unDidProduct = await response.json();
    dispatch(removeDeletedProduct(unDidProduct));
    dispatch(addProduct(unDidProduct));
    setOpenSuccessAlert(true);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {deletedProducts.map((product) => {
          return (
            <Box sx={{ m: "1rem" }} key={product.id}>
              <Card
                sx={{
                  py: "1rem",
                  px: "1.5rem",
                  borderRadius: "0.5rem",
                  position: "relative",
                }}
              >
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
                  <Typography sx={{ my: "0.7rem" }}>{product.name}</Typography>
                  <Box sx={{ mb: "0.5rem" }}>
                    {product.discountPrice ? (
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{ textDecoration: "line-through", mr: "0.5rem" }}
                        >
                          {product.price} Ks
                        </Typography>
                        <Typography>{product.discountPrice} Ks</Typography>
                      </Box>
                    ) : (
                      <Typography>{product.price} Ks</Typography>
                    )}
                  </Box>
                  <Box>
                    {product.genderId === 4 && (
                      <Typography>For Male</Typography>
                    )}
                    {product.genderId === 5 && (
                      <Typography>For Female</Typography>
                    )}
                    {product.genderId === 6 && (
                      <Typography>Non-binary</Typography>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: "1rem",
                  }}
                >
                  <Button
                    onClick={() => setOpenRemoveDialog(true)}
                    variant="contained"
                  >
                    Undo
                  </Button>
                  <RemoveDialog
                    open={openRemoveDialog}
                    setOpen={setOpenRemoveDialog}
                    title="Are you sure you want to undo this product?"
                    callBack={() => handleUndoProduct(product.id)}
                  />
                </Box>
              </Card>
            </Box>
          );
        })}
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
