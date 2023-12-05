import React, { useEffect, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import { getAllWorkouts, getAllPosts, getRecommendedUsers, loginStillValid } from "../Util/ServerConnector.js";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import UserCard from '../components/UserCard';

function Forum() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [workouts, setWorkouts] = useState([]); // Add workouts state

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await loginStillValid();
      if (!isValid) {
        navigate("/login");
      }
    };

    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    };

    const fetchUsers = async () => {
      const allUsers = await getRecommendedUsers();
      setUsers(allUsers);
    };

    const fetchWorkouts = async () => {
      const allWorkouts = await getAllWorkouts();
      setWorkouts(allWorkouts);
    };

    checkAuth();
    fetchPosts();
    fetchUsers();
    fetchWorkouts(); // Fetch workouts
  }, []);

  function renderPost() {
    return posts.map((post) => <PostCard post={post} />);
  }

  function renderUser() {
    return users.map((userPost) => <UserCard userPost={userPost} />);
  }

  function renderWorkout() {
    return workouts.map((workout) => <WorkoutCard key={workout.workoutId} workout={workout} />);
  }

  return (
    <div className="Forum">
      <h1>Forum</h1>
      <div className="container">
        <div id="forum-post-bar">
          <h2>Recent Posts</h2>
          <div className="post-card-gen">{renderPost()}</div>
        </div>
        <div id="forum-user-bar">
          <h2>Recommended Users</h2>
          <div className="user-card-gen">{renderUser()}</div>
        </div>
        <div id="forum-workout-bar">
          <h2>Recent Global Workouts</h2>
          <div className="workout-card-gen">{renderWorkout()}</div>
        </div>
      </div>
    </div>
  );
}

export default Forum;