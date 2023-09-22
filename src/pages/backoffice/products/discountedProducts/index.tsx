import BackofficeProductCard from "@/components/BackofficeProductCard";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Typography } from "@mui/material";

const DiscountedProducts = () => {
  const { products } = useAppSelector(backofficeAppDatas);
  const discountedProducts = products.filter(
    (product) => product.discountPrice !== 0
  );

  return (
    <Box>
      <Typography sx={{ mb: "1rem", mt: "0.5rem" }} variant="h5">
        Discounted Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-start",
          },
        }}
      >
        {discountedProducts.map((product) => {
          return (
            <Box sx={{ m: "1rem" }} key={product.id}>
              <BackofficeProductCard
                name={product.name}
                imageUrl={product.imageUrl as string}
                price={product.price}
                discountPrice={
                  product.discountPrice ? product.discountPrice : 0
                }
                genderId={product.genderId}
                href={`/backoffice/products/discountedProducts/${product.id}`}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default DiscountedProducts;
