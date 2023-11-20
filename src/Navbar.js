import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function Navbar() {
    const path = window.location.pathname
    return (
        <nav className="navbar">
            <Link to="/" className="site-title">
                Pump Pals
            </Link>
            <ul>
                <CustomLink to="/forum">Forum</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink to="/profile">Profile</CustomLink>
            </ul>
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
