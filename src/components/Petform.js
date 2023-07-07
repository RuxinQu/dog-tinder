import { deleteImg } from "../util/Api";
import { ButtonDialog } from "./ButtonDialog";

export const PetForm = ({
  formState,
  handleInputChange,
  setPetImage,
  handleFormImageChange,
  petImage,
  disableButton,
  alertText,
  title,
  handleSubmit,
  handleEdit,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (title !== "edit") {
          handleSubmit();
        } else {
          handleEdit();
        }
      }}
      style={{ border: "1px solid black", padding: "1rem", margin: "1rem" }}
    >
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Type: </label>
        <label>
          <input
            type="radio"
            name="type"
            value="cat"
            checked={formState.type === "cat"}
            onChange={handleInputChange}
            required
          />
          Cat
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="dog"
            checked={formState.type === "dog"}
            onChange={handleInputChange}
          />
          Dog
        </label>
      </div>
      <div>
        <label htmlFor="breed">Breed: </label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={formState.breed}
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
          value={formState.age}
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
        <label htmlFor="activity">Activity Level: </label>
        <select
          id="activity"
          name="activity"
          value={formState.activity}
          onChange={handleInputChange}
          required
        >
          <option value="">-- Select --</option>
          <option value="low">Sedentary/Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
          <option value="athletic">Athletic</option>
        </select>
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
        <label htmlFor="images">
          Images: <small>(up to 10 images each time)</small>
        </label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleFormImageChange}
        />
      </div>
      {title === "edit" && (
        <div>
          <p>Pet Images: </p>
          {petImage?.map((i) => {
            return (
              <div
                key={i.url}
                style={{ display: "inline-block", margin: "0 10px" }}
              >
                <img src={i.url} alt={formState.name} width={"100"} />
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const newImageState = petImage.filter(
                        (img) => img._id !== i._id
                      );
                      newImageState.unshift(i);
                      setPetImage(newImageState);
                      formState.images = newImageState;
                      handleEdit();
                    }}
                  >
                    Move to Top
                  </button>
                  <ButtonDialog
                    handleDeleteImg={async () => {
                      const newImageState = petImage.filter(
                        (img) => img._id !== i._id
                      );
                      setPetImage(newImageState);
                      const url = new URL(i.url);
                      await deleteImg(
                        url.pathname.slice(1),
                        formState._id,
                        i._id
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ marginTop: "1rem" }}>
        <button disabled={disableButton}>
          {title === "edit" ? "Update" : "Submit"}
        </button>
      </div>
      <small style={{ color: "red", display: "block" }}>{alertText}</small>
    </form>
  );
};
