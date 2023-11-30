import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';
import StatCard from '../components/StatCard';

function Profile({ posts, users, stats }) {
    function renderPost() {
        return (
            posts.map(post => <PostCard post={post} />)
        )
    }

    function renderUser() {
        return (
            users.map(userPost => <UserCard userPost={userPost} />)
        )
    }

    function renderStats() {
        return (
            stats.map(stat => <StatCard stat={stat} />)
        )
    }

    return (
        <div className="Profile">
            <div className="container">
                <div id="profile-user-bar">
                    <h2>Profile</h2>
                    <div className="user-card-gen">
                        {renderUser()}
                    </div>
                    <h2>Personal Statistics</h2>
                    <div className="stat-card-gen">
                        {renderStats()}
                    </div>
                </div>
                <div id="profile-post-bar">
                    <h2>Personal Posts</h2>
                    <div className="post-card-gen">
                        {renderPost()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
