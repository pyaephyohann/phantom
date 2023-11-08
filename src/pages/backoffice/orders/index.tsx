import OrderCard from "@/components/OrderCard";
import OrderCardMobile from "@/components/OrderCardMobile";
import OrderCardSkeleton from "@/components/OrderCardSkeleton";
import OrderCardSkeletonMobile from "@/components/OrderCardSkeletonMobile";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { getOrderlineStatus } from "@/utils/client";
import { Box, Typography } from "@mui/material";
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

  if (isLoading)
    return (
      <Box>
        <OrderCardSkeleton />
        <OrderCardSkeletonMobile />
      </Box>
    );

  return (
    <Box>
      <Box>
        {orders.length ? (
          ""
        ) : (
          <Typography sx={{ textAlign: "center" }} variant="h5">
            You dont have any orders yet!
          </Typography>
        )}
      </Box>
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
    </Box>
  );
};

export default Orders;
