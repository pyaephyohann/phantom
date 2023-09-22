import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { updateProduct } from "@/store/slices/productsSlice";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import { useState } from "react";
import SuccessAlert from "./SuccessAlert";
import DeleteDialog from "./DeleteDialog";

interface Props {
  productId: number;
}

const ProductDiscount = ({ productId }: Props) => {
  const { products } = useAppSelector(backofficeAppDatas);
  const dispatch = useAppDispatch();
  const product = products.find((item) => item.id === productId) as Product;

  const [discountPrice, setDiscountPrice] = useState(0);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [successAlertMessage, setSuccessAlertMessage] = useState("");

  const isDisabled = !discountPrice;

  const handleUpdateDiscountPrice = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/backoffice/products/discount`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: productId, discountPrice }),
      }
    );
    const discountedProduct = await response.json();
    if (product.discountPrice) {
      setSuccessAlertMessage("Updated Discount Price");
    } else {
      setSuccessAlertMessage("Added Discount Price");
    }
    setOpenSuccessAlert(true);
    dispatch(updateProduct(discountedProduct));
  };

  const handleRemoveDiscountPrice = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/backoffice/products/discount?id=${productId}`,
      {
        method: "DELETE",
      }
    );
    const discountRemovedProduct = await response.json();
    dispatch(updateProduct(discountRemovedProduct));
    setSuccessAlertMessage("Removed Discount Price");
    setOpenSuccessAlert(true);
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center" }}>
        {product.discountPrice ? (
          ""
        ) : (
          <Typography variant="h5">Add discount price</Typography>
        )}
      </Box>
      <Box
        sx={{
          mb: "1.8rem",
          mt: "2.3rem",
          width: "fit-content",
          mx: "auto",
          display: "flex",
          alignItems: "center ",
        }}
      >
        <TextField
          onChange={(event) => setDiscountPrice(Number(event.target.value))}
          sx={
            product.discountPrice
              ? { width: "15rem", mr: "1.5rem" }
              : { width: "15rem", mr: "1.5rem", mx: "auto" }
          }
          label="Discount Price"
          type="number"
          defaultValue={product.discountPrice ? product.discountPrice : ""}
        />
        {product.discountPrice ? (
          <Chip
            color="primary"
            label="Remove"
            onClick={() => setOpenDeleteDialog(true)}
          />
        ) : (
          ""
        )}
      </Box>
      <Box>
        {product.discountPrice ? (
          <Box>
            <Button
              onClick={handleUpdateDiscountPrice}
              disabled={isDisabled}
              variant="contained"
            >
              Update
            </Button>
          </Box>
        ) : (
          <Box sx={{ width: "fit-content", mx: "auto" }}>
            <Button
              onClick={handleUpdateDiscountPrice}
              disabled={isDisabled}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        )}
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message={successAlertMessage}
      />
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        title="Are you sure you want to removed discount price?"
        callBack={handleRemoveDiscountPrice}
      />
    </Box>
  );
};

export default ProductDiscount;
