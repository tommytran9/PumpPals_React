import React, { useState } from "react";
import { createPost, uploadPicturePost } from "../Util/ServerConnector";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (title.trim() === "" || content.trim() === "") {
      console.error("Title and content cannot be empty");
      return;
    }

    const post = {
      title,
      content,
    };

    try {
      let createdPost;
      if (picture) {
        const uploadResult = await uploadPicturePost(picture, post);
        if (uploadResult.success) {
          createdPost = uploadResult.response;
        } else {
          console.error("Failed to upload picture:", uploadResult.response);
          return;
        }
      } else {
        createdPost = await createPost(post);
      }

      console.log("Post created:", createdPost);
      navigate("/profile");
      // Handle success, e.g., redirect to post details page
    } catch (error) {
      console.error("Failed to create post:", error);
      // Handle error, e.g., show error message to the user
    }
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.files[0]);
    if (e.target.files[0]) {
      setImageURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-title"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea-content"
      ></textarea>
      {imageURL && <img src={imageURL} alt="Preview" className="upload-img" />}
      <label htmlFor="file-upload" className="upload-button">
        Upload Photo
        <input id="file-upload" type="file" onChange={handlePictureChange} />
      </label>
      <button onClick={handleCreatePost} className="create-button">
        Create
      </button>
    </div>
  );
}

export default CreatePost;
