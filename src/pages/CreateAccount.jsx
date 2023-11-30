import React, { useState } from "react";
import { createUser } from "../Util/ServerConnector.js";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  const validateForm = () => {
    const errors = [];

    // Add your validation checks here
    // For example:
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

    // Call the createUser function from ServerConnector.js
    createUser({
      username,
      password,
      name,
      dateOfBirth,
      weight,
      height,
      fitnessGoals,
    }).then((response) => {
      // added opening parenthesis before response
      if (response.status === 200) {
        // Redirect to the home page
        window.location.href = "/";
      } else {
        hasError(response.data);
      }
    });
  };

  return (
    <><div>
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
              <label>
                  Username:
                  <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} />
              </label>
              <br />
              <label>
                  Password:
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
              </label>
              <br />
              <label>
                  Name:
                  <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)} />
              </label>
              <br />
              <label>
                  Date of Birth:
                  <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)} />
              </label>
              <br />
              <label>
                  Weight:
                  <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)} />
              </label>
              <br />
              <label>
                  Height:
                  <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)} />
                  <label>
                      <br />
                      Fitness Goals:
                      <br />
                      <label>
                          <input
                              type="checkbox"
                              name="fitnessGoals"
                              value="Weightloss"
                              checked={fitnessGoals.includes("Weightloss")}
                              onChange={handleFitnessGoalChange} />
                          Weightloss
                      </label>
                      <br />
                      <label>
                          <input
                              type="checkbox"
                              name="fitnessGoals"
                              value="Muscle gain"
                              checked={fitnessGoals.includes("Muscle gain")}
                              onChange={handleFitnessGoalChange} />
                          Muscle gain
                      </label>
                      <br />
                      <label>
                          <input
                              type="checkbox"
                              name="fitnessGoals"
                              value="General health"
                              checked={fitnessGoals.includes("General health")}
                              onChange={handleFitnessGoalChange} />
                          General health
                      </label>
                      <br />
                      <label>
                          <input
                              type="checkbox"
                              name="fitnessGoals"
                              value="Sports"
                              checked={fitnessGoals.includes("Sports")}
                              onChange={handleFitnessGoalChange} />
                          Sports
                      </label>
                      <br />
                  </label>
              </label>
              <br />
              <button type="submit">Create Account</button>
          </form>
      </div><div>
              {validationErrors.map((error, index) => (
                  <p key={index} style={{ color: 'red' }}>
                      {error}
                  </p>
              ))}
          </div></>
  );
};

export default CreateAccount;
