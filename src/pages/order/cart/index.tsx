import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { removeFromCart, updateCart } from "@/store/slices/cartSlice";
import { getCartTotalPrice } from "@/utils/client";
import { Product, Size, User } from "@prisma/client";
import { config } from "@/config";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { cart, sizes, users } = useAppSelector(orderAppDatas);

  const { data } = useSession();

  const user = data?.user;

  useEffect(() => {
    if (user) {
      const validUser = users.find((item) => item.email === user.email) as User;
      const userId = validUser.id;
      setUserInformation({ ...userInformation, userId });
    }
  }, [user]);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const getSize = (product: Product) => {
    const size = sizes.find((item) => item.id === product.sizeId) as Size;
    return size.name;
  };

  const [userInformation, setUserInformation] = useState({
    userId: 0,
    address: "",
    phoneNumber: 0,
  });

  const isDisabled =
    !userInformation.userId ||
    !userInformation.address ||
    !userInformation.phoneNumber;

  const handleCreateOrder = async () => {
    const response = await fetch(`${config.apiBaseUrl}/order/createOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart, userInformation }),
    });
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
        <TableContainer component={Paper}>
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
                phoneNumber: Number(event.target.value),
              })
            }
            sx={{ width: "20rem" }}
            type="number"
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
            onClick={handleCreateOrder}
            disabled={isDisabled}
            variant="contained">
            Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
