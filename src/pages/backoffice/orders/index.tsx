import OrderCard from "@/components/OrderCard";
import OrderCardMobile from "@/components/OrderCardMobile";
import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { getOrderlineStatus } from "@/utils/client";
import { Box, Card, Typography } from "@mui/material";
import { User } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";

const Orders = () => {
  const { orders, orderlines, users } = useAppSelector(orderAppDatas);

  const getUserName = (userId: number) => {
    const user = users.find((item) => item.id === userId) as User;
    return user.name;
  };

  const getProductQuantity = (orderId: number) => {
    return orderlines.filter((item) => item.orderId === orderId).length;
  };

  return (
    <Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex", md: "flex" },
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-start",
          },
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
      <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
        {orders.map((order) => {
          return (
            <OrderCardMobile
              order={order}
              orderlineStatus={getOrderlineStatus(order.id, orderlines)}
              href={`/backoffice/orders/${order.id}`}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Orders;
