import React from "react";
import { deleteImg } from "../util/Api";
import { DeleteConfirm } from "./DeleteConfirm";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const PetForm = ({
  myId,
  formState,
  handleInputChange,
  setPetImage,
  handleFormImageChange,
  petImage,
  buttonDisabled,
  authToken,
  alertMessage,
}) => {
  return (
    <div>
      <Typography variant="h3">Profile</Typography>
      <Grid container className="profile-form">
        <Grid item xs={4}>
          <span>Email: </span>
        </Grid>
        <Grid item xs={8}>
          {formState.email}
        </Grid>
        <Grid item xs={4}>
          <label htmlFor="name">Name: </label>
        </Grid>
        <Grid item xs={8}>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name || ""}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <label htmlFor="breed">Breed: </label>
        </Grid>
        <Grid item xs={8}>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formState.breed || ""}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={4}>
          <label htmlFor="age">Age: </label>
        </Grid>
        <Grid item xs={8}>
          <input
            type="text"
            id="age"
            name="age"
            value={formState.age || ""}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={4}>
          <label htmlFor="size">Size: </label>
        </Grid>
        <Grid item xs={8}>
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
        <Grid item xs={4}>
          <label>Gender: </label>
        </Grid>
        <Grid item xs={8}>
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
        <Grid item xs={4}>
          <label htmlFor="description">Description:</label>
        </Grid>
        <Grid item xs={8}>
          <textarea
            id="description"
            name="description"
            required
            value={formState.description}
            onChange={handleInputChange}
          ></textarea>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="imgs">
            Upload Images: <small>(up to 10 images each time)</small>
          </label>
        </Grid>
        <Grid item xs={12}>
          <input
            type="file"
            name="imgs"
            multiple
            onChange={handleFormImageChange}
          />
        </Grid>
        <div>
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
                }}
              >
                <img
                  src={i.original}
                  alt={formState.name}
                  style={{ width: "100%" }}
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
                  }}
                />
              </div>
            );
          })}
        </div>
      </Grid>
    </div>
  );
};
