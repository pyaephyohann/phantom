import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button, Chip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewProduct from "./NewProduct";
import { useState } from "react";
import BackofficeProductCard from "@/components/BackofficeProductCard";
import { useRouter } from "next/router";
import SuccessAlert from "@/components/SuccessAlert";

const Products = () => {
  const { products } = useAppSelector(backofficeAppDatas);

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
        }}
      >
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
          startIcon={<AddIcon />}
        >
          New Product
        </Button>
      </Box>
      <Box>
        {products.length ? (
          ""
        ) : (
          <Typography
            sx={{ fontSize: "2rem", textAlign: "center", mt: "3rem" }}
          >
            Go create your first product
          </Typography>
        )}
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
        }}
      >
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
