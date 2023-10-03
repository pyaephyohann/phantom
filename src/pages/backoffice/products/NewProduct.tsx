import FileDropZone from "@/components/FileDropZone";
import ItemSelector from "@/components/ItemSelector";
import ItemsSelector from "@/components/ItemsSelector";
import WarningAlert from "@/components/WarningAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { config } from "@/config";
import { Category, Color, Gender, Size } from "@prisma/client";
import { addProduct } from "@/store/slices/productsSlice";
import { fetchProductsCategories } from "@/store/slices/productsCategoriesSlice";
import InformationAlert from "@/components/InformationAlert";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  callBack: () => void;
}

const NewProduct = ({ open, setOpen, callBack }: Props) => {
  const { categories, colors, sizes, genders } =
    useAppSelector(backofficeAppDatas);

  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  const [warningMessage, setWarningMessage] = useState("");

  const [openWarningAlert, setOpenWarningAlert] = useState(false);

  const [isFileUploading, setIsFileUploading] = useState(false);

  const [creating, setCreating] = useState(false);

  const [fileUploadMessage, setFileUploadMessage] = useState("");

  const dispatch = useAppDispatch();

  const mappedCategories = categories.map((item: Category) => ({
    id: item.id,
    name: item.name,
  }));

  const mappedSizes = sizes.map((item: Size) => ({
    id: item.id,
    name: item.name,
  }));

  const mappedColors = colors.map((item: Color) => ({
    id: item.id,
    name: item.name,
  }));

  const mappedGenders = genders.map((item: Gender) => ({
    id: item.id,
    name: item.name,
  }));

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    imageUrl: "",
    categoryIds: [] as number[],
    sizeId: 0,
    colorId: 0,
    genderId: 0,
  });

  const isDisabled =
    !newProduct.name ||
    !newProduct.price ||
    !newProduct.categoryIds.length ||
    !newProduct.sizeId ||
    !newProduct.colorId ||
    !newProduct.genderId ||
    isFileUploading;

  const onSelectFile = (acceptedFiles: File[]) => {
    if (selectedFile.length) {
      setWarningMessage("You can only choose one file");
      return setOpenWarningAlert(true);
    }

    const acceptedFileExtensions = ["jpg", "png", "svg", "jpeg", "jfif"];
    const selectedFileExtension = acceptedFiles[0].name.split(".")[1];

    if (!acceptedFileExtensions.includes(selectedFileExtension)) {
      setWarningMessage("Make sure your file is an image");
      return setOpenWarningAlert(true);
    }

    setSelectedFile(acceptedFiles);

    const name = `/products/${acceptedFiles[0].name}`;
    const storageRef = ref(storage, `products/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, acceptedFiles[0]);

    setFileUploadMessage("Your File is Uploading");
    setIsFileUploading(true);

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
          newProduct.imageUrl = url;
          setFileUploadMessage("File Uploaded");
          setIsFileUploading(false);
        });
      }
    );
  };

  const handleCreateNewProduct = async () => {
    setCreating(true);
    const response = await fetch(`${config.apiBaseUrl}/backoffice/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const createdProduct = await response.json();
    dispatch(addProduct(createdProduct));
    dispatch(fetchProductsCategories());
    callBack();
    setOpen(false);
    setSelectedFile([]);
    setNewProduct({
      name: "",
      price: 0,
      imageUrl: "",
      categoryIds: [] as number[],
      sizeId: 0,
      colorId: 0,
      genderId: 0,
    });
    setCreating(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ my: "0.5rem", textAlign: "center" }}>
        Create New Product
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          onChange={(event) =>
            setNewProduct({ ...newProduct, name: event.target.value })
          }
          label="Name"
          placeholder="Name"
        />
        <TextField
          onChange={(event) =>
            setNewProduct({ ...newProduct, price: Number(event.target.value) })
          }
          sx={{ my: "1.5rem" }}
          type="number"
          label="Price"
          placeholder="Price"
        />
        <Box>
          <ItemsSelector
            options={mappedCategories}
            onChange={(values) => {
              setNewProduct({
                ...newProduct,
                categoryIds: values.map((item) => item.id),
              });
            }}
            label="Categories"
          />
        </Box>
        <Box sx={{ my: "1.5rem" }}>
          <ItemSelector
            options={mappedSizes}
            label="Size"
            onChange={(value) =>
              setNewProduct({ ...newProduct, sizeId: value })
            }
          />
        </Box>
        <Box>
          <ItemSelector
            options={mappedColors}
            label="Color"
            onChange={(value) =>
              setNewProduct({ ...newProduct, colorId: value })
            }
          />
        </Box>
        <Box sx={{ my: "1.5rem" }}>
          <ItemSelector
            options={mappedGenders}
            label="Gender"
            onChange={(value) =>
              setNewProduct({ ...newProduct, genderId: value })
            }
          />
        </Box>
        <Box sx={{ mb: "1.5rem" }}>
          <FileDropZone onSelectFile={onSelectFile} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {selectedFile.length ? (
            <Chip
              label={selectedFile[0].name}
              onDelete={() => {
                newProduct.imageUrl = "";
                setSelectedFile([]);
              }}
            />
          ) : (
            ""
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: "1.5rem" }}>
        <Button
          disabled={isDisabled}
          onClick={handleCreateNewProduct}
          sx={{ mx: "auto" }}
          variant="contained">
          {creating ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography sx={{ mr: "0.8rem" }}>Creating</Typography>
              <CircularProgress sx={{ color: "#fff" }} size="2rem" />
            </Box>
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
      <WarningAlert
        open={openWarningAlert}
        setOpen={setOpenWarningAlert}
        message={warningMessage}
      />
      <InformationAlert
        open={isFileUploading}
        setOpen={setIsFileUploading}
        message={fileUploadMessage}
      />
    </Dialog>
  );
};

export default NewProduct;
