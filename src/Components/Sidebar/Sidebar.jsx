import React, { Component } from "react";
import { Link } from "react-router-dom";

import NoProfilePic from "../User/NoProfilePic";

import FolderIcon from './Icons/FolderIcon';
import FriendIcon from './Icons/FriendIcon';
import InfoIcon from './Icons/InfoIcon';
import AccountIcon from "./Icons/AccountIcon";

import './Sidebar.scss'

export default class Sidebar extends Component {
    constructor() {
        super()
    }

    render() {
        return <nav className='sidebar'>
            <span className='sidebar-top'>
                <NoProfilePic />
            </span>
            <div className='navbar'>
                <Link className="active" to="/dir"><FolderIcon /></Link>
                <Link to="/social"><FriendIcon/></Link>
                <Link to="/about"><InfoIcon /></Link>
                <Link to="/settings"><AccountIcon /></Link>
            </div>
        </nav>
    }
}