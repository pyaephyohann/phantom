import { config } from "@/config";
import { Box, Button, Card, Chip, Typography } from "@mui/material";
import { Category, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { addProduct, setProducts } from "@/store/slices/productsSlice";
import SuccessAlert from "@/components/SuccessAlert";

interface Trashs {
  products: Product[];
  categories: Category[];
}

const TrashedProducts = () => {
  const [trashs, setTrashs] = useState<Trashs>();

  const dispatch = useAppDispatch();

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const fetchBackofficeTrash = async () => {
    const response = await fetch(`${config.apiBaseUrl}/backoffice/trash`);
    const responseJson = await response.json();
    setTrashs(responseJson);
  };

  const handleUndoTrashedProducts = async (productId: number) => {
    const response = await fetch(
      `${config.apiBaseUrl}/backoffice/trash/products?id=${productId}`,
      {
        method: "PUT",
      }
    );
    const undidProduct = await response.json();
    dispatch(addProduct(undidProduct));
    setOpenSuccessAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    fetchBackofficeTrash();
  }, []);

  return (
    <Box>
      {trashs?.products.length ? (
        <Typography sx={{ my: "1rem" }} variant="h5">
          Deleted Products
        </Typography>
      ) : (
        <Typography sx={{ textAlign: "center", mt: "2rem" }} variant="h5">
          You dont have any deleted products
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-start",
          },
        }}
      >
        {trashs &&
          trashs.products.map((product) => {
            return (
              <Box sx={{ m: "1rem" }} key={product.id}>
                <Card
                  sx={{
                    py: "1rem",
                    px: "1.5rem",
                    borderRadius: "0.5rem",
                    position: "relative",
                  }}
                >
                  {product.discountPrice ? (
                    <Chip
                      sx={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        color: "white",
                      }}
                      label="Discount"
                      color="secondary"
                    />
                  ) : (
                    ""
                  )}
                  <Image
                    style={{ borderRadius: "0.5rem", marginBottom: "0.5rem" }}
                    alt={product.name as string}
                    src={product.imageUrl as string}
                    width={180}
                    height={180}
                  />
                  <Box sx={{ pl: "0.2rem" }}>
                    <Typography sx={{ my: "0.7rem" }}>
                      {product.name}
                    </Typography>
                    <Box sx={{ mb: "0.5rem" }}>
                      {product.discountPrice ? (
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              textDecoration: "line-through",
                              mr: "0.5rem",
                            }}
                          >
                            {product.price} Ks
                          </Typography>
                          <Typography>{product.discountPrice} Ks</Typography>
                        </Box>
                      ) : (
                        <Typography>{product.price} Ks</Typography>
                      )}
                    </Box>
                    <Box>
                      {product.genderId === 4 && (
                        <Typography>For Male</Typography>
                      )}
                      {product.genderId === 5 && (
                        <Typography>For Female</Typography>
                      )}
                      {product.genderId === 6 && (
                        <Typography>Non-binary</Typography>
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: "1rem",
                    }}
                  >
                    <Button
                      onClick={() => handleUndoTrashedProducts(product.id)}
                      variant="contained"
                    >
                      Undo
                    </Button>
                  </Box>
                </Card>
              </Box>
            );
          })}
      </Box>
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="Undid successfully"
      />
    </Box>
  );
};

export default TrashedProducts;
