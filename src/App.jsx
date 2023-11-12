import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getUsername } from './Util/ServerConnector';

import './App.scss'
import Login from './Components/User/LoginPopUp/LoginPopUp';
import Sidebar from './Components/Sidebar/Sidebar';

import Directory from './Components/Content Pages/Directory/Directory';
import About from './Components/Content Pages/About/About';

function App() {
    return <Router>
        <Sidebar />
        {getUsername()? <></>: <Login/>}
        <Routes>
            <Route path='/login' Component={Login}></Route>
            <Route path='/about' Component={About}></Route>
            <Route path='/' Component={Directory}></Route>
            <Route path='*' Component={Directory} />
        </Routes>
    </Router>
}

let div = document.body.appendChild(document.createElement('div'));
div.className = 'root';
createRoot(div).render(<App />);