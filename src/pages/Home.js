import React from 'react';

import PostCard from '../components/PostCard';
import NavigationBar from '../components/NavigationBar';

function Home({ posts }) {
    // posts is an array of post objects pulled from the back end. (Passed down from the parent as a prop.)
    function renderPost() {
        return (
            // When you're mapping posts, you're iterating through the array of objects and performing whatever
            // functional code you're writing in. In this case, it's rendering in a subcomponent and passing the
            // individual post data into the subcomponent.
            posts.map(post => <PostCard post={post} />)
        )
    }

    return (
        <div>
            {renderPost()}
            
            <div className="flex flex-col min-h-screen overflow-hidden">
                {/*  Site Nabvar */}
                <NavigationBar />
            
            
            
            </div>
        </div>
    )
}

export default Home;
