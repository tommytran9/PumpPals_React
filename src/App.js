import './App.css';
import LoginForm from './pages/LoginForm';
import Signup from './pages/Signup';
import Navbar from './Navbar';
import Home from './pages/Home';
import Forum from './pages/Forum';
import About from './pages/About';
import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-dom';

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
  function fetchData() {
    fetch('localhost:')
  }


  let component
  // dummy data
  // ID is for backend
  const posts = [
    {
        id:1,
        pfp:"https://i.imgur.com/kpsiG4E.png",
        author:"unga bunga",
        date:"11/16/2023",
        message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo viverra maecenas accumsan lacus vel facilisis. Egestas sed tempus urna et pharetra pharetra massa massa. Consequat mauris nunc congue nisi vitae suscipit tellus. Integer vitae justo eget magna fermentum iaculis eu non. Elementum tempus egestas sed sed. Adipiscing elit duis tristique sollicitudin nibh sit amet. Vitae semper quis lectus nulla at volutpat. Et sollicitudin ac orci phasellus egestas. Netus et malesuada fames ac turpis egestas. Odio tempor orci dapibus ultrices in iaculis nunc. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Egestas fringilla phasellus faucibus scelerisque. Proin fermentum leo vel orci porta.",
        liked:true
    },
    {
        id:2,
        pfp:"https://i.imgur.com/JnLqcFL.gif",
        author:"ANDREW JOKI",
        date:"11/16/2023",
        message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Commodo viverra maecenas accumsan lacus vel facilisis. Egestas sed tempus urna et pharetra pharetra massa massa. Consequat mauris nunc congue nisi vitae suscipit tellus. Integer vitae justo eget magna fermentum iaculis eu non. Elementum tempus egestas sed sed. Adipiscing elit duis tristique sollicitudin nibh sit amet. Vitae semper quis lectus nulla at volutpat. Et sollicitudin ac orci phasellus egestas. Netus et malesuada fames ac turpis egestas. Odio tempor orci dapibus ultrices in iaculis nunc. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Egestas fringilla phasellus faucibus scelerisque. Proin fermentum leo vel orci porta.",
        liked:false
    }
  ]

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
