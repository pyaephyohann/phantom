import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import ItemsSelector from "@/components/ItemsSelector";
import { getCategoriesByProductId } from "@/utils/client";
import { Color, Gender, Product, Size } from "@prisma/client";
import ItemSelector from "@/components/ItemSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useEffect, useState } from "react";
import FileDropZoneForProductUpdate from "@/components/FileDropZoneForProductUpdate";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { config } from "@/config";
import DeleteDialog from "@/components/DeleteDialog";
import { deleteProduct, updateProduct } from "@/store/slices/productsSlice";
import { fetchProductsCategories } from "@/store/slices/productsCategoriesSlice";
import SuccessAlert from "@/components/SuccessAlert";
import InformationAlert from "@/components/InformationAlert";
import DangerZone from "@/components/DangerZone";
import ProductDiscount from "@/components/ProductDiscount";
import Wave from "@/components/Wave";
import { addDeletedProduct } from "@/store/slices/deletedProductsSlice";
import WarningAlert from "@/components/WarningAlert";

const EditProducts = () => {
  const router = useRouter();
  const productId = router.query.id as string;

  const { products, categories, productsCategories, sizes, colors, genders } =
    useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const product = products.find(
    (item) => item.id === Number(productId)
  ) as Product;

  const [productToUpdate, setProductToUpdate] = useState<Product>();

  const [updatedProductImageUrl, setUpdatedProductImageUrl] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteDialogMessage, setDeleteDialogMessage] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [openInformationAlert, setOpenInformationAlert] = useState(false);

  const [informationMessage, setInformationMessage] = useState("");

  const [openWarningAlert, setOpenWarningAlert] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const onFileSelect = (acceptedFiles: File[]) => {
    const name = `/products/${acceptedFiles[0].name}`;
    const storageRef = ref(storage, `products/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, acceptedFiles[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUpdatedProductImageUrl(url);
          setInformationMessage("Careful - You have unsaved changes!");
          setOpenInformationAlert(true);
        });
      }
    );
  };

  const validCategories = getCategoriesByProductId(
    productId,
    categories,
    productsCategories
  );

  const mappedValidCategories = validCategories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const productSize = sizes.find((item) => item.id === product?.sizeId) as Size;

  const productColor = colors.find(
    (item) => item.id === product?.colorId
  ) as Color;

  const productGender = genders.find(
    (item) => item.id === product?.genderId
  ) as Gender;

  const [selectedCategoryIdsToUpdate, setSelectedCategoryIsToUpdate] = useState<
    number[]
  >([]);

  const isDisabled =
    !productToUpdate?.name ||
    !productToUpdate?.price ||
    !productToUpdate.sizeId ||
    !productToUpdate.colorId ||
    !productToUpdate.genderId;

  useEffect(() => {
    if (product) {
      setProductToUpdate(product);
    }
  }, [product]);

  const handleUpdateProduct = async () => {
    setIsUpdating(true);
    const response = await fetch(`${config.apiBaseUrl}/backoffice/products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productToUpdate,
        categoryIds: selectedCategoryIdsToUpdate,
        updatedImageUrl: updatedProductImageUrl,
      }),
    });
    const updatedProduct = await response.json();
    dispatch(updateProduct(updatedProduct));
    dispatch(fetchProductsCategories());
    setIsUpdating(false);
    setOpenSuccessAlert(true);
  };

  const handleDeleteProduct = async () => {
    await fetch(`${config.apiBaseUrl}/backoffice/products?id=${productId}`, {
      method: "DELETE",
    });
    dispatch(deleteProduct(product));
    dispatch(addDeletedProduct(product));
    dispatch(fetchProductsCategories());
    router.push("/backoffice/products");
  };

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
        }}>
        <ModeEditOutlineIcon
          color="primary"
          sx={{ fontSize: "1.5rem", mr: "0.5rem" }}
        />
        <Typography variant="h5">Edit Your Product</Typography>
      </Box>
      <Box sx={{ display: { xs: "block", sm: "block", md: "flex" } }}>
        {/* left side */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mx: { xs: "auto", sm: "auto", md: "0" },
          }}>
          <Image
            alt={product.name}
            src={
              updatedProductImageUrl
                ? updatedProductImageUrl
                : (product.imageUrl as string)
            }
            width={200}
            height={200}
            style={{ borderRadius: "0.5rem" }}
          />
          <Box sx={{ mt: "1rem", display: "flex" }}>
            <FileDropZoneForProductUpdate onSelectFile={onFileSelect} />
            <IconButton
              onClick={() => {
                setDeleteDialogMessage(
                  "Are you sure you want to remove this photo?"
                );
                setOpenDeleteDialog(true);
              }}
              sx={{ bgcolor: "primary.main" }}>
              <DeleteIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <TextField
            sx={{ my: "2rem", width: "20rem" }}
            label="Name"
            defaultValue={product.name}
            onChange={(event) =>
              productToUpdate &&
              setProductToUpdate({
                ...productToUpdate,
                name: event.target.value,
              })
            }
          />
          <TextField
            sx={{ width: "20rem" }}
            onChange={(event) =>
              productToUpdate &&
              setProductToUpdate({
                ...productToUpdate,
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
            mx: { xs: "auto", sm: "auto", md: "0" },
            mt: { xs: "2.5rem", sm: "2.5rem", md: "0" },
          }}>
          {/* Categories */}
          <ItemsSelector
            options={categories}
            defaultValue={mappedValidCategories}
            onChange={(values) => {
              if (values.length < 1) {
                return setOpenWarningAlert(true);
              }
              setSelectedCategoryIsToUpdate(values.map((item) => item.id));
            }}
            label="Categories"
          />
          {/* Size */}
          <Box sx={{ my: "2.5rem" }}>
            <ItemSelector
              options={sizes}
              defaultValue={productSize}
              label="Size"
              onChange={(value) => {
                productToUpdate &&
                  setProductToUpdate({ ...productToUpdate, sizeId: value });
              }}
            />
          </Box>
          {/* Color */}
          <ItemSelector
            options={colors}
            defaultValue={productColor}
            label="Color"
            onChange={(value) => {
              productToUpdate &&
                setProductToUpdate({ ...productToUpdate, colorId: value });
            }}
          />
          {/* Gender */}
          <Box sx={{ my: "2.5rem" }}>
            <ItemSelector
              options={genders}
              defaultValue={productGender}
              label="Gender"
              onChange={(value) => {
                productToUpdate &&
                  setProductToUpdate({ ...productToUpdate, genderId: value });
              }}
            />
          </Box>
          <Button
            onClick={handleUpdateProduct}
            disabled={isDisabled}
            variant="contained">
            {isUpdating ? <CircularProgress size="1.7rem" /> : "Save"}
          </Button>
        </Box>
      </Box>
      <Box>
        <Wave />
      </Box>
      <Box sx={{ width: "fit-content", my: "3rem", mx: "auto" }}>
        <ProductDiscount productId={Number(productId)} />
      </Box>
      <Box sx={{ my: "2rem" }}>
        <DangerZone
          id={Number(productId)}
          handleDelete={handleDeleteProduct}
          deleteDialogTitle="Are you sure you want to delete this product?"
        />
      </Box>
      <DeleteDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        title={deleteDialogMessage}
        callBack={() => {
          setInformationMessage("Careful - You have unsaved changes!");
          setOpenInformationAlert(true);
          setUpdatedProductImageUrl(
            "https://i.pinimg.com/236x/50/6e/dd/506eddb8f3d3e511c470f87d5880b6e3.jpg"
          );
        }}
      />
      <InformationAlert
        open={openInformationAlert}
        setOpen={setOpenInformationAlert}
        message={informationMessage}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="Updated Product Successfully"
      />
      <WarningAlert
        open={openWarningAlert}
        setOpen={setOpenWarningAlert}
        message="Product must have to connect with at least one category"
      />
    </Box>
  );
};

export default EditProducts;
