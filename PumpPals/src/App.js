import logo from './logo.svg';
import React from 'react';
import './App.css';
import Navbar from './components/Navbar.js';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blog';
import SignUp from './pages/signup';
import Contact from './pages/contact';

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route exact path='/' exact element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/blog' element={<Blogs />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</Router>
	);
}




export default App;

/*   <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
   Zifo 
  </p>
  <a
    className="App-link"
    href = ""
    target="_blank"
    rel="noopener noreferrer"
  >
    Click to access Zifo
  </a>
</header>
</div>
*/