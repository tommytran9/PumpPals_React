import React from "react";
import { Link } from "react-router-dom";
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
        {
          <h3>
            <Link to={`/user/${username}`}>{name}</Link>
          </h3>
        }
        <div className="date">
          <h3>{date}</h3>
        </div>
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
                    <td>
                      <strong>{name}</strong>
                    </td>
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
