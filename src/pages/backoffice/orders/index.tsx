import OrderCard from "@/components/OrderCard";
import OrderCardMobile from "@/components/OrderCardMobile";
import OrderCardSkeleton from "@/components/OrderCardSkeleton";
import OrderCardSkeletonMobile from "@/components/OrderCardSkeletonMobile";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { getOrderlineStatus } from "@/utils/client";
import { Box, Card, Typography } from "@mui/material";
import { User } from "@prisma/client";
import dayjs from "dayjs";

const Orders = () => {
  const { orders, orderlines, users, isLoading } =
    useAppSelector(backofficeAppDatas);

  const getUserName = (userId: number) => {
    const user = users.find((item) => item.id === userId) as User;
    return user.name;
  };

  const getProductQuantity = (orderId: number) => {
    return orderlines.filter((item) => item.orderId === orderId).length;
  };

  return (
    <Box>
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
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "flex-start",
            },
            mb: "2rem",
          }}>
          {orders.map((order) => {
            return (
              <Box sx={{ m: "1rem" }} key={order.id}>
                <OrderCard
                  orderId={order.id}
                  userName={getUserName(order.userId)}
                  productQuantity={getProductQuantity(order.id)}
                  price={order.price}
                  date={dayjs(order.createdAt).format("DD.MM.YYYY")}
                  href={`/backoffice/orders/${order.id}`}
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
        <Box
          sx={{ display: { xs: "block", sm: "none", md: "none", mb: "2rem" } }}>
          {orders.map((order) => {
            return (
              <Box key={order.id}>
                <OrderCardMobile
                  order={order}
                  orderlineStatus={getOrderlineStatus(order.id, orderlines)}
                  href={`/backoffice/orders/${order.id}`}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Orders;
