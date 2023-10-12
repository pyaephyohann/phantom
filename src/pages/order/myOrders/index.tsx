import OrderCard from "@/components/OrderCard";
import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { Box, Card, Typography } from "@mui/material";
import { User } from "@prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
              href={`/order/myOrders/${order.id}`}>
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

export default MyOrders;
