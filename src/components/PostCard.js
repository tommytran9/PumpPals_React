import { useState } from 'react';

function PostCard({ post }) {
    const { pfp, author, date, message } = post;

    //Like button function
    function LikeButton () {
        const [likes, setLikes] = useState(0);
        const [activeBtn, setActiveBtn] = useState("none");

        const handleLikeClick = () => {
            if (activeBtn === "none") {
                setLikes(likes + 1);
                setActiveBtn("like");
                return;
            }
    
            if (activeBtn === "like") {
                setLikes(likes - 1);
                setActiveBtn("none");
                return;
            }
        };

        return (
            <button className={`btn ${activeBtn === 'like' ? 'like-active' : ''}`} onClick={handleLikeClick}>
                <img src="thumb_up.svg" alt="Thumbs up sign" />
                {likes}
            </button>
        );
        
    }

    return (
        <div id="PostCardDiv">
            <div className="post-bar">
                <img src={pfp} className="pfp" alt="Profile Picture" />
                <p>{author}</p>
                <p>{date}</p>
            </div>
            <div className="msg">
                <p>{message}</p>
            </div>
            <div id="like">
                <LikeButton />
            </div>
        </div>
    )
}

export default PostCard;
