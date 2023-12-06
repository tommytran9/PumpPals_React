import PostCard from "../components/PostCard";
import UserCard from "../components/UserCard";
import StatCard from "../components/StatCard";
import WorkoutCard from "../components/WorkoutCard";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  loginStillValid,
  getPostsByUsername,
  getUserByUsername,
  getWorkoutsByUsername,
} from "../Util/ServerConnector.js";

function User() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // Initialize user as null
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [foundUser, setFoundUser] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserByUsername(username);
      console.log(user);
      if (user === null) {
        setFoundUser(false);
      } else {
        setFoundUser(true);
      }
      setUser(user);

      const userPosts = await getPostsByUsername(username);
      setPosts(userPosts);

      setLoading(false);

      const userWorkouts = await getWorkoutsByUsername(username);
      setWorkouts(userWorkouts);
    };

    fetchData();
  }, [username]); // Remove user from the dependencies

  function renderWorkouts() {
    if (!workouts) {
      return <p></p>;
    }
    return workouts.map((workout) => <WorkoutCard workout={workout} />);
  }

  function renderPost() {
    if (!posts) {
      return <p></p>;
    }
    return posts.map((post) => <PostCard post={post} />);
  }

  function renderUser() {
    return user ? <UserCard userPost={user} /> : null; // Use user directly
  }

  function renderStats() {
    return user ? <StatCard stat={user} /> : null; // Use user directly
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!foundUser) {
    return (
      <div>
        <h1>User not found!</h1>
        <p>Make sure you've entered the right username!</p>
      </div>
    );
  }

  return (
    <div className="User">
      <div className="container">
        <div id="user-user-bar">
          <h2>User</h2>
          {renderUser()}
          <h2>Personal Statistics</h2>
          {renderStats()}
        </div>
        <div id="user-post-bar">
          <h2>Personal Posts</h2>
          {renderPost()}
        </div>
        <div id="user-workout-bar">
          <h2>Recent Workouts</h2>
          {renderWorkouts()}
        </div>
      </div>
    </div>
  );
}

export default User;
