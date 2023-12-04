import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  uploadProfilePicture,
  getUsername,
  getUserByUsername,
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

    fetchData();
  }, []);

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const result = await uploadProfilePicture(file); // Upload the file
      if (result.success) {
        setProfilePicture(result.response); // Update the profile picture state variable
        console.log(result.response);
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Edit Profile</h1>
      {errorMessage && <p>{errorMessage.message}</p>} {/* Display the error message */}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Profile Picture:</label>
          <input type="file" onChange={handleProfilePictureChange} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label>Fitness Goals:</label>
          <textarea
            value={fitnessGoals}
            onChange={(e) => setFitnessGoals(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
