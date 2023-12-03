import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';

function Forum({ posts, users }) {
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

    return (
        <div className="Forum">
            <h1>Forum</h1>
            <div className="container">
                <div id="forum-post-bar">
                    <h2>Some Title Post Here</h2>
                    <div className="post-card-gen">
                        {renderPost()}
                    </div>
                </div>
                <div id="forum-user-bar">
                    <h2>Recommended Users</h2>
                    <div className="user-card-gen">
                        {renderUser()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forum;
