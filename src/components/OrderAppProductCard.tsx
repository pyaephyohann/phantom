import { Box, Card, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Product, User } from "@prisma/client";
import Chip from "@mui/material/Chip";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { useState } from "react";
import SuccessAlert from "./SuccessAlert";
import { generateRandomString } from "@/utils/client";
import { config } from "@/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  addToWishLists,
  removeFromWishLists,
} from "@/store/slices/wishListsSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  product: Product;
  href: string;
}

const OrderAppProductCard = ({ product, href }: Props) => {
  const { cart, users, wishLists } = useAppSelector(orderAppDatas);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { data } = useSession();

  const user = data?.user;

  const currentUser = data?.user
    ? (users.find((item) => item.email === user?.email) as User)
    : undefined;

  const productsInCartIds = cart.map((item) => item.product.id);

  const isInCart = productsInCartIds.includes(product.id);

  const [successAlertMessage, setSuccessAlertMessage] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const isInWishList = (productId: number, userId: number) => {
    const wishList = wishLists.find(
      (item) => item.userId === userId && item.productId === productId
    );
    return wishList ? true : false;
  };

  const handleAddToWishList = async (productId: number, userId: number) => {
    const response = await fetch(`${config.apiBaseUrl}/order/wishLists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, userId }),
    });
    const newWishList = await response.json();
    dispatch(addToWishLists(newWishList));
    setSuccessAlertMessage("Added To Wish List");
    setOpenSuccessAlert(true);
  };

  const handleRemoveFromWishLists = async (
    productId: number,
    userId: number
  ) => {
    await fetch(`${config.apiBaseUrl}/order/wishLists`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, userId }),
    });
    dispatch(removeFromWishLists({ productId, userId }));
    setSuccessAlertMessage("Removed From Wish List");
    setOpenSuccessAlert(true);
  };

  return (
    <Card
      sx={{
        py: "1rem",
        px: "1.5rem",
        borderRadius: "0.5rem",
        position: "relative",
        bgcolor: "background.paper",
      }}>
      {product.discountPrice ? (
        <Chip
          sx={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            color: "white",
          }}
          label="Discount"
          color="primary"
        />
      ) : (
        ""
      )}
      <Link style={{ textDecoration: "none", color: "black" }} href={href}>
        <Image
          style={{ borderRadius: "0.5rem" }}
          alt={product.name}
          src={product.imageUrl as string}
          width={180}
          height={180}
        />
        <Typography sx={{ mt: "1rem", mb: "0.9rem", color: "info.main" }}>
          {product.name}
        </Typography>
        <Box sx={{ color: "info.main" }}>
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
        {currentUser ? (
          <Box>
            {isInWishList(product.id, currentUser.id) ? (
              <IconButton
                onClick={() => {
                  handleRemoveFromWishLists(product.id, currentUser.id);
                }}>
                <FavoriteIcon sx={{ fontSize: "1.8rem" }} color="primary" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  handleAddToWishList(product.id, currentUser.id);
                }}>
                <FavoriteBorderIcon
                  sx={{ fontSize: "1.8rem" }}
                  color="primary"
                />
              </IconButton>
            )}
          </Box>
        ) : (
          <IconButton
            onClick={() => {
              router.push("/auth/order/signin");
            }}>
            <FavoriteBorderIcon sx={{ fontSize: "1.8rem" }} color="primary" />
          </IconButton>
        )}
        {isInCart ? (
          <Link
            style={{ textDecoration: "none", color: "#FCE22A" }}
            href={"/order/cart"}>
            View Cart
          </Link>
        ) : (
          <Chip
            sx={{ color: "info.main" }}
            onClick={() => {
              dispatch(
                addToCart({
                  id: generateRandomString(),
                  product,
                  quantity: 1,
                  subTotal: product.price,
                })
              );
              setSuccessAlertMessage("Added to cart");
              setOpenSuccessAlert(true);
            }}
            color="primary"
            clickable
            icon={<ShoppingCartIcon color="info" />}
            label="Add to cart"
          />
        )}
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message={successAlertMessage}
      />
    </Card>
  );
};

export default OrderAppProductCard;
