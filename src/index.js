import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();

const Navbar = () => {
  return (
      <>
          <Nav>
              <NavMenu>
                  <NavLink to="/about" activeStyle>
                      About
                  </NavLink>
                  <NavLink to="/contact" activeStyle>
                      Contact Us
                  </NavLink>
                  <NavLink to="/blogs" activeStyle>
                      Blogs
                  </NavLink>
                  <NavLink to="/sign-up" activeStyle>
                      Sign Up
                  </NavLink>
              </NavMenu>
          </Nav>
      </>
  );
};

export default Navbar;