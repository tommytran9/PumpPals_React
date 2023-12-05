import { useState, useEffect } from "react";
import {
  getProfilePicture,
  likePost,
  unlikePost,
  getUsername,
  commentPost,
  getPostPicture, // Added line
} from "../Util/ServerConnector.js";
import { Link, useNavigate } from "react-router-dom";

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
    hasPicture,
  } = post;
  const [profilePicture, setProfilePicture] = useState(null);
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const newComments = comments.map((comment, i) => ({
      comment: comment,
      commenter: commenters[i],
    }));

    setAllComments(newComments);
  }, [comments, commenters]);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      let imageUrl = await getProfilePicture(username);
      if (imageUrl === null) {
        imageUrl = process.env.PUBLIC_URL + "/account_icon.svg";
      }
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

  const [postPicture, setPostPicture] = useState(null);

  useEffect(() => {
    const fetchPostPicture = async () => {
      if (hasPicture) {
        try {
          const pictureUrl = await getPostPicture(postId);
          setPostPicture(pictureUrl); // Set the post picture
        } catch (error) {
          console.error("Failed to retrieve post picture:", error);
        }
      }
    };

    fetchPostPicture();
  }, [hasPicture, postId]);

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
        <p>
          <Link to={`/user/${username}`}>{username}</Link>
        </p>
        <p>{formattedDate}</p>
      </div>
      {hasPicture && (
        <div
          className="post-picture"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            src={postPicture}
            alt="Post Picture"
            className="post-picture-img"
            style={{ maxWidth: "100%", maxHeight: "750px" }}
          />
        </div>
      )}
      <div className="post-content">
        <p>{content}</p>
      </div>
      <div className="comment-container">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Enter your comment..."
          className="comment-box"
        ></textarea>
        <div className="button-container">
          <div id="like">
            <LikeButton />
          </div>
          <div id="comment">
            <button className="comment-button" onClick={handleCommentSubmit}>
              Comment
            </button>
          </div>
        </div>
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
                  <strong>
                    <Link
                      to={`/user/${parsedComment.commenter}`}
                      key={parsedComment.commenter}
                    >
                      {parsedComment.commenter}
                    </Link>
                  </strong>
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
