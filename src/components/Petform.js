import React from "react";
import { deleteImg } from "../util/Api";
import { ButtonDialog } from "./ButtonDialog";
import Button from "@mui/material/Button";

export const PetForm = ({
  myId,
  formState,
  handleInputChange,
  setPetImage,
  handleFormImageChange,
  petImage,
  disableButton,
  alertText,
  handleSubmit,
  authToken,
}) => {
  return (
    <div className="profile-form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="profile-form"
      >
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="breed">Breed: </label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formState.breed || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input
            type="text"
            id="age"
            name="age"
            value={formState.age || ""}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="size">Size: </label>
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
        </div>
        <div>
          <label>Gender: </label>
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
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            required
            value={formState.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="imgs">
            Upload Images: <small>(up to 10 images each time)</small>
          </label>
          <input
            type="file"
            name="imgs"
            multiple
            onChange={handleFormImageChange}
          />
        </div>
        <div>
          <p>Pet Images: </p>
          {petImage?.map((i) => {
            return (
              <div
                key={i.original}
                style={{
                  display: "inline-block",
                  margin: "0 10px",
                  position: "relative",
                }}
              >
                <img src={i.original} alt={formState.name} width={"100"} />
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      const newImageState = petImage.filter(
                        (img) => img._id !== i._id
                      );
                      newImageState.unshift(i);
                      setPetImage(newImageState);
                      formState.imgs = newImageState;
                      handleSubmit();
                    }}
                  >
                    Move to Top
                  </Button>
                  <ButtonDialog
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
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "1rem" }}>
          <Button type="submit" variant="contained" disabled={disableButton}>
            Update
          </Button>
        </div>
        <small style={{ color: "red", display: "block" }}>{alertText}</small>
      </form>
    </div>
  );
};
