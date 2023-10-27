import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Order,
  OrderStatus,
  Orderline,
  Product,
  Size,
  User,
} from "@prisma/client";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { config } from "@/config";
import { updateOrderline } from "@/store/slices/orderlinesSlice";
import { useState } from "react";
import SuccessAlert from "@/components/SuccessAlert";
import BoltIcon from "@mui/icons-material/Bolt";
import Popover from "@mui/material/Popover";

const Order = () => {
  const router = useRouter();
  const orderId = router.query.id;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { orderlines, products, sizes, orders, users } =
    useAppSelector(backofficeAppDatas);

  const order = orders.find((item) => item.id === Number(orderId)) as Order;

  const dispatch = useAppDispatch();

  const [successAlertMessage, setSuccessAlertMessage] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const validOrderlines = orderlines.filter(
    (item) => item.orderId === Number(orderId)
  );

  const getProduct = (productId: number) => {
    return products.find((item) => item.id === productId) as Product;
  };

  const getSize = (sizeId: number) => {
    return sizes.find((item) => item.id === sizeId) as Size;
  };

  const getUser = (userId: number) => {
    return users.find((item) => item.id === userId) as User;
  };

  const handleUpdateOrderLineStatus = async (
    orderlineId: number,
    event: SelectChangeEvent<"PENDING" | "ACCEPTED" | "REJECTED">
  ) => {
    const response = await fetch(`${config.apiBaseUrl}/backoffice/orderlines`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderlineId,
        status: event.target.value as OrderStatus,
      }),
    });
    const updatedOrderline = await response.json();
    dispatch(updateOrderline(updatedOrderline));
    setSuccessAlertMessage(`Status ${event.target.value}`);
    setOpenSuccessAlert(true);
  };

  const handleUpdateOrderStatus = async (
    orderId: number,
    event: SelectChangeEvent<"PENDING" | "ACCEPTED" | "REJECTED">
  ) => {
    const response = await fetch(`${config.apiBaseUrl}/backoffice/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, status: event.target.value }),
    });
    const updatedOrderlines = await response.json();
    updatedOrderlines.forEach((orderline: Orderline) => {
      dispatch(updateOrderline(orderline));
    });
    setSuccessAlertMessage(
      `Order Status ${event.target.value} for all products`
    );
    setOpenSuccessAlert(true);
    handleClose();
  };

  if (!order) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Order does not exist
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", mt: "1rem" }}>
        Order {orderId}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", my: "0.5rem" }}>
        <IconButton onClick={handleClick}>
          <BoltIcon sx={{ fontSize: "2rem" }} color="secondary" />
        </IconButton>
        <Popover
          sx={{ width: "200rem" }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}>
          <Box sx={{ p: "1rem" }}>
            <Typography>Change all the products status!</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: "1.5rem" }}>
              <FormControl sx={{ width: "10rem" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  onChange={(
                    event: SelectChangeEvent<
                      "PENDING" | "ACCEPTED" | "REJECTED"
                    >
                  ) => {
                    handleUpdateOrderStatus(order.id, event);
                  }}>
                  <MenuItem value={OrderStatus.PENDING}>Pending</MenuItem>
                  <MenuItem value={OrderStatus.ACCEPTED}>Accept</MenuItem>
                  <MenuItem value={OrderStatus.REJECTED}>Reject</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Popover>
      </Box>
      <Box sx={{ mt: "1rem" }}>
        <Box>
          <TableContainer
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
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
                  <TableCell
                    sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
                    align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {validOrderlines.map((orderline) => (
                  <TableRow
                    key={orderline.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center" component="th" scope="row">
                      <img
                        style={{ height: "10rem", borderRadius: "1rem" }}
                        src={`${getProduct(orderline.productId).imageUrl}`}
                        alt={`${getProduct(orderline.productId).name}`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {getProduct(orderline.productId).name}
                    </TableCell>
                    <TableCell align="center">
                      {getProduct(orderline.productId).discountPrice ? (
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              textDecoration: "line-through",
                              mr: "0.5rem",
                            }}>
                            {getProduct(orderline.productId).price} Ks
                          </Typography>
                          <Typography>
                            {getProduct(orderline.productId).discountPrice} Ks
                          </Typography>
                        </Box>
                      ) : (
                        <Typography>
                          {getProduct(orderline.productId).price} Ks
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {getSize(getProduct(orderline.productId).sizeId).name}
                    </TableCell>
                    <TableCell align="center">{orderline.quantity}</TableCell>
                    <TableCell align="center">
                      {orderline.subTotalPrice} Ks
                    </TableCell>
                    <TableCell align="center">
                      <FormControl sx={{ width: "7rem" }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                          defaultValue={orderline.status}
                          label="Status"
                          onChange={(event) =>
                            handleUpdateOrderLineStatus(orderline.id, event)
                          }>
                          <MenuItem value={OrderStatus.PENDING}>
                            Pending
                          </MenuItem>
                          <MenuItem value={OrderStatus.ACCEPTED}>
                            Accept
                          </MenuItem>
                          <MenuItem value={OrderStatus.REJECTED}>
                            Reject
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
          {validOrderlines.map((orderline) => {
            return (
              <Card
                sx={{
                  p: "1.3rem",
                  mb: "1rem",
                }}
                key={orderline.id}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{
                      height: "10rem",
                      borderRadius: "1rem",
                      margin: "0 auto",
                    }}
                    src={`${getProduct(orderline.productId).imageUrl}`}
                    alt={`${getProduct(orderline.productId).name}`}
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
                    <Typography>
                      {getProduct(orderline.productId).name}
                    </Typography>
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
                    <Typography>
                      {getProduct(orderline.productId).discountPrice ? (
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              textDecoration: "line-through",
                              mr: "0.5rem",
                            }}>
                            {getProduct(orderline.productId).price} Ks
                          </Typography>
                          <Typography>
                            {getProduct(orderline.productId).discountPrice} Ks
                          </Typography>
                        </Box>
                      ) : (
                        <Typography>
                          {getProduct(orderline.productId).price} Ks
                        </Typography>
                      )}
                    </Typography>
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
                    <Typography>
                      {getSize(getProduct(orderline.productId).sizeId).name}
                    </Typography>
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
                    <Typography>{orderline.quantity}</Typography>
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
                    <Typography>{orderline.subTotalPrice} Ks</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: "1.5rem",
                    }}>
                    <Typography sx={{ mr: "1rem", fontSize: "1.1rem" }}>
                      Status
                    </Typography>
                    <FormControl sx={{ width: "7rem" }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        defaultValue={orderline.status}
                        label="Status"
                        onChange={(event) =>
                          handleUpdateOrderLineStatus(orderline.id, event)
                        }>
                        <MenuItem value={OrderStatus.PENDING}>Pending</MenuItem>
                        <MenuItem value={OrderStatus.ACCEPTED}>Accept</MenuItem>
                        <MenuItem value={OrderStatus.REJECTED}>Reject</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: "1.5rem",
          mb: "3rem",
        }}>
        <Box>
          <Typography sx={{ mb: "0.8rem" }} variant="h5">
            Total Price
          </Typography>
          <Typography>{order.price} Ks</Typography>
        </Box>
      </Box>
      <Box sx={{ mb: "5rem" }}>
        <Typography sx={{ mb: "2rem", fontSize: "1.8rem" }}>
          Customer Informations
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: "0.5rem", fontSize: "1.2rem" }}>
            Name:
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            {getUser(order.userId).name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", my: "1rem" }}>
          <Typography sx={{ mr: "0.5rem", fontSize: "1.2rem" }}>
            Address:
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>{order.address}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: "0.5rem", fontSize: "1.2rem" }}>
            Phone Number:
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            {order.phoneNumber}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: "1rem" }}>
          <Typography sx={{ mr: "0.5rem", fontSize: "1.2rem" }}>
            Email:
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            {getUser(order.userId).email}
          </Typography>
        </Box>
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message={successAlertMessage}
      />
    </Box>
  );
};

export default Order;
