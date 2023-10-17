import { useAppSelector } from "@/store/hooks";
import { orderAppDatas } from "@/store/slices/orderAppSlice";
import { Box, Card, Typography } from "@mui/material";
import { Order, OrderStatus, Product, Size, User } from "@prisma/client";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const Order = () => {
  const router = useRouter();
  const orderId = router.query.id;

  const { orders, orderlines, users, sizes, products } =
    useAppSelector(orderAppDatas);

  const order = orders.find((item) => item.id === Number(orderId)) as Order;

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

  if (!order) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Order not found
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: "7rem", px: "2rem" }}>
      <Box sx={{ mb: "1rem" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Order {orderId}
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: "block", sm: "block", md: "flex" },
          flexWrap: "wrap",
        }}>
        {validOrderlines.map((orderline) => {
          return (
            <Card
              sx={{
                p: "1.3rem",
                my: "1rem",
                width: { xs: "90%", sm: "90%", md: "40%" },
                mx: { xs: "auto", sm: "auto", md: "1rem" },
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
                    {getProduct(orderline.productId).price} Ks
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
                    mt: "1.2rem",
                  }}>
                  <Typography sx={{ mr: "1rem", fontSize: "1.1rem" }}>
                    Status:
                  </Typography>
                  <Box>
                    {orderline.status === OrderStatus.PENDING && (
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
                    {orderline.status === OrderStatus.REJECTED && (
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
                    {orderline.status === OrderStatus.ACCEPTED && (
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
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>
      <Box
        sx={{
          width: "fit-content",
          mx: { xs: "auto", sm: "auto", md: "0" },
        }}>
        <Box sx={{ my: "2rem" }}>
          <Typography sx={{ mb: "0.8rem" }} variant="h5">
            Total Price
          </Typography>
          <Typography>{order.price} Ks</Typography>
        </Box>
        <Box sx={{ mb: "2rem" }}>
          <Typography sx={{ mb: "0.5rem", fontSize: "1.4rem" }}>
            Date
          </Typography>
          <Typography>{dayjs(order.createdAt).format("DD.MM.YYYY")}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
