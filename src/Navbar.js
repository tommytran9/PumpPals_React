import React, { useState, useEffect } from "react";
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const path = window.location.pathname;
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // State to manage dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
    navigate(`/user/${searchQuery}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="site-title">
        <img
          src="/pumppalslogo.svg"
          alt=""
          style={{ width: 200, height: 75, objectFit: "contain" }}
        />
      </Link>
      <ul>
        <CustomLink to="/forum">Forum</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        {isLoggedIn ? (
          <>
            <CustomLink to="/create-post">Create Post</CustomLink>
            <CustomLink to="/log-workout">Log Workout</CustomLink>
            <li style={{ position: 'relative' }} onMouseLeave={() => setShowDropdown(false)}>
            <button onClick={toggleDropdown} className="dropdown-button">Account</button>
            {showDropdown && (
              <div className="dropdown-menu">
                <CustomLink to="/profile" className="dropdown-item">Profile</CustomLink>
                <CustomLink to="/logout" className="dropdown-item"onClick={handleLogout}>              
                Logout
                </CustomLink>
              </div>
            )}
          </li>
        </>
        ) : (
          <>
            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/create-account">Create Account</CustomLink>
          </>
        )}
      </ul>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search Users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <img src={process.env.PUBLIC_URL + "/search.png"} alt="Search" />
        </button>
      </form>
    </nav>
  );
}

// CustomLink simply simplifies the code in Navbar.
// `...props` are like any other className or stuff like that.
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  // `end: true` means that the whole URL must match
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive === to ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
