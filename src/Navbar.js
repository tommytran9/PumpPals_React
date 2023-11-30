import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function Navbar() {
    const path = window.location.pathname
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        // Implement your search logic here
        // For example, redirect to a search results page or filter content on the current page
        console.log('Search query:', searchQuery);
    }

    return (
        <nav className="navbar">
            <Link to="/" className="site-title">
            <img src="/pumppalslogo.svg" alt="" style={{width: 200, height: 75,
                 objectFit: 'contain'}} />
                
            </Link>
            <ul>
                <CustomLink to="/forum">Forum</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink to="/profile">Profile</CustomLink>
            </ul>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
        </nav>
    )
}

// CustomLink simply simplifies the code in Navbar.
// `...props` are like any other className or stuff like that.
function CustomLink({ to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    // `end: true` means that the whole URL must match
    const isActive = useMatch({ path: resolvedPath.pathname, end: true})
    
    return (
        <li className={isActive === to ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

export default Navbar;
