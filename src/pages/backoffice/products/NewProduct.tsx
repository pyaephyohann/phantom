import FileDropZone from "@/components/FileDropZone";
import ItemSelector from "@/components/ItemSelector";
import ItemsSelector from "@/components/ItemsSelector";
import WarningAlert from "@/components/WarningAlert";
import { useAppSelector } from "@/store/hooks";
import { backofficeAppDatas } from "@/store/slices/backofficeSlice";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewProduct = ({ open, setOpen }: Props) => {
  const { categories, colors, sizes } = useAppSelector(backofficeAppDatas);

  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  const [warningMessage, setWarningMessage] = useState("");

  const [openWarningAlert, setOpenWarningAlert] = useState(false);

  const mappedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const mappedSizes = sizes.map((item) => ({ id: item.id, name: item.name }));

  const mappedColors = colors.map((item) => ({ id: item.id, name: item.name }));

  const onSelectFile = (acceptedFiles: File[]) => {
    if (selectedFile.length) {
      setWarningMessage("You can only choose one file");
      return setOpenWarningAlert(true);
    }

    const acceptedFileExtensions = ["jpg", "png", "svg", "jpeg"];
    const selectedFileExtension = acceptedFiles[0].name.split(".")[1];

    if (!acceptedFileExtensions.includes(selectedFileExtension)) {
      setWarningMessage("Make sure your file is an image");
      return setOpenWarningAlert(true);
    }

    setSelectedFile(acceptedFiles);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ my: "0.5rem", textAlign: "center" }}>
        Create New Product
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField label="Name" placeholder="Name" />
        <TextField
          sx={{ my: "1.5rem" }}
          type="number"
          label="Price"
          placeholder="Price"
        />
        <ItemsSelector
          options={mappedCategories}
          onChange={(values) => {
            console.log(values);
          }}
          label="Categories"
          placeholder="Categories"
        />
        <Box sx={{ my: "1.5rem" }}>
          <ItemSelector
            options={mappedSizes}
            label="Sizes"
            onChange={(value) => console.log(value)}
          />
        </Box>
        <Box>
          <ItemSelector
            options={mappedColors}
            label="Colors"
            onChange={(value) => console.log(value)}
          />
        </Box>
        <Box sx={{ my: "1.5rem" }}>
          <FileDropZone onSelectFile={onSelectFile} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {selectedFile.length ? (
            <Chip
              label={selectedFile[0].name}
              onDelete={() => {
                setSelectedFile([]);
              }}
            />
          ) : (
            ""
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: "1.5rem" }}>
        <Button sx={{ mx: "auto" }} variant="contained">
          Create
        </Button>
      </DialogActions>
      <WarningAlert
        open={openWarningAlert}
        setOpen={setOpenWarningAlert}
        message={warningMessage}
      />
    </Dialog>
  );
};

export default NewProduct;
