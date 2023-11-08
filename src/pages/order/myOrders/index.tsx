import OrderCard from "@/components/OrderCard";
import OrderCardMobile from "@/components/OrderCardMobile";
import OrderCardSkeleton from "@/components/OrderCardSkeleton";
import OrderCardSkeletonMobile from "@/components/OrderCardSkeletonMobile";
import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { getOrderlineStatus } from "@/utils/client";
import { Box, Card, Typography } from "@mui/material";
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

  if (isLoading)
    return (
      <Box sx={{ mt: "7rem" }}>
        <Typography sx={{ textAlign: "center", mb: "1rem" }} variant="h5">
          My Orders
        </Typography>
        <OrderCardSkeleton />
        <OrderCardSkeletonMobile />
      </Box>
    );

  return (
    <Box sx={{ mt: "7rem", px: "2rem" }}>
      <Typography sx={{ textAlign: "center", mb: "1rem" }} variant="h5">
        My Orders
      </Typography>
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
      <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
        {currentUserOrders.map((order) => {
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
    </Box>
  );
};

export default MyOrders;
