import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import NewProduct from "./NewProduct";
import { useState } from "react";

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
      <Box>
        {products.map((product) => {
          return <Box key={product.id}>{product.name}</Box>;
        })}
      </Box>
      <NewProduct open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Products;
