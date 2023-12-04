import React, { useState } from "react";
import { createUser } from "../Util/ServerConnector.js";
import { useNavigate } from "react-router-dom";

const CreateAccount = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState([]);
  const [bio, setBio] = useState(""); // Added bio state
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();


  const validateForm = () => {
    const errors = [];

    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>\/\\]/;

    if (!username) {
      errors.push("Username is required.");
    } else if (specialCharsRegex.test(username)) {
      errors.push("Username cannot contain special characters.");
    }

    if (!password) {
      errors.push("Password is required.");
    } else if (specialCharsRegex.test(password)) {
      errors.push("Password cannot contain special characters.");
    }

    if (!name) {
      errors.push("Name is required.");
    } else if (specialCharsRegex.test(name)) {
      errors.push("Name cannot contain special characters.");
    }

    if (!dateOfBirth) {
      errors.push("Date of Birth is required.");
    }

    if (!gender) {
      errors.push("Gender is required.");
    }

    if (!weight) {
      errors.push("Weight is required.");
    }

    if (!height) {
      errors.push("Height is required.");
    }

    if (!fitnessGoals || fitnessGoals.length === 0) {
      errors.push("Fitness Goals is required.");
    }

    setValidationErrors(errors);
    return errors;
  };

  const hasError = (errorMessage) => {
    if (typeof errorMessage === "object") {
      errorMessage = JSON.stringify(errorMessage);
    }
    console.log(errorMessage);
    alert(errorMessage);
  };

  const handleFitnessGoalChange = (e) => {
    if (e.target.checked) {
      setFitnessGoals((oldGoals) => [...oldGoals, e.target.value]);
    } else {
      setFitnessGoals((oldGoals) =>
        oldGoals.filter((goal) => goal !== e.target.value)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      return;
    }

    // Convert weight and height to integers
    const weightInt = parseInt(weight, 10);
    const heightInt = parseInt(height, 10);

    // Call the createUser function from ServerConnector.js
    createUser(
      username,
      password,
      name,
      dateOfBirth,
      gender,
      weightInt,
      heightInt,
      fitnessGoals,
      bio
    ).then((response) => {
      // added opening parenthesis before response
      if (response.success) {
        setIsLoggedIn(true);
        // Redirect to the home page
        navigate("/profile");
      } else {
        hasError(response.response);
        console.log(response.response);
      }
    });
  };

  return (
    <>
      <div id='create-account-container' style={{ display: "flex", flexDirection: "column" }}>
        <h2 id='create-account-title'>Create Account</h2>
        <form onSubmit={handleSubmit} id='create-account-form'>
          <div className='form-section'>
            <div className='form-group'>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='form-input'
                />
              </label>
            </div>
            <br /> {/* Add spacing */}
            <div>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          <br /> {/* Add spacing */}
          <div>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <br /> {/* Add spacing */}
            <div>
              <label>
                Date of Birth:
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </label>
            </div>
            <br /> {/* Add spacing */}
            <div>
              <label>
                Gender:
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Male
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Female
                <input
                  type="radio"
                  value="Other"
                  checked={gender === "Other"}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Other
              </label>
            </div>
            <br /> {/* Add spacing */}
            <div>
              <label>
                Weight:
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </label>
            </div>
            <br /> {/* Add spacing */}
            <div>
              <label>
                Height:
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </label>
            </div>
            <br /> {/* Add spacing */}
            <div>
              <label>
                Bio: {/* Added bio input field */}
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </label>
            </div>
            <br /> {/* Add spacing */}
            <div>
              <label>
                Fitness Goals:
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="fitnessGoals"
                    value="Weightloss"
                    checked={fitnessGoals.includes("Weightloss")}
                    onChange={handleFitnessGoalChange}
                  />
                  Weightloss
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="fitnessGoals"
                    value="Muscle gain"
                    checked={fitnessGoals.includes("Muscle gain")}
                    onChange={handleFitnessGoalChange}
                  />
                  Muscle gain
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="fitnessGoals"
                    value="General health"
                    checked={fitnessGoals.includes("General health")}
                    onChange={handleFitnessGoalChange}
                  />
                  General health
                </label>
                <br />
                <label>
                  <input
                    type="checkbox"
                    name="fitnessGoals"
                    value="Sports"
                    checked={fitnessGoals.includes("Sports")}
                    onChange={handleFitnessGoalChange}
                  />
                  Sports
                </label>
                <br />
              </label>
            </div>
          </div>
          <br /> {/* Add spacing */}
          <button type="submit" id='create-account-button'>Create Account</button>
        </form>
      </div>
      <div id='validation-errors'>
        {validationErrors.map((error, index) => (
          <p key={index} style={{ color: "red" }} >
            {error}
          </p>
        ))}
      </div>
    </>
  );
};

export default CreateAccount;
