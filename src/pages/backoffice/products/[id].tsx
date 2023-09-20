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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useEffect, useState } from "react";
import FileDropZoneForProductUpdate from "@/components/FileDropZoneForProductUpdate";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { config } from "@/config";
import DeleteDialog from "@/components/DeleteDialog";
import { updateProduct } from "@/store/slices/productsSlice";
import { fetchProductsCategories } from "@/store/slices/productsCategoriesSlice";
import SuccessAlert from "@/components/SuccessAlert";
import InformationAlert from "@/components/InformationAlert";

const EditProducts = () => {
  const router = useRouter();
  const productId = router.query.id as string;

  const { products, categories, productsCategories, sizes, colors, genders } =
    useAppSelector(backofficeAppDatas);

  const dispatch = useAppDispatch();

  const product = products.find((item) => item.id === Number(productId));

  const [productToUpdate, setProductToUpdate] = useState<Product>();

  const [updatedProductImageUrl, setUpdatedProductImageUrl] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [deleteDialogMessage, setDeleteDialogMessage] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const [openInformationAlert, setOpenInformationAlert] = useState(false);

  const [informationMessage, setInformationMessage] = useState("");

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
      <Box sx={{ display: { xs: "block", sm: "block", md: "flex" } }}>
        {/* left side */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mx: { xs: "auto", sm: "auto", md: "0" },
          }}
        >
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
                  "Are you sure you want to remove this photo"
                );
                setOpenDeleteDialog(true);
              }}
              sx={{ bgcolor: "primary.main" }}
            >
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
            variant="contained"
          >
            {isUpdating ? <CircularProgress size="1.7rem" /> : "Save"}
          </Button>
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
    </Box>
  );
};

export default EditProducts;
