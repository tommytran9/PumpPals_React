import React from "react";
import { useEffect, useState } from "react";
import { getUserByUsername, getUsername } from "../Util/ServerConnector";

const WorkoutCard = ({ workout, isLogging }) => {
  const { workoutId, date, username, exercises } = workout;
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserByUsername(username);
      setName(response.name);
    };

    fetchUser();
  }, []);

  return (
    <div id="WorkoutCardDiv">
    <div className="workout-card">
      {!isLogging && <h3><a href={`/user/${username}`}>{name}</a></h3>}
      <h3>{date}</h3>
      <table className="workout-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
        </thead>
        <tbody>
          {exercises &&
            exercises.map((exercise, index) => {
              const { name, weight, sets, reps } = exercise;
              return (
                <tr key={index}>
                  <td><strong>{name}</strong></td>
                  <td>{weight}</td>
                  <td>{sets}</td>
                  <td>{reps}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default WorkoutCard;
