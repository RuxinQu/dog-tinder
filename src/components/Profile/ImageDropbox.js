import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const ImageDropbox = ({ className, files, setFiles }) => {
  // const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
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
  }, []);

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
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div>
        <ul>
          {files.map((f) => (
            <div key={f.preview}>
              <button onClick={() => removeFile(f.name)}>Remove</button>
              <img
                style={{ width: 100 }}
                src={f.preview}
                //once uploaded, revoke the url to prevent url leaks
                onLoad={() => {
                  URL.revokeObjectURL(f.preview);
                }}
              />
              <p>{f.name}</p>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
