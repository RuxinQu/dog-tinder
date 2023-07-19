import React, { useState, useEffect } from "react";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { updateProfile, uploadImgs, getUser } from "../util/Api";
import { PetForm } from "../components/Petform";
const petUploadHelper = [
  "name",
  "breed",
  "age",
  "size",
  "gender",
  "description",
];

export default function Profile({ myId }) {
  const navigate = useNavigate();
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
  }, []);
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
    // try {
    if (formImage.length) {
      const uploadImgResponse = await uploadImgs(data);
      console.log(uploadImgResponse);
      const imageUrl = uploadImgResponse.imgs;
      formState.imgs.push(...imageUrl);
    }
    console.log(formState);
    const response = await updateProfile(myId, formState);
    console.log(response);
    //   if (response.ok) {
    //     setAlertText("pet updated");
    //     setDisableButton(false);
    //     setFormImage([]);
    //     setTimeout(() => {
    //       setAlertText("");
    //     }, 2000);
    //   }
    // } catch (error) {
    //   setAlertText("failed to add the pet");
    //   console.log(error);
    // }
  };

  return (
    <PetForm
      formState={formState}
      petImage={petImage}
      handleInputChange={handleInputChange}
      handleFormImageChange={handleFormImageChange}
      handleSubmit={handleSubmit}
    />
  );
}
