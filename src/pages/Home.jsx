import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import WorkoutCard from "../components/WorkoutCard"; // Import WorkoutCard component
import {
  loginStillValid,
  getAllPosts,
  getFollowingPosts,
  getFollowingWorkouts,
} from "../Util/ServerConnector.js"; // Import loginStillValid, getAllPosts, and getFollowingWorkouts

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [workouts, setWorkouts] = useState([]); // Add workouts state

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await loginStillValid();
      if (!isValid) {
        navigate("/login");
      }
    };

    const fetchPosts = async () => {
      const allPosts = await getFollowingPosts();
      console.log(allPosts);
      setPosts(allPosts);
    };

    const fetchWorkouts = async () => {
      const followingWorkouts = await getFollowingWorkouts();
      console.log(followingWorkouts);
      setWorkouts(followingWorkouts);
    };

    checkAuth();
    fetchPosts();
    fetchWorkouts();
  }, []); // Empty dependency array means this effect runs once on mount

  function renderPosts() {
    if (!posts) {
      return <p>Loading...</p>;
    }
    return posts.map((post) => <PostCard post={post} />);
  }

  function renderWorkouts() {
    if (workouts.length === 0) {
      return <p>Loading...</p>;
    }
    return workouts.map((workout) => <WorkoutCard workout={workout} />);
  }

  return (
    <div className="Home">
      <h1>Dashboard</h1>
      <h2>Home Feed</h2>
      <div className="homepage">
        <div className="homepage-section">
          <h2>Posts</h2>
          <div className="post-card-gen">{renderPosts()}</div>{" "}
        </div>
        <div className="homepage-section">
          <h2>Workouts</h2>
          <div className="workout-card-gen">{renderWorkouts()}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
