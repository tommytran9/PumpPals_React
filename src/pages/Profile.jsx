import PostCard from "../components/PostCard";
import UserCard from "../components/UserCard";
import StatCard from "../components/StatCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginStillValid,
  getPostsByUsername,
  getUserByUsername,
  getUsername,
} from "../Util/ServerConnector.js";

function Profile() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // Initialize user as null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const isValid = await loginStillValid();
      if (!isValid) {
        navigate("/login");
        return;
      }

      const response = await getUsername();
      const username = response.data;
      console.log(username);
      const user = await getUserByUsername(username);
      setUser(user);

      const userPosts = await getPostsByUsername(username);
      // Sort posts by creation date in descending order
      const sortedPosts = userPosts.sort(
        (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
      );
      setPosts(sortedPosts);

      setLoading(false);
    };

    fetchData();
  }, []);

function renderPost() {
  if (!posts) {
    return <p></p>;
  }
  return posts.map((post) => (
    <PostCard post={post} posts={posts} setPosts={setPosts} />
  ));
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

  return (
    <div className="Profile">
      <div className="container">
        <div id="profile-user-bar">
          <h2>Profile</h2>
          {renderUser()}
          <h2>Personal Statistics</h2>
          {renderStats()}
        </div>
        <div id="profile-post-bar">
          <h2>Personal Posts</h2>
          {renderPost()}
        </div>
      </div>
    </div>
  );
}

export default Profile;