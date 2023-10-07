import { Box, Card, Chip, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  discountPrice?: number;
  href: string;
}

const OrderAppProductCard = ({
  imageUrl,
  name,
  price,
  discountPrice,
  href,
}: Props) => {
  return (
    <Card
      sx={{
        py: "1rem",
        px: "1.5rem",
        borderRadius: "0.5rem",
        position: "relative",
      }}>
      <Link style={{ textDecoration: "none", color: "black" }} href={href}>
        <Image alt={name} src={imageUrl} width={180} height={180} />
        <Typography sx={{ mt: "1rem", mb: "0.9rem" }}>{name}</Typography>
        <Box>
          {discountPrice ? (
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ textDecoration: "line-through", mr: "0.5rem" }}>
                {price} Ks
              </Typography>
              <Typography>{discountPrice} Ks</Typography>
            </Box>
          ) : (
            <Typography>{price} Ks</Typography>
          )}
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "1rem",
        }}>
        <IconButton>
          <FavoriteBorderIcon sx={{ fontSize: "1.8rem" }} color="primary" />
        </IconButton>
        <Chip
          color="primary"
          clickable
          icon={<ShoppingCartIcon />}
          label="Add to cart"
        />
      </Box>
    </Card>
  );
};

export default OrderAppProductCard;
