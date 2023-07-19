import React, { useState, useEffect } from "react";
import { updateProfile, uploadImgs, getUser } from "../util/Api";
import { PetForm } from "../components/Petform";

export default function Profile({ myId }) {
  const [formState, setFormState] = useState({});
  const [formImage, setFormImage] = useState([]);
  const [petImage, setPetImage] = useState([]);
  const [alertText, setAlertText] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  useEffect(() => {
    const getUserProfile = async () => {
      const user = await getUser(myId);
      const userJson = await user.json();
      setFormState(userJson);
      setPetImage(userJson.imgs);
    };
    getUserProfile();
  }, [myId]);
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
    const data = new FormData();
    // append the images
    formImage.forEach((img) => {
      data.append("imgs", img);
    });
    try {
      if (formImage.length) {
        const uploadImgResponse = await uploadImgs(data);
        console.log(uploadImgResponse);
        const imageUrl = uploadImgResponse.imgs;
        formState.imgs.push(...imageUrl);
      }
      const response = await updateProfile(myId, formState);
      if (response.ok) {
        setAlertText("Profile updated");
        setDisableButton(false);
        setTimeout(() => {
          setAlertText("");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setAlertText("failed to update the profile");
      console.log(error);
    }
  };

  return (
    <PetForm
      myId={myId}
      formState={formState}
      petImage={petImage}
      setPetImage={setPetImage}
      handleInputChange={handleInputChange}
      handleFormImageChange={handleFormImageChange}
      handleSubmit={handleSubmit}
      alertText={alertText}
      disableButton={disableButton}
    />
  );
}
