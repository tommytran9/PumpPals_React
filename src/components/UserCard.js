import React, { useState, useEffect } from "react";
import { getUsername, getProfilePicture, followUser, unfollowUser, isFollowing } from "../Util/ServerConnector.js";

function UserCard({ userPost }) {
  const { name, username, bio, followers } = userPost;
  const [followed, setFollowed] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const imageUrl = await getProfilePicture(username);
      setProfilePicture(imageUrl);
    };

    const checkFollowStatus = async () => {
      setFollowed(await isFollowing(username));
    };

    const checkCurrentUser = async () => {
      const response = await getUsername();
      const user = response.data;
      if (user === username) {
        setIsCurrentUser(true);
      }
    };

    fetchProfilePicture();
    checkFollowStatus();
    checkCurrentUser();
  }, []);

  const handleFollow = async () => {
    if (followed) {
      // unfollow user
      unfollowUser(username);
      setFollowed(false);
    } else {
      // follow user
      followUser(username);
      setFollowed(true);
    }
  };

  return (
    <div id="UserCard">
      <div className="post-bar">
        <img src={profilePicture} className="pfp" alt="Profile Picture" />
        <p>{name}</p>
      </div>
      <div>
        <p>{bio}</p>
      </div>
      <div>
        {isCurrentUser ? (
          <a href="/edit-profile">
            <button>Edit Profile</button>
          </a>
        ) : (
          <button onClick={handleFollow}>{followed ? "following" : "follow"}</button>
        )}
      </div>
    </div>
  );
}

export default UserCard;
