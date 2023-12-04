import { useEffect, useState } from "react";

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
      <ul>
        <li>Age: {age}</li>
        <li>Gender: {gender}</li>
        <li>Height: {height}</li>
        <li>Weight: {weight}</li>
        <li>Fitness Goals: {fitnessGoals}</li>
      </ul>
    </div>
  );
}

export default StatCard;
