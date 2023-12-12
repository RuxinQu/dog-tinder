import React from "react";
import { DeleteConfirm } from "./DeleteConfirm";
import { ImageDropbox } from "./ImageDropbox";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export const PetForm = ({
  formState,
  handleInputChange,
  handleDeleteImg,
  files,
  setFiles,
  setCover,
}) => {
  return (
    <div>
      <Typography variant="h3">Profile</Typography>

      <Grid className="profile-form" container noValidate autoComplete="off">
        <div className="profile-row">
          <Grid item xs={6}>
            <label>Email: </label>
          </Grid>
          <TextField
            value={formState.email || ""}
            variant="standard"
            placeholder={formState.email}
          />
        </div>

        <div className="profile-row">
          <Grid item xs={6}>
            <label htmlFor="name">Name: </label>
          </Grid>
          <TextField
            id="name"
            name="name"
            value={formState.name || ""}
            onChange={handleInputChange}
            required
            variant="standard"
          />
        </div>

        <div className="profile-row">
          <Grid item xs={6}>
            <label htmlFor="breed">Breed: </label>
          </Grid>
          <TextField
            id="breed"
            name="breed"
            value={formState.breed || ""}
            onChange={handleInputChange}
            required
            variant="standard"
          />
        </div>

        <div className="profile-row">
          <Grid item xs={6}>
            <label htmlFor="age">Age: </label>
          </Grid>
          <TextField
            id="age"
            name="age"
            value={formState.age || ""}
            onChange={handleInputChange}
            required
            variant="standard"
          />
        </div>

        {/* size */}
        <div className="profile-row">
          <Grid item xs={6}>
            <label htmlFor="size">Size: </label>
          </Grid>
          <Select
            id="size"
            name="size"
            value={formState.size || ""}
            onChange={handleInputChange}
            required
            variant="standard"
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="large">Large</MenuItem>
            <MenuItem value="x-large">X-large</MenuItem>
          </Select>
        </div>

        {/* gender */}
        <div className="profile-row">
          <Grid item xs={6}>
            <label htmlFor="gender">Gender: </label>
          </Grid>
          <RadioGroup row name="gender">
            <FormControlLabel
              value="female"
              control={
                <Radio
                  value="female"
                  checked={formState.gender === "female"}
                  onChange={handleInputChange}
                  size="small"
                />
              }
              label="Female"
            />
            <FormControlLabel
              value="male"
              control={
                <Radio
                  value="male"
                  checked={formState.gender === "male"}
                  onChange={handleInputChange}
                  size="small"
                />
              }
              label="Male"
            />
          </RadioGroup>
        </div>

        {/* description */}

        <Grid item xs={12} sx={{ padding: "20px 0 10px 0" }}>
          <label htmlFor="description">Description:</label>
        </Grid>
        <TextField
          id="description"
          name="description"
          required
          value={formState.description}
          onChange={handleInputChange}
          multiline
          fullWidth
          rows={2}
        ></TextField>

        <Grid item xs={12}>
          <p style={{ marginTop: "50px" }}>Pet Images: </p>
          {formState.imgs?.map((i) => {
            return (
              <div
                key={i.original}
                style={{
                  display: "inline-block",
                  margin: 10,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <img
                  src={i.original}
                  alt={formState.name}
                  style={{
                    width: 150,
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 5,
                  }}
                />
                <div>
                  <Button
                    size="small"
                    sx={{ color: "black" }}
                    onClick={() => setCover(i)}
                  >
                    Cover
                  </Button>
                </div>
                <DeleteConfirm handleDeleteImg={handleDeleteImg} i={i} />
              </div>
            );
          })}
        </Grid>
        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <label>Upload Images</label>
        </Grid>
        <Grid item xs={12}>
          <ImageDropbox
            className="image-upload-dropbox"
            formState={formState}
            files={files}
            setFiles={setFiles}
          />
        </Grid>
      </Grid>
    </div>
  );
};
