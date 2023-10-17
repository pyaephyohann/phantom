import OrderCard from "@/components/OrderCard";
import OrderCardMobile from "@/components/OrderCardMobile";
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

  const { orders, users, orderlines } = useAppSelector(orderAppDatas);

  const currentUser = users.find((item) => item.email === user?.email) as User;

  const currentUserOrders = orders.filter(
    (order) => order.userId === currentUser.id
  );

  const getProductQuantity = (orderId: number) => {
    return orderlines.filter((item) => item.orderId === orderId).length;
  };

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
        {orders.map((order) => {
          return (
            <OrderCardMobile
              order={order}
              orderlineStatus={getOrderlineStatus(order.id, orderlines)}
              href={`/order/myOrders/${order.id}`}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default MyOrders;
