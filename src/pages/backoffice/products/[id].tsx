import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import ItemsSelector from "@/components/ItemsSelector";
import { getCategoriesByProductId } from "@/utils/client";
import { Color, Gender, Product, Size } from "@prisma/client";
import ItemSelector from "@/components/ItemSelector";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useEffect, useState } from "react";

const EditProducts = () => {
  const router = useRouter();
  const productId = router.query.id as string;

  const { products, categories, productsCategories, sizes, colors, genders } =
    useAppSelector(backofficeAppDatas);

  const product = products.find((item) => item.id === Number(productId));

  const validCategories = getCategoriesByProductId(
    productId,
    categories,
    productsCategories
  );

  const mappedValidCategories = validCategories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const validCategoryIds = validCategories.map((item) => item.id);

  const productSize = sizes.find((item) => item.id === product?.sizeId) as Size;

  const productColor = colors.find(
    (item) => item.id === product?.colorId
  ) as Color;

  const productGender = genders.find(
    (item) => item.id === product?.genderId
  ) as Gender;

  const [updatedProduct, setUpdatedProduct] = useState<Product>();

  const [selectedCategoryIdsToUpdate, setSelectedCategoryIsToUpdate] = useState<
    number[]
  >([]);

  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  if (!product)
    return (
      <Typography variant="h5" sx={{ mt: "2rem", textAlign: "center" }}>
        Oops! Your product does not exist
      </Typography>
    );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "1.8rem",
          mb: "2.5rem",
        }}
      >
        <ModeEditOutlineIcon sx={{ fontSize: "1.5rem", mr: "0.5rem" }} />
        <Typography variant="h5">Edit Your Product</Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        {/* left side */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            alt={product.name}
            src={product.imageUrl as string}
            width={200}
            height={200}
            style={{ borderRadius: "0.5rem" }}
          />
          <Box sx={{ mt: "1rem" }}>
            <IconButton sx={{ bgcolor: "primary.main", mr: "5rem" }}>
              <EditIcon sx={{ color: "#fff" }} />
            </IconButton>
            <IconButton sx={{ bgcolor: "primary.main" }}>
              <DeleteIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <TextField
            sx={{ my: "2rem" }}
            label="Name"
            defaultValue={product.name}
            onChange={(event) =>
              updatedProduct &&
              setUpdatedProduct({ ...updatedProduct, name: event.target.value })
            }
          />
          <TextField
            onChange={(event) =>
              updatedProduct &&
              setUpdatedProduct({
                ...updatedProduct,
                price: Number(event.target.value),
              })
            }
            type="number"
            label="Price"
            defaultValue={product.price}
          />
        </Box>
        {/* right side */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Categories */}
          <ItemsSelector
            options={categories}
            defaultValue={mappedValidCategories}
            onChange={(values) => {
              setSelectedCategoryIsToUpdate(values.map((item) => item.id));
            }}
            label="Categories"
            placeholder="Categories"
          />
          {/* Size */}
          <Box sx={{ my: "2.5rem" }}>
            <ItemSelector
              options={sizes}
              defaultValue={productSize}
              label="Size"
              onChange={(value) => {
                updatedProduct &&
                  setUpdatedProduct({ ...updatedProduct, sizeId: value });
              }}
            />
          </Box>
          {/* Color */}
          <ItemSelector
            options={colors}
            defaultValue={productColor}
            label="Color"
            onChange={(value) => {
              updatedProduct &&
                setUpdatedProduct({ ...updatedProduct, colorId: value });
            }}
          />
          {/* Gender */}
          <Box sx={{ my: "2.5rem" }}>
            <ItemSelector
              options={genders}
              defaultValue={productGender}
              label="Gender"
              onChange={(value) => {
                updatedProduct &&
                  setUpdatedProduct({ ...updatedProduct, genderId: value });
              }}
            />
          </Box>
          <Button variant="contained">Update</Button>
        </Box>
      </Box>
      <Box>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#FFA1F5"
            fill-opacity="1"
            d="M0,224L48,192C96,160,192,96,288,80C384,64,480,96,576,128C672,160,768,192,864,176C960,160,1056,96,1152,85.3C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </Box>
    </Box>
  );
};

export default EditProducts;
