import { useState } from "react";

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
            <div id="following">
                <FollowButtonButton />
            </div>
        </div>
    )
    //Follow Button
    function FollowButton (){
        let [follow,Setfollow] = useState('follow');
        const [activeBtn, SetActiveBtn] = useState("none");

        const handleLikeClick = () => {
            if (activeBtn === "none") {
                Setfollow('following');
                SetActiveBtn("Following");
                return;
            }
    
            if (activeBtn === "following") {
                Setfollow('follow');
                setActiveBtn("none");
                return;
            }
        };

        return (
            <button className={`btn ${activeBtn === 'following' ? 'following-active' : ''}`} onClick={handleLikeClick}>
                {following}
            </button>
        );

    }
}

export default UserCard;
