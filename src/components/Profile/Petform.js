import React from "react";
import { deleteImg } from "../../util/Api";
import { DeleteConfirm } from "./DeleteConfirm";
import { ImageDropbox } from "./ImageDropbox";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const PetForm = ({
  setImageDeleteAlert,
  myId,
  formState,
  handleInputChange,
  setPetImage,
  handleFormImageChange,
  petImage,
  buttonDisabled,
  authToken,
  formImage,
  files,
  setFiles,
}) => {
  return (
    <div>
      <Typography variant="h3">Profile</Typography>
      <Grid container spacing={1} className="profile-form ">
        <Grid item xs={6}>
          <label>Email:</label>
        </Grid>
        <Grid item xs={6}>
          {formState.email}
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="name">Name: </label>
        </Grid>
        <Grid item xs={6}>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name || ""}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="breed">Breed: </label>
        </Grid>
        <Grid item xs={6}>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formState.breed || ""}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <label htmlFor="age">Age: </label>
        </Grid>
        <Grid item xs={6}>
          <input
            type="text"
            id="age"
            name="age"
            value={formState.age || ""}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <label htmlFor="size">Size: </label>
        </Grid>
        <Grid item xs={6}>
          <select
            id="size"
            name="size"
            value={formState.size}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="x-large">X-large</option>
          </select>
        </Grid>
        <Grid item xs={6}>
          <label>Gender: </label>
        </Grid>
        <Grid item xs={6}>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formState.gender === "female"}
              onChange={handleInputChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formState.gender === "male"}
              onChange={handleInputChange}
            />
            Male
          </label>
        </Grid>
        <Grid item xs={6}>
          <label htmlFor="description">Description:</label>
        </Grid>
        <Grid item xs={6}>
          <textarea
            id="description"
            name="description"
            required
            value={formState.description}
            onChange={handleInputChange}
          ></textarea>
        </Grid>

        <Grid item xs={12}>
          <p>Pet Images: </p>
          {petImage?.map((i) => {
            return (
              <div
                key={i.original}
                style={{
                  display: "inline-block",
                  width: 100,
                  margin: "0 10px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <img
                  src={i.original}
                  alt={formState.name}
                  style={{ width: "100%", borderRadius: 5 }}
                />
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const newImageState = petImage.filter(
                        (img) => img._id !== i._id
                      );
                      newImageState.unshift(i);
                      setPetImage(newImageState);
                      formState.imgs = newImageState;
                    }}
                  >
                    Move to Top
                  </button>
                </div>
                <DeleteConfirm
                  handleDeleteImg={async () => {
                    const newImageState = petImage.filter(
                      (img) => img._id !== i._id
                    );
                    setPetImage(newImageState);
                    const url = new URL(i.original);
                    await deleteImg(
                      url.pathname.slice(1),
                      myId,
                      i._id,
                      authToken
                    );
                    setImageDeleteAlert(true);
                  }}
                />
              </div>
            );
          })}
        </Grid>

        <Grid item xs={12}>
          <label>Upload Images</label>
        </Grid>
        <Grid item xs={12}>
          <ImageDropbox
            className="image-upload-dropbox"
            // formImage={formImage}
            formState={formState}
            files={files}
            setFiles={setFiles}
          />
        </Grid>
      </Grid>
    </div>
  );
};
