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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // render the page with initial information, if user profile changes rerender the page
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

  // for the alert after click the update button
  const [status, setStatus] = useState("success");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleUpdateAlert = (s, m) => {
    setStatus(s);
    setAlertMessage(m);
    setOpen(true);
  };

  // handle formInput change
  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateProfile = async (newProfile) => {
    const response = await updateProfile(myId, newProfile, authToken);
    if (response.ok) {
      // can't be this because user might also change the text input
      // setFormState((prevFormState) => ({
      //   ...prevFormState,
      //   imgs: [...prevFormState.imgs, ...uploadImgArr],
      // }));
      const jsonResponse = await response.json();
      setFormState((prevFormState) => ({
        ...prevFormState,
        ...jsonResponse,
      }));

      setOpen(true);
      setAlertMessage("Profile updated");
      setFiles([]);
      setButtonDisabled(false);
    }
  };

  const handleSubmit = async () => {
    setButtonDisabled(true);
    let uploadImgArr = [];
    try {
      // if there are files waiting to be uploaded, append the images
      if (files.length) {
        const data = new FormData();
        files.forEach((img) => {
          data.append("imgs", img);
        });
        const uploadImgResponse = await uploadImgs(data, authToken);
        // the url array of all the uploaded images
        uploadImgArr.push(...uploadImgResponse.imgs);
      }
      // instead of using the formState, create a new object for update profile
      const newProfile = {
        ...formState,
        imgs: [...formState.imgs, ...uploadImgArr],
      };
      handleUpdateProfile(newProfile);
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
        handleUpdateAlert("success", "Image deleted successfully");
      } else {
        handleUpdateAlert("error", "Failed to delete image");
      }
    } catch (err) {
      handleUpdateAlert("error", "Failed to delete image");
    }
  };

  const setCover = async (i) => {
    // e.preventDefault();
    const newImageState = formState.imgs.filter((img) => img._id !== i._id);
    newImageState.unshift(i);
    console.log(newImageState);
    const newProfile = {
      ...formState,
      imgs: [...newImageState],
    };
    handleUpdateProfile(newProfile);
  };

  return loggedIn ? (
    <div>
      <PetForm
        formState={formState}
        handleInputChange={handleInputChange}
        files={files}
        setFiles={setFiles}
        handleDeleteImg={handleDeleteImg}
        setCover={setCover}
      />
      <ProfileUpdateAlerts
        open={open}
        status={status}
        alertMessage={alertMessage}
        buttonDisabled={buttonDisabled}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  ) : (
    <p style={{ textAlign: "center", padding: 10 }}>You've logged out.</p>
  );
}
