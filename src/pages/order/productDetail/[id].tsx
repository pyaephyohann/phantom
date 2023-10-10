import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";
import { Color, Gender, Product, Size } from "@prisma/client";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import OrderAppProductCard from "@/components/OrderAppProductCard";
import { addToCart } from "@/store/slices/cartSlice";
import { useState } from "react";
import SuccessAlert from "@/components/SuccessAlert";
import { generateRandomString } from "@/utils/client";

const ProductDetail = () => {
  const router = useRouter();
  const productId = router.query.id;

  const { products, sizes, colors, genders, cart } =
    useAppSelector(orderAppDatas);

  const dispatch = useAppDispatch();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const productsInCartIds = cart.map((item) => item.product.id);

  const product = products.find(
    (item) => item.id === Number(productId)
  ) as Product;

  if (!product) {
    return (
      <Box>
        <Typography>Oops! Your Product does not exist</Typography>
      </Box>
    );
  }

  const isInCart = productsInCartIds.includes(product.id);

  const size = sizes.find((item) => item.id === product.sizeId) as Size;

  const color = colors.find((item) => item.id === product.colorId) as Color;

  const gender = genders.find((item) => item.id === product.genderId) as Gender;

  return (
    <Box>
      <Paper
        sx={{
          width: { xs: "80%", sm: "70%", md: "70%" },
          mx: "auto",
          display: "flex",
          p: "1.5rem",
          borderRadius: "2rem",
          mt: "7rem",
        }}>
        <Box sx={{ width: "50%" }}>
          <img
            style={{ width: "100%", borderRadius: "1rem" }}
            src={`${product.imageUrl}`}
            alt={product.name}
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          {/* header add to cart and favourite */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}>
            <IconButton sx={{ mr: "1rem" }}>
              <FavoriteBorderIcon sx={{ fontSize: "2.2rem" }} color="primary" />
            </IconButton>
            {isInCart ? (
              <Typography>View Cart</Typography>
            ) : (
              <Box
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: generateRandomString(),
                      product,
                      quantity: 1,
                      subTotal: product.price,
                    })
                  );
                  setOpenSuccessAlert(true);
                }}
                sx={{
                  bgcolor: "primary.main",
                  width: "fit-content",
                  borderRadius: "1rem",
                  p: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  userSelect: "none",
                }}>
                <ShoppingCartIcon color="info" />
                <Typography
                  sx={{
                    color: "info.main",
                    ml: "0.4rem",
                    display: { xs: "none", sm: "block" },
                  }}>
                  Add to cart
                </Typography>
              </Box>
            )}
          </Box>
          {/* product details */}
          <Box sx={{ py: "2rem", pl: { xs: "2rem", sm: "2rem", md: "3rem" } }}>
            <Typography
              sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" } }}>
              {product.name}
            </Typography>
            <Box sx={{ mt: "1.7rem" }}>
              {product.discountPrice ? (
                <Box
                  sx={{
                    display: "flex",
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" },
                  }}>
                  <Typography
                    sx={{ textDecoration: "line-through", mr: "0.5rem" }}>
                    {product.price} Ks
                  </Typography>
                  <Typography>{product.discountPrice} Ks</Typography>
                </Box>
              ) : (
                <Typography
                  sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" } }}>
                  Price - {product.price} Ks
                </Typography>
              )}
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" },
                my: "0.5rem",
              }}>
              Size - {size.name}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" } }}>
              Color - {color.name}
            </Typography>
            <Typography
              sx={{
                mt: "0.5rem",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" },
              }}>
              For {gender.name}
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Box sx={{ mt: "2rem" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Explore more
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: {
              xs: "center",
              sm: "center",
              md: "flex-start",
            },
            mt: "0.5rem",
          }}>
          {products
            .filter((item) => item.id !== product.id)
            .map((product) => {
              return (
                <Box sx={{ m: "1rem" }} key={product.id}>
                  <OrderAppProductCard
                    product={product}
                    href={`/order/productDetail/${product.id}`}
                  />
                </Box>
              );
            })}
        </Box>
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="Added to cart"
      />
    </Box>
  );
};

export default ProductDetail;
