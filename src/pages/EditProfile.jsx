import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  uploadProfilePicture,
  getUsername,
  getUserByUsername,
  getProfilePicture,
  updateUser,
} from "../Util/ServerConnector.js";

const EditProfile = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
  const fetchProfilePicture = async () => {
    const response = await getUsername();
    const username = response.data;
    let imageUrl = await getProfilePicture(username);
    if (imageUrl === null) {
      imageUrl = process.env.PUBLIC_URL + "/account_icon.svg";
    }
    setProfilePicture(imageUrl);
  };

  const fetchData = async () => {
    const response = await getUsername();
    const username = response.data;
    const user = await getUserByUsername(username);
    setProfilePicture(user.profilePicture);
    setBio(user.bio);
    setName(user.name);
    setDateOfBirth(user.dateOfBirth);
    setGender(user.gender);
    setHeight(user.height);
    setWeight(user.weight);
    setFitnessGoals(user.fitnessGoals);
  };

  fetchProfilePicture();
  fetchData();
}, []);

const handleProfilePictureChange = async (e) => {
  const file = e.target.files[0]; // Get the selected file
  if (file) {
    // Create a blob URL and set it as the source for the image
    setProfilePicture(URL.createObjectURL(file));

    const result = await uploadProfilePicture(file); // Upload the file
    if (result.success) {
      console.log(result.response);
      const response = await getUsername();
      const username = response.data;
      let imageUrl = await getProfilePicture(username);
      if (imageUrl === null) {
        imageUrl = process.env.PUBLIC_URL + "/account_icon.svg";
      }
      setProfilePicture(imageUrl);
    } else {
      console.log(result.response);
      setErrorMessage(result.response); // Set the error message
    }
  }
};
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset the error message

    const result = await updateUser(
      name,
      dateOfBirth,
      gender,
      weight,
      height,
      fitnessGoals,
      bio
    );

    if (result.success) {
      navigate("/profile");
    } else {
      setErrorMessage(result.response);
    }
  };

  return (
    <div className="edit-profile-container">
      <aside className="profile">
        <img
          src={profilePicture || "default-profile.png"}
          alt="User"
          className="profile-picture"
        />
        <h2>{name || "Profile Name"}</h2>{" "}
        {/* Display the name, or a placeholder if not set */}
      </aside>
      <div className="edit-form">
        <h1>Edit Profile</h1>
        {errorMessage && (
          <p className="error-message">{errorMessage.message}</p>
        )}
        <form class="info" onSubmit={handleFormSubmit}>
          <div>
            <label>
              <strong>Upload Profile Picture</strong>
            </label>{" "}
            <br />
            <label>Only .png, .jpg, and .jpeg are supported</label>
            <label htmlFor="file-upload" className="upload-button">
              Upload Photo
              <input
                id="file-upload"
                type="file"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>Bio</strong>
            </label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div>
            <label>
              <strong>Name</strong>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>
              <strong>Date of Birth</strong>
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div>
            <label>
              <strong>Gender</strong>
            </label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label>
              <strong>Height</strong>
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <label>
              <strong>Weight</strong>
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label>
              <strong>
                <strong>Fitness Goals</strong>
              </strong>
            </label>
            <textarea
              value={fitnessGoals}
              onChange={(e) => setFitnessGoals(e.target.value)}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
