import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onSelectFile: (value: File[]) => void;
}

const FileDropZone = ({ onSelectFile }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onSelectFile(acceptedFiles);
    },
    [onSelectFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      style={{
        padding: "0.8rem",
        border: "1px dashed grey",
        borderRadius: "0.5rem",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography sx={{ textAlign: "center" }}>Drop here</Typography>
      ) : (
        <Typography sx={{ textAlign: "center" }}>
          Drag and drop your file or click to select
        </Typography>
      )}
    </div>
  );
};

export default FileDropZone;
