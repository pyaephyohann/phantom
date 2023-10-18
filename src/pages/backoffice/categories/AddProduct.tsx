import ItemsSelector from "@/components/ItemsSelector";
import SuccessAlert from "@/components/SuccessAlert";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { fetchProductsCategories } from "@/store/slices/productsCategoriesSlice";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Product } from "@prisma/client";
import { useState } from "react";

interface Props {
  joinedProducts: Product[];
  categoryId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  callBack: () => void;
}

const AddProduct = ({
  open,
  setOpen,
  joinedProducts,
  categoryId,
  callBack,
}: Props) => {
  const { products } = useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const joinedProductIds =
    joinedProducts && joinedProducts.map((item) => item.id);

  const unJoinedProducts = products.filter(
    (item) => !joinedProductIds.includes(item.id)
  );

  const mappedUnjoinedProducts =
    unJoinedProducts &&
    unJoinedProducts.map((product) => ({
      id: product.id,
      name: product.name,
    }));

  const [isAdding, setIsAdding] = useState(false);

  const [productIdsToAdd, setProductIdsToAdd] = useState([] as number[]);

  const isDisabled = !productIdsToAdd.length;

  const handleAddProduct = async () => {
    setIsAdding(true);
    await fetch(`${config.apiBaseUrl}/backoffice/categories/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId, productIds: productIdsToAdd }),
    });
    dispatch(fetchProductsCategories());
    setIsAdding(false);
    setOpen(false);
    callBack();
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>Add Product</DialogTitle>
      <DialogContent sx={{ mt: "0.5rem" }}>
        <ItemsSelector
          options={mappedUnjoinedProducts}
          label="Products"
          onChange={(values) =>
            setProductIdsToAdd(values.map((item) => item.id))
          }
        />
      </DialogContent>
      <DialogActions
        sx={{ mb: "1rem", display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleAddProduct}
          disabled={isDisabled}
          variant="contained">
          {isAdding ? (
            <CircularProgress sx={{ color: "#fff" }} size="2rem" />
          ) : (
            "Add"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProduct;
