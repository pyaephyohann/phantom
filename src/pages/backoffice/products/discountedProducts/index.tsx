import BackofficeProductCard from "@/components/BackofficeProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const DiscountedProducts = () => {
  const { products, isLoading } = useAppSelector(backofficeAppDatas);

  const router = useRouter();

  const discountedProducts = products.filter(
    (product) => product.discountPrice !== 0
  );

  return (
    <Box>
      {discountedProducts.length > 0 ? (
        <Typography sx={{ mb: "1rem", mt: "0.5rem" }} variant="h5">
          Discounted Products
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography sx={{ mt: "2rem" }} variant="h5">
            You dont have any discoutned products currently!
          </Typography>
          <Button
            onClick={() => router.push("/backoffice/products")}
            sx={{ mt: "2rem" }}
            variant="contained">
            Go Back
          </Button>
        </Box>
      )}
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
        )}
      </Box>
    </Box>
  );
};

export default DiscountedProducts;
