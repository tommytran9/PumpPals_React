import UserCard from '../components/UserCard';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { loginStillValid, getAllPosts, getRecommendedUsers } from "../Util/ServerConnector.js"; // Import loginStillValid and getAllPosts

function Forum({  }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await loginStillValid();
      if (!isValid) {
        navigate("/login");
      }
    };

    const fetchPosts = async () => {
      const allPosts = await getAllPosts();
      console.log(allPosts);
      setPosts(allPosts);
    };

    const fetchUsers = async () => {
        const allUsers = await getRecommendedUsers();
        console.log(allUsers);
        setUsers(allUsers);
        };

    checkAuth();
    fetchUsers();
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  function renderPost() {
    return posts.map((post) => <PostCard post={post} />);
  }

  function renderUser() {
    return users.map((userPost) => <UserCard userPost={userPost} />);
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
      </div>
    </div>
  );
}

export default Forum;
