import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface Props {
  onSelectFile: (value: File[]) => void;
}

const FileDropZoneForProductUpdate = ({ onSelectFile }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onSelectFile(acceptedFiles);
    },
    [onSelectFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <IconButton sx={{ bgcolor: "primary.main", mr: "5rem" }}>
          <EditIcon sx={{ color: "#fff" }} />
        </IconButton>
      ) : (
        <IconButton sx={{ bgcolor: "primary.main", mr: "5rem" }}>
          <EditIcon sx={{ color: "#fff" }} />
        </IconButton>
      )}
    </div>
  );
};

export default FileDropZoneForProductUpdate;
