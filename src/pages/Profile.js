import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPets, editPet, uploadImgs } from "../util/Api";
import { PetForm } from "../components/Petform";
const petUploadHelper = [
  "name",
  "type",
  "breed",
  "age",
  "size",
  "gender",
  "activity",
  "description",
];
const addInitFormStateText = petUploadHelper.reduce(
  (acc, curr) => ({ ...acc, [curr]: "" }),
  {}
);
const addInitFormState = { ...addInitFormStateText, images: [] };
export default function Profile({ initFormState, title }) {
  const navigate = useNavigate();

  const [formState, setFormState] = useState(addInitFormState);
  // for the multer upload form, this property will be appended to formstate
  const [formImage, setFormImage] = useState([]);
  // for displaying the pets images retrieved from the db
  const [petImage, setPetImage] = useState(addInitFormState.images);
  const [alertText, setAlertText] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFormImage([...formImage, ...selectedFiles]);
  };

  const handleSubmit = async () => {
    setDisableButton(true);
    // create new FormData
    const data = new FormData();
    // append the images
    formImage.forEach((image) => {
      data.append("images", image);
    });
    try {
      const uploadImgResponse = await uploadImgs(data);
      formState.images = uploadImgResponse.images;
      const addPetsResponse = await addPets(formState);
      if (addPetsResponse.ok) {
        setAlertText("new pet added");
        setDisableButton(false);
        setTimeout(() => {
          setAlertText("");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setAlertText("failed to add the pet");
      console.log(error);
    }
  };

  const handleEdit = async () => {
    setDisableButton(true);
    const data = new FormData();
    // append the images
    formImage.forEach((image) => {
      data.append("images", image);
    });
    try {
      if (formImage.length) {
        const uploadImgResponse = await uploadImgs(data);
        const imageUrl = uploadImgResponse.images;
        formState.images.push(...imageUrl);
      }
      const response = await editPet(formState._id, formState);
      if (response.ok) {
        setAlertText("pet updated");
        setDisableButton(false);
        setFormImage([]);
        setTimeout(() => {
          setAlertText("");
        }, 2000);
      }
    } catch (error) {
      setAlertText("failed to add the pet");
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
      <PetForm
        formState={formState}
        handleInputChange={handleInputChange}
        handleFormImageChange={handleFormImageChange}
        petImage={petImage}
        setPetImage={setPetImage}
        disableButton={disableButton}
        alertText={alertText}
        title={title}
        handleSubmit={handleSubmit}
        handleEdit={handleEdit}
      />
    </>
  );
}
