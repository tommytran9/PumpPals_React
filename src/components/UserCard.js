function UserCard({ userPost }) {
    const { pfp, author, bio, followed } = userPost;

    return (
        <div id="UserCard">
            <div className="post-bar">
                <img src={pfp} className="pfp" alt="Profile Picture" />
                <p>{author}</p>
            </div>
            <div>
                <p>{bio}</p>
            </div>
            <div>
                <button>{followed ? "following" : "follow"}</button>
            </div>
        </div>
    )
}

export default UserCard;
