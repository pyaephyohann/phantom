import { Box, Card, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product } from "@prisma/client";
import Chip from "@mui/material/Chip";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { orderAppDatas } from "@/store/slices/orderSlice";
import { useState } from "react";
import SuccessAlert from "./SuccessAlert";
import { generateRandomString } from "@/utils/client";

interface Props {
  product: Product;
  href: string;
}

const OrderAppProductCard = ({ product, href }: Props) => {
  const { cart } = useAppSelector(orderAppDatas);

  const productsInCartIds = cart.map((item) => item.product.id);

  const isInCart = productsInCartIds.includes(product.id);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <Card
      sx={{
        py: "1rem",
        px: "1.5rem",
        borderRadius: "0.5rem",
        position: "relative",
      }}>
      <Link style={{ textDecoration: "none", color: "black" }} href={href}>
        <Image
          alt={product.name}
          src={product.imageUrl as string}
          width={180}
          height={180}
        />
        <Typography sx={{ mt: "1rem", mb: "0.9rem" }}>
          {product.name}
        </Typography>
        <Box>
          {product.discountPrice ? (
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ textDecoration: "line-through", mr: "0.5rem" }}>
                {product.price} Ks
              </Typography>
              <Typography>{product.discountPrice} Ks</Typography>
            </Box>
          ) : (
            <Typography>{product.price} Ks</Typography>
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
        {isInCart ? (
          <Typography>View cart</Typography>
        ) : (
          <Chip
            onClick={() => {
              dispatch(
                addToCart({
                  id: generateRandomString(),
                  product,
                  quantity: 1,
                })
              );
              setOpenSuccessAlert(true);
            }}
            color="primary"
            clickable
            icon={<ShoppingCartIcon />}
            label="Add to cart"
          />
        )}
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="Added to cart"
      />
    </Card>
  );
};

export default OrderAppProductCard;
