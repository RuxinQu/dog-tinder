import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Auth from "../util/auth";
import { updateProfile, uploadImgs, getUser } from "../util/Api";
import { ProfileUpdateAlerts } from "../components/Profile/ProfileUpdateAlerts";
import { PetForm } from "../components/Profile/Petform";

export default function Profile({ myId }) {
  const authToken = Cookies.get("AuthToken");
  const loggedIn = Auth.loggedIn(authToken);
  const [formState, setFormState] = useState({});
  //formImage is the file that the input form stores
  // const [formImage, setFormImage] = useState([]);
  //petImage is the images already uploaded to the S3 bucket
  const [petImage, setPetImage] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [imageDeleteAlert, setImageDeleteAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      const user = await getUser(myId, authToken);
      if (!user.ok) return;
      const userJson = await user.json();
      setFormState(userJson);
      // display the pet images pulled from the db
      setPetImage(userJson.imgs);
    };
    getUserProfile();
  }, [myId, authToken, loggedIn]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  // const handleFormImageChange = (event) => {
  //   const selectedFiles = Array.from(event.target.files);
  //   setFormImage([...formImage, ...selectedFiles]);
  // };

  const handleSubmit = async () => {
    setButtonDisabled(true);
    const data = new FormData();
    // // append the images
    files.forEach((img) => {
      data.append("imgs", img);
    });

    try {
      // if (formImage.length) {
      const uploadImgResponse = await uploadImgs(data, authToken);
      const imageUrl = uploadImgResponse.imgs;
      formState.imgs.push(...imageUrl);
      console.log(formState);
      // }
      const response = await updateProfile(myId, formState, authToken);
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

  return loggedIn ? (
    <div>
      <PetForm
        myId={myId}
        formState={formState}
        petImage={petImage}
        setPetImage={setPetImage}
        handleInputChange={handleInputChange}
        // handleFormImageChange={handleFormImageChange}
        handleSubmit={handleSubmit}
        buttonDisabled={buttonDisabled}
        authToken={authToken}
        files={files}
        setFiles={setFiles}
      />
      <ProfileUpdateAlerts
        alertMessage={alertMessage}
        buttonDisabled={buttonDisabled}
        handleSubmit={handleSubmit}
      />
    </div>
  ) : (
    <p style={{ textAlign: "center", padding: 10 }}>You've logged out.</p>
  );
}
