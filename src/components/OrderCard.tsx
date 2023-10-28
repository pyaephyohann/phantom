import { Box, Card, Divider, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { OrderStatus } from "@prisma/client";

interface Props {
  orderId: number;
  userName?: String;
  productQuantity: number;
  price: number;
  date: string;
  href: string;
  orderlineStatus: OrderStatus[];
}

const OrderCard = ({
  orderId,
  userName,
  productQuantity,
  price,
  date,
  href,
  orderlineStatus,
}: Props) => {
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
          width: "11rem",
          p: "1.5rem",
          borderRadius: "0.5rem",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography>Order {orderId}</Typography>
          <ShoppingCartIcon
            sx={{
              bgcolor: "primary.main",
              p: "0.5rem",
              borderRadius: "5rem",
            }}
            color="info"
          />
        </Box>
        <Divider sx={{ my: "0.8rem", bgcolor: "info.main" }} />
        <Typography sx={{ my: "0.8rem" }}>{userName}</Typography>
        <Typography sx={{ my: "0.8rem" }}>
          {productQuantity} Products
        </Typography>
        <Typography sx={{ my: "0.8rem" }}>{price} Ks</Typography>
        <Typography sx={{ my: "0.8rem" }}>{date}</Typography>
        <Box>
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
      </Card>
    </Link>
  );
};

export default OrderCard;
