import React, { Component, useState, useEffect } from 'react';

import './Directory.scss'

import DirectoryIcon from '../../../FileSystemIcons/DirectoryIcon'

export default function Directory(){

    const [data, setData] = useState(null);

    useEffect(() => {

    }, []);

    let testdata = [{ ext: ".txt", filename: "test.txt", isDirectory: false, path: "/", lastModified: "Today" },
    { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" }, { ext: "", filename: "folder", isDirectory: true, path: "/", lastModified: "Today" },]
    
    return <div className='content_container'>
        <div className='top_bar'>Username/path/to/the/folder</div>
        <div className='dir_container'>
            {(testdata).map(({ ext, filename, isDirectory, path, lastModified }, i) =>
                <span key={i} className='file'>
                    <DirectoryIcon />
                    <span className='filename'>{filename + i}</span>
                </span>
            )}
        </div>
    </div> 
}