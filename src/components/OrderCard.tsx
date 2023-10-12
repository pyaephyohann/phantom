import { Box, Card, Divider, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Link from "next/link";

interface Props {
  orderId: number;
  userName: String;
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Order {orderId}</Typography>
          <AddShoppingCartIcon color="primary" />
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
