import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import IconButton from "@mui/material/IconButton";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export const ImageDropbox = ({ className, files, setFiles }) => {
  // const [files, setFiles] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      if (rejectedFiles?.length) {
        window.alert(rejectedFiles[0].errors[0].message);
      }
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [], //accept any kinds of images
    },
    maxSize: 1024 * 1000,
  });

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  return (
    <>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        <FileUploadOutlinedIcon />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {files.length !== 0 && <p style={{ marginTop: "50px" }}>Preview:</p>}
      {files.map((f) => (
        <div
          key={f.preview}
          style={{
            display: "inline-block",
            margin: 10,
            textAlign: "center",
            position: "relative",
          }}
        >
          <IconButton
            aria-label="delete"
            size="small"
            color="error"
            onClick={() => removeFile(f.name)}
            style={{
              display: "inline-block",
              position: "absolute",
              top: -17,
              right: -17,
            }}
          >
            <HighlightOffIcon />
          </IconButton>
          <img
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 5,
            }}
            src={f.preview}
            alt={f.name}
            //once uploaded, revoke the url to prevent url leaks
            onLoad={() => {
              URL.revokeObjectURL(f.preview);
            }}
          />
          <p style={{ fontSize: 14, color: "gray" }}>{f.name}</p>
        </div>
      ))}
    </>
  );
};
