import OrderCard from "@/components/OrderCard";
import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
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
              />
            </Box>
          );
        })}
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
        {orders.map((order) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              href={`/backoffice/orders/${order.id}`}>
              <Card
                sx={{
                  display: "flex",
                  width: "90%",
                  justifyContent: "space-between",
                  py: "0.8rem",
                  px: "1.2rem",
                  mb: "2rem",
                  mx: "auto",
                }}>
                <Typography>Order {order.id}</Typography>
                <Typography>{order.price} Ks</Typography>
                <Typography>
                  {dayjs(order.createdAt).format("DD.MM.YYYY")}
                </Typography>
              </Card>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default Orders;
