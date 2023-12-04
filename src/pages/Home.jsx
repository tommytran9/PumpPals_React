import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { loginStillValid, getAllPosts } from "../Util/ServerConnector.js"; // Import loginStillValid and getAllPosts

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

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

    checkAuth();
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  function renderPosts() {
    if (!posts) {
      return <p>Loading...</p>;
    }
    return posts.map((post) => <PostCard post={post} />);
  }

  return (
    <div className="Home">
      <h1>Dashboard</h1>
      <div className="post-card-gen">{renderPosts()}</div>
    </div>
  );
}

export default Home;
