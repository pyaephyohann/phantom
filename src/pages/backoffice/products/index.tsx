import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button, Chip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewProduct from "./NewProduct";
import { useState } from "react";
import BackofficeProductCard from "@/components/BackofficeProductCard";
import { useRouter } from "next/router";
import SuccessAlert from "@/components/SuccessAlert";
import ProductSkeleton from "@/components/ProductSkeleton";

const Products = () => {
  const { products, isLoading } = useAppSelector(backofficeAppDatas);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}>
        <Chip
          sx={{ mr: "1.5rem", color: "white" }}
          color="secondary"
          label="Discounted Products"
          onClick={() => {
            router.push("/backoffice/products/discountedProducts");
          }}
        />
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}>
          New Product
        </Button>
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
              mt: "1rem",
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "flex-start",
              },
            }}>
            {products.map((product) => {
              return (
                <Box sx={{ m: "1rem" }} key={product.id}>
                  <BackofficeProductCard
                    href={`/backoffice/products/${product.id}`}
                    name={product.name}
                    imageUrl={product.imageUrl as string}
                    price={product.price}
                    discountPrice={
                      product.discountPrice ? product.discountPrice : 0
                    }
                    genderId={product.genderId}
                  />
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <NewProduct
        open={open}
        setOpen={setOpen}
        callBack={() => setOpenSuccessAlert(true)}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="New Product Created Successfully"
      />
    </Box>
  );
};

export default Products;
