import OrderAppProductCard from "@/components/OrderAppProductCard";
import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { Box, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

const WishList = () => {
  const { data } = useSession();

  const { users, wishLists, products } = useAppSelector(orderAppDatas);

  const user = users.find((item) => item.email === data?.user?.email) as User;

  const wishListProductIds = wishLists.map((item) => item.productId);

  const wishListUserIds = wishLists.map((item) => item.userId);

  const wishListedProducts = products.filter(
    (product) =>
      wishListProductIds.includes(product.id) &&
      wishListUserIds.includes(user.id)
  );

  return (
    <Box sx={{ mt: "7rem" }}>
      <Box sx={{ mb: "1rem" }}>
        {wishListedProducts.length ? (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Your Wish List
          </Typography>
        ) : (
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            You dont have any wish list products
          </Typography>
        )}
      </Box>
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
        {wishListedProducts.map((product) => {
          return (
            <Box sx={{ m: "1rem" }}>
              <OrderAppProductCard
                product={product}
                href={`/order/productDetail/${product.id}`}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default WishList;
