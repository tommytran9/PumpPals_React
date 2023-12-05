import { useEffect, useState } from "react";
import React from "react";


function StatCard({ stat }) {
  const { dateOfBirth, height, weight, fitnessGoals, gender } = stat;
  const [age, setAge] = useState(0);

  useEffect(() => {
    // Calculate age logic here
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    const diffInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
    );
    setAge(ageInYears);
  }, [dateOfBirth]);

  return (
    <div className="StatCard">
      <table>
        <tbody>
          <tr>
            <td style={{ textAlign: "left" }}><strong>Age:</strong></td>
            <td style={{ textAlign: "left" }}>{age}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}><strong>Gender:</strong></td>
            <td style={{ textAlign: "left" }}>{gender}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}><strong>Height:</strong></td>
            <td style={{ textAlign: "left" }}>{height}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}><strong>Weight:</strong></td>
            <td style={{ textAlign: "left" }}>{weight}</td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}><strong>Fitness Goals:</strong></td>
            <td style={{ textAlign: "left" }}>{fitnessGoals.join(", ")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StatCard;
