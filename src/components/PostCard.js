function PostCard({ post }) {
    const { pfp, author, date, message, liked } = post;

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
                <button>{liked ? "yes" : "no"}</button>
            </div>
        </div>
    )
}

export default PostCard;
