import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Auth from "../util/auth";
import { updateProfile, uploadImgs, getUser, deleteImg } from "../util/Api";
import { ProfileUpdateAlerts } from "../components/Profile/ProfileUpdateAlerts";
import { PetForm } from "../components/Profile/Petform";

export default function Profile({ myId }) {
  // authtoken
  const authToken = Cookies.get("AuthToken");
  const loggedIn = Auth.loggedIn(authToken);

  // formState
  const [formState, setFormState] = useState({
    imgs: [],
    email: "",
    age: "",
    breed: "",
    gender: "",
    description: "",
    name: "",
    size: "",
  });
  const [files, setFiles] = useState([]); //the files in the drop box

  //petImage is the images already uploaded to the S3 bucket
  const [petImage, setPetImage] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // if user profile changes rerender the page
  useEffect(() => {
    const getUserProfile = async () => {
      const user = await getUser(myId, authToken);
      if (!user.ok) return;
      const userJson = await user.json();
      setFormState((prevFormState) => ({
        ...prevFormState,
        ...userJson,
      }));
    };
    getUserProfile();
  }, [myId, authToken, loggedIn]);

  // for the update alert
  const [open, setOpen] = useState(false);

  const handleClick = async () => {
    await handleSubmit();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // handle formInput change
  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setButtonDisabled(true);

    // append the images
    try {
      if (files.length) {
        const data = new FormData();
        files.forEach((img) => {
          data.append("imgs", img);
        });
        const uploadImgResponse = await uploadImgs(data, authToken);
        // the url array of all the uploaded images
        const uploadImgArr = uploadImgResponse.imgs;
        formState.imgs.push(...uploadImgArr);
      }
      const response = await updateProfile(myId, formState, authToken);
      const jsonResponse = await response.json();
      setFormState((prevFormState) => ({
        ...prevFormState,
        ...jsonResponse,
      }));
      if (response.ok) {
        setAlertMessage("Profile updated");
        setFiles([]);
        setButtonDisabled(false);
      }
    } catch (error) {
      setButtonDisabled(false);
      console.log(error);
    }
  };

  const handleDeleteImg = async (i) => {
    const newImageState = formState.imgs.filter((img) => img._id !== i._id);
    const url = new URL(i.original);
    try {
      const response = await deleteImg(
        url.pathname.slice(1),
        myId,
        i._id,
        authToken
      );

      if (response.ok) {
        setFormState((prevFormState) => ({
          ...prevFormState,
          imgs: newImageState,
        }));
        setAlertMessage("Image deleted successfully");
        setOpen(true);
      }
    } catch (err) {
      setAlertMessage("Failed to delete image");
    }
  };

  const setCover = async (i) => {
    // e.preventDefault();
    const newImageState = petImage.filter((img) => img._id !== i._id);
    newImageState.unshift(i);
    setFormState((prevFormState) => ({
      ...prevFormState,
      imgs: newImageState,
    }));
    handleSubmit();
  };

  return loggedIn ? (
    <div>
      <PetForm
        myId={myId}
        formState={formState}
        petImage={petImage}
        setPetImage={setPetImage}
        handleInputChange={handleInputChange}
        authToken={authToken}
        files={files}
        setFiles={setFiles}
        setAlertMessage={setAlertMessage}
        handleDeleteImg={handleDeleteImg}
        setCover={setCover}
      />
      <ProfileUpdateAlerts
        open={open}
        alertMessage={alertMessage}
        buttonDisabled={buttonDisabled}
        handleClick={handleClick}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  ) : (
    <p style={{ textAlign: "center", padding: 10 }}>You've logged out.</p>
  );
}
