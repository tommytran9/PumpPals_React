import "./App.css";
import LoginForm from "./pages/LoginForm";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import About from "./pages/About";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import EditProfile from "./pages/EditProfile";
import CreatePost from "./pages/CreatePost";
import Logout from "./pages/Logout";
import User from "./pages/User";
import React, { useState } from "react";

/*
  First page you see:
  > Authentication: Login/Sign Up
  - Users must first login or sign up if they don't have a registered account in order to access the rest of the site.
  - Basically write out this ^ (just 'splain)

  After login/sign up:
  > Navbar: Home, Forum, About
  - Home: the client's "twitter" feed, dashboard, shit like that. If the client has nothing (following/friending no one), then it displays
          a message like "to fill up your feed/dashboard, start following some (recommended users or something, idk)"
    * Posts: user pfp, name, date, message, option to reply, like, or repost
  - Forum: "Free roam", look up other people, see other people's posts (like recent posts or some shit), option to search by keywords or smthn
    * It just shows posts, but will have a search bar based on keywords or smthn
  - About: explain what this site is about (mostly for 540 shit/purposes)
    * Just write this out

  > Profile
  - Navbar still present.
  - This isn't going to be in the navbar itself (i don't think), but it should be placed in the top right corner, possibly on the same
    line as the navbar.
  - Profile displays an "edit" option to customize the profile.
    * Customize profile picture, bio (that's it or so help me)
    * That being said, profiles will have: profile picture and biography on the left side, personal posts in the middle, potentially stat tracker
      on the right side.
  - Profile displays user's personal posts.
  - A stat tracker (for whatever the hell people who exercise keep track of)
*/

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  function fetchData() {
    fetch("localhost:");
  }

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="container">
        <Routes>
          <Route
            path="/login"
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/:username?" element={<User />} />
          <Route
            path="/create-account"
            element={<CreateAccount setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
