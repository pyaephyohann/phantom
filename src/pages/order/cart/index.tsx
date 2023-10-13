import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  emptyCart,
  removeFromCart,
  updateCart,
} from "@/store/slices/cartSlice";
import { getCartTotalPrice } from "@/utils/client";
import { Product, Size, User } from "@prisma/client";
import { config } from "@/config";
import { useSession } from "next-auth/react";
import { addOrder } from "@/store/slices/ordersSlice";
import { addOrderlines } from "@/store/slices/orderlinesSlice";

const Cart = () => {
  const { cart, sizes, users } = useAppSelector(orderAppDatas);

  const { data } = useSession();

  const user = data?.user;

  const router = useRouter();

  const dispatch = useAppDispatch();

  const getSize = (product: Product) => {
    const size = sizes.find((item) => item.id === product.sizeId) as Size;
    return size.name;
  };

  const [isOrdering, setIsOrdering] = useState(false);

  const [userInformation, setUserInformation] = useState({
    userEmail: user?.email,
    address: "",
    phoneNumber: "",
  });

  const isDisabled = !userInformation.address || !userInformation.phoneNumber;

  const handleCreateOrder = async () => {
    setIsOrdering(true);
    const response = await fetch(`${config.apiBaseUrl}/order/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart, userInformation }),
    });
    const { order, orderlines } = await response.json();
    dispatch(addOrder(order));
    dispatch(addOrderlines(orderlines));
    setIsOrdering(false);
    dispatch(emptyCart());
    router.push(`/order/newOrder/${order.id}`);
  };

  useEffect(() => {
    if (!cart.length) {
      router.push("/");
    }
  }, [cart]);

  return (
    <Box sx={{ mt: "8rem", width: "90%", mx: "auto" }}>
      <Typography sx={{ textAlign: "center", mb: "3rem" }} variant="h4">
        Cart
      </Typography>
      <Box>
        <TableContainer
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
          component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell
                  sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                  align="center">
                  Product
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                  align="center">
                  Price
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                  align="center">
                  Size
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                  align="center">
                  Quantity
                </TableCell>
                <TableCell
                  sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                  align="center">
                  Subtotal
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((cartItem) => (
                <TableRow
                  key={cartItem.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => dispatch(removeFromCart(cartItem))}
                      sx={{ bgcolor: "primary.main" }}>
                      <DeleteIcon color="info" sx={{ fontSize: "2rem" }} />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <img
                      style={{ height: "10rem", borderRadius: "1rem" }}
                      src={`${cartItem.product.imageUrl}`}
                      alt={cartItem.product.name}
                    />
                  </TableCell>
                  <TableCell align="center">{cartItem.product.name}</TableCell>
                  <TableCell align="center">
                    {cartItem.product.price} Ks
                  </TableCell>
                  <TableCell align="center">
                    {getSize(cartItem.product)}
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      onChange={(event) => {
                        const updatedCartItem = {
                          ...cartItem,
                          quantity:
                            Number(event.target.value) <= 0
                              ? 1
                              : Number(event.target.value),
                          subTotal:
                            Number(event.target.value) <= 0
                              ? cartItem.product.price
                              : cartItem.product.price *
                                Number(event.target.value),
                        };
                        dispatch(updateCart(updatedCartItem));
                      }}
                      type="number"
                      sx={{ width: "7rem" }}
                      defaultValue={cartItem.quantity}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {cartItem.product.price * cartItem.quantity} Ks
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
        {cart.map((cartItem) => {
          return (
            <Card
              sx={{
                p: "1.3rem",
                mb: "1rem",
                position: "relative",
              }}
              key={cartItem.id}>
              <IconButton
                onClick={() => dispatch(removeFromCart(cartItem))}
                sx={{
                  bgcolor: "primary.main",
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                }}>
                <DeleteIcon color="info" sx={{ fontSize: "1.5rem" }} />
              </IconButton>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  style={{
                    height: "10rem",
                    borderRadius: "1rem",
                    margin: "0 auto",
                  }}
                  src={`${cartItem.product.imageUrl}`}
                  alt={cartItem.product.name}
                />
              </Box>
              <Box sx={{ width: "fit-content", mx: "auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: "1.5rem",
                  }}>
                  <Typography sx={{ mr: "1rem", fontSize: "1.1rem" }}>
                    Product:
                  </Typography>
                  <Typography>{cartItem.product.name}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    my: "1.2rem",
                  }}>
                  <Typography sx={{ mr: "1rem", fontSize: "1.1rem" }}>
                    Price:
                  </Typography>
                  <Typography>{cartItem.product.price} Ks</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    my: "1.2rem",
                  }}>
                  <Typography sx={{ mr: "1rem", fontSize: "1.1rem" }}>
                    Size:
                  </Typography>
                  <Typography>{getSize(cartItem.product)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    my: "1.2rem",
                  }}>
                  <Typography sx={{ mr: "1rem", fontSize: "1.1rem" }}>
                    Quantity:
                  </Typography>
                  <TextField
                    onChange={(event) => {
                      const updatedCartItem = {
                        ...cartItem,
                        quantity:
                          Number(event.target.value) <= 0
                            ? 1
                            : Number(event.target.value),
                        subTotal:
                          Number(event.target.value) <= 0
                            ? cartItem.product.price
                            : cartItem.product.price *
                              Number(event.target.value),
                      };
                      dispatch(updateCart(updatedCartItem));
                    }}
                    type="number"
                    sx={{ width: "6rem" }}
                    defaultValue={cartItem.quantity}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: "1.2rem",
                  }}>
                  <Typography sx={{ mr: "1rem", fontSize: "1.1rem" }}>
                    Subtotal:
                  </Typography>
                  <Typography>
                    {cartItem.product.price * cartItem.quantity} Ks
                  </Typography>
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1.5rem" }}>
        <Box>
          <Typography sx={{ mb: "0.8rem" }} variant="h5">
            Total Price
          </Typography>
          <Typography>{getCartTotalPrice(cart)} Ks</Typography>
        </Box>
      </Box>
      <Box sx={{ mt: "4rem" }}>
        <Typography
          sx={{ textAlign: "center", fontSize: "1.8rem", mb: "4rem" }}>
          Please Let us know your informations before order!
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <TextField
            onChange={(event) =>
              setUserInformation({
                ...userInformation,
                address: event.target.value,
              })
            }
            sx={{ width: "20rem", mb: "2.5rem" }}
            multiline
            rows={3}
            label="Address"
          />
          <TextField
            onChange={(event) =>
              setUserInformation({
                ...userInformation,
                phoneNumber: event.target.value,
              })
            }
            sx={{ width: "20rem" }}
            label="Phone Number"
          />
        </Box>
      </Box>
      <Box sx={{ my: "4rem" }}>
        <Typography sx={{ textAlign: "center", mb: "2rem" }} variant="h5">
          Order Here!
        </Typography>
        <Box sx={{ width: "fit-content", mx: "auto" }}>
          <Button
            onClick={() => {
              if (user) {
                handleCreateOrder();
              } else {
                router.push("/auth/order/signin");
              }
            }}
            disabled={isDisabled}
            variant="contained">
            {isOrdering ? (
              <CircularProgress sx={{ color: "info.main" }} />
            ) : (
              "Order"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
