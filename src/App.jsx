import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss'
import Sidebar from './Components/Sidebar/Sidebar';

import Directory from './Components/Content Pages/Directory';

function App() {
    return <Router>
        <Sidebar />
            <Routes>
                <Route path='/dir' Component={Directory}></Route>

                <Route path='*' Component={Directory} />
            </Routes>
    </Router>
}

let div = document.body.appendChild(document.createElement('div'));
div.className = 'root';
createRoot(div).render(<App />);