import { useState, useEffect } from "react";
import {
  getProfilePicture,
  likePost,
  unlikePost,
  getUsername,
  commentPost,
} from "../Util/ServerConnector.js";

function PostCard({ post }) {
  const {
    pfp,
    name,
    username,
    postId,
    uploadDate,
    content,
    likes,
    comments,
    commenters,
    likers,
  } = post;
  const [profilePicture, setProfilePicture] = useState(null);
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]); // Added line

  useEffect(() => {
    const newComments = comments.map((comment, i) => ({
      comment: comment,
      commenter: commenters[i],
    }));

    setAllComments(newComments);
  }, [comments, commenters]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const imageUrl = await getProfilePicture(username);
      setProfilePicture(imageUrl);
    };
    const fetchUsername = async () => {
      const response = await getUsername();
      const user = response.data;
      setUser(user);
    };

    fetchUsername();
    fetchProfilePicture();
  }, []);

  const formattedDate = new Date(uploadDate).toLocaleDateString();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    const newComment = {
      comment: comment,
      commenter: user,
    };
    commentPost(postId, newComment);
    setAllComments([...allComments, newComment]);
    setComment("");
  };

  return (
    <div id="PostCardDiv">
      <div className="post-bar">
        <img src={profilePicture} className="pfp" alt="Profile Picture" />
        <p>{name}</p>
        <p>{username}</p>
        <p>{formattedDate}</p>
      </div>
      <div className="msg">
        <p>{content}</p>
      </div>
      <div id="like">
        <LikeButton />
      </div>
      <div id="comment">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Enter your comment..."
        ></textarea>
        <button onClick={handleCommentSubmit}>Comment</button>
      </div>
      <div id="comments">
        {allComments.map((comment, index) => {
          let parsedComment;
          try {
            parsedComment = JSON.parse(comment.comment);
          } catch (e) {
            parsedComment = {
              comment: comment.comment,
              commenter: comment.commenter,
            };
          }
          return (
            <div key={index} className="comment-container">
              <div className="commenter">
                <p>
                  <strong>{parsedComment.commenter}</strong>
                </p>
              </div>
              <div className="comment">
                <p>{parsedComment.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  function LikeButton() {
    const [likes, setLikes] = useState(post.likes || 0);
    const likers = post.likers || [];
    const [activeBtn, setActiveBtn] = useState(
      likers.includes(user) ? "like" : "none"
    );

    const handleLikeClick = () => {
      if (activeBtn === "none") {
        likePost(postId);
        setLikes(likes + 1);
        setActiveBtn("like");
        return;
      } else if (activeBtn === "like") {
        unlikePost(postId);
        setLikes(likes - 1);
        setActiveBtn("none");
        return;
      }
    };

    return (
      <button
        className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
        onClick={handleLikeClick}
      >
        <img
          src={process.env.PUBLIC_URL + "/thumb_up.svg"}
          alt="Thumbs up sign"
        />{" "}
        {likes}
      </button>
    );
  }
}

export default PostCard;
