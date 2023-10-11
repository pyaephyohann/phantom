import OrderCard from "@/components/OrderCard";
import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { Box } from "@mui/material";
import { User } from "@prisma/client";
import dayjs from "dayjs";

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
          display: "flex",
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
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Orders;
