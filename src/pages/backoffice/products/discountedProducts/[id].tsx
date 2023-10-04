import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Product } from "@prisma/client";
import ProductDiscount from "@/components/ProductDiscount";

const EditDiscountedProducts = () => {
  const router = useRouter();
  const productId = router.query.id;

  const { products } = useAppSelector(backofficeAppDatas);

  const product = products.find(
    (item) => item.id === Number(productId)
  ) as Product;

  if (!product)
    return (
      <Box>
        <Typography>Your Product does not exist!</Typography>
      </Box>
    );

  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          mt: { md: "1rem" },
        }}
        variant="h5">
        Edit Your Discount Price
      </Typography>
      <Box
        sx={{
          display: { xs: "block", sm: "block", md: "flex" },
          mt: { xs: "2rem", sm: "2rem", md: "3rem" },
        }}>
        <Box
          sx={{
            width: { md: "50%" },
            display: "flex",
            justifyContent: "center",
          }}>
          <Image
            style={{ borderRadius: "0.5rem" }}
            alt={product.name}
            src={product.imageUrl as string}
            width={250}
            height={250}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: { xs: "2rem", sm: "2rem", md: "1rem" },
          }}>
          <Typography sx={{ fontSize: "1.2rem" }}>{product.name}</Typography>
          <ProductDiscount productId={Number(productId)} />
        </Box>
      </Box>
    </Box>
  );
};

export default EditDiscountedProducts;
