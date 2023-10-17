import { Box, Card, Typography } from "@mui/material";
import { Order, OrderStatus } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  order: Order;
  orderlineStatus: OrderStatus[];
  href: string;
}

const OrderCardMobile = ({ order, orderlineStatus, href }: Props) => {
  const getStatus = () => {
    if (orderlineStatus.includes(OrderStatus.PENDING)) {
      return "Pending";
    } else if (orderlineStatus.includes(OrderStatus.REJECTED)) {
      return "Rejected";
    } else {
      return "Accepted";
    }
  };

  return (
    <Link style={{ textDecoration: "none" }} href={href}>
      <Card
        sx={{
          width: "90%",
          py: "1.2rem",
          px: "1.2rem",
          mb: "2rem",
          mx: "auto",
        }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "1.2rem" }}>
          {getStatus() === "Pending" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Pending</Typography>
              <Box
                sx={{
                  bgcolor: "warning.main",
                  width: "0.8rem",
                  height: "0.8rem",
                  borderRadius: "5rem",
                  ml: "1rem",
                }}></Box>
            </Box>
          )}
          {getStatus() === "Rejected" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Rejected</Typography>
              <Box
                sx={{
                  bgcolor: "error.main",
                  width: "0.8rem",
                  height: "0.8rem",
                  borderRadius: "5rem",
                  ml: "1rem",
                }}></Box>
            </Box>
          )}
          {getStatus() === "Accepted" && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography>Accepted</Typography>
              <Box
                sx={{
                  bgcolor: "success.main",
                  width: "0.8rem",
                  height: "0.8rem",
                  borderRadius: "5rem",
                  ml: "1rem",
                }}></Box>
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Order {order.id}</Typography>
          <Typography>{order.price} Ks</Typography>
          <Typography>{dayjs(order.createdAt).format("DD.MM.YYYY")}</Typography>
        </Box>
      </Card>
    </Link>
  );
};

export default OrderCardMobile;
