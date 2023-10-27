import OrderCard from "@/components/OrderCard";
import OrderCardMobile from "@/components/OrderCardMobile";
import OrderCardSkeleton from "@/components/OrderCardSkeleton";
import OrderCardSkeletonMobile from "@/components/OrderCardSkeletonMobile";
import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { getOrderlineStatus } from "@/utils/client";
import { Box, Card, Typography } from "@mui/material";
import { User } from "@prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";

const MyOrders = () => {
  const { data } = useSession();
  const user = data?.user;

  const { orders, users, orderlines, isLoading } =
    useAppSelector(orderAppDatas);

  const currentUser = user && users.find((item) => item.email === user?.email);

  const currentUserOrders = orders.filter(
    (order) => currentUser && order.userId === currentUser.id
  );

  const getProductQuantity = (orderId: number) => {
    return orderlines.filter((item) => item.orderId === orderId).length;
  };

  return (
    <Box sx={{ mt: "7rem", px: "2rem" }}>
      <Typography sx={{ textAlign: "center", mb: "1rem" }} variant="h5">
        My Orders
      </Typography>
      {isLoading ? (
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
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
                <OrderCardSkeleton />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: { xs: "none", sm: "flex", md: "flex" },
            flexWrap: "wrap",
          }}>
          {currentUserOrders.map((order) => {
            return (
              <Box sx={{ m: "1rem" }} key={order.id}>
                <OrderCard
                  orderId={order.id}
                  productQuantity={getProductQuantity(order.id)}
                  price={order.price}
                  date={dayjs(order.createdAt).format("DD.MM.YYYY")}
                  href={`/order/myOrders/${order.id}`}
                  orderlineStatus={getOrderlineStatus(order.id, orderlines)}
                />
              </Box>
            );
          })}
        </Box>
      )}
      {isLoading ? (
        <Box
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
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
                <OrderCardSkeletonMobile />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
          {orders.map((order) => {
            return (
              <Box key={order.id}>
                <OrderCardMobile
                  order={order}
                  orderlineStatus={getOrderlineStatus(order.id, orderlines)}
                  href={`/order/myOrders/${order.id}`}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default MyOrders;
