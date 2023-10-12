import { Box, Card, Divider, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

interface Props {
  orderId: number;
  userName?: String;
  productQuantity: number;
  price: number;
  date: string;
  href: string;
}

const OrderCard = ({
  orderId,
  userName,
  productQuantity,
  price,
  date,
  href,
}: Props) => {
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
            sx={{ bgcolor: "primary.main", p: "0.5rem", borderRadius: "5rem" }}
            color="info"
          />
        </Box>
        <Divider sx={{ my: "0.8rem", bgcolor: "info.main" }} />
        <Typography sx={{ my: "0.8rem" }}>{userName}</Typography>
        <Typography sx={{ my: "0.8rem" }}>
          {productQuantity} Products
        </Typography>
        <Typography sx={{ my: "0.8rem" }}>{price} Ks</Typography>
        <Typography sx={{ mt: "0.8rem" }}>{date}</Typography>
      </Card>
    </Link>
  );
};

export default OrderCard;
