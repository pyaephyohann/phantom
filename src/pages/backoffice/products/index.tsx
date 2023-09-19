import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewProduct from "./NewProduct";
import { useState } from "react";
import BackofficeProductCard from "@/components/BackofficeProductCard";

const Products = () => {
  const { products } = useAppSelector(backofficeAppDatas);
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                genderId={product.genderId}
              />
            </Box>
          );
        })}
      </Box>
      <NewProduct open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Products;
