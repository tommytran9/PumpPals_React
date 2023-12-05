import React, { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import {
  getAllWorkouts,
  createWorkout,
  getUserWorkouts,
} from "../Util/ServerConnector";

const LogWorkout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    exercises: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const allWorkouts = await getUserWorkouts();
      setWorkouts(allWorkouts);
      // print out allWorkouts
      console.log(allWorkouts);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const handleCreateWorkout = async () => {
    try {
      // Check if any field is empty
      if (newWorkout.exercises.some(
          (exercise) =>
            exercise.name === "" ||
            exercise.weight === "" ||
            exercise.sets === "" ||
            exercise.reps === ""
        )
      ) {
        setErrorMessage("Please fill in all fields");
        return;
      }

      await createWorkout(newWorkout);
      fetchWorkouts();
      setNewWorkout({ name: "", exercises: [] });
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  const handleAddExercise = () => {
    setNewWorkout({
      ...newWorkout,
      exercises: [
        ...newWorkout.exercises,
        { name: "", weight: "", sets: "", reps: "" },
      ],
    });
  };

  const handleExerciseInputChange = (e, index) => {
    const { name, value } = e.target;
    const exercises = [...newWorkout.exercises];

    // Check if the name is 'weight', 'sets', or 'reps' and the value is not a number
    if (
      (name === "weight" || name === "sets" || name === "reps") &&
      isNaN(value)
    ) {
      setErrorMessage("Please enter a number");
    } else {
      setErrorMessage(""); // Clear the error message if the input is a number
      exercises[index][name] = value;
      setNewWorkout({ ...newWorkout, exercises });
    }
  };

  return (
    <div className="log-workout-container">
      <h1>Log Workout</h1>
      <form>
        <div className="exercise-list">
          {newWorkout.exercises.map((exercise, index) => (
            <div key={index} className="exercise-item">
              <div>
                <label>
                  Exercise Name:
                  <input
                    type="text"
                    name="name"
                    value={exercise.name}
                    onChange={(e) => handleExerciseInputChange(e, index)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Weight:
                  <input
                    type="text"
                    name="weight"
                    value={exercise.weight}
                    onChange={(e) => handleExerciseInputChange(e, index)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Sets:
                  <input
                    type="text"
                    name="sets"
                    value={exercise.sets}
                    onChange={(e) => handleExerciseInputChange(e, index)}
                  />
                </label>
              </div>
              <div>
                <label>
                  Reps:
                  <input
                    type="text"
                    name="reps"
                    value={exercise.reps}
                    onChange={(e) => handleExerciseInputChange(e, index)}
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
        {errorMessage && <p>{errorMessage}</p>} {/* Display error message */}
        <button type="button" onClick={handleAddExercise}>
          Add Exercise
        </button>
        <button type="button" onClick={handleCreateWorkout}>
          Log Workout
        </button>
      </form>{" "}
      <div className="workout-card">
        <h1>Recent Workouts:</h1>
        {workouts
          .toSorted((a, b) => new Date(b.date) - new Date(a.date))
          .map((workout) => (
            <WorkoutCard
              key={workout.workoutId}
              workout={workout}
              isLogging={true}
            />
          ))}
      </div>
    </div>
  );
};
export default LogWorkout;
