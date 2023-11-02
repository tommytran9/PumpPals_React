import React, { Component } from 'react';

import './Directory.scss'

import DirectoryIcon from '../../FileSystemIcons/DirectoryIcon'

export default class Directory extends Component{
    constructor(){
        super()
        this.state = {}
    }

    componentDidMount(){
        
    }

    render(){
        let data = [{ ext:".txt", filename:"test.txt", isDirectory:false, path:"/", lastModified:"Today"},
        { ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},{ ext:"", filename:"folder", isDirectory:true, path:"/", lastModified:"Today"},]
        return <div className='content_container'>
                <div className='top_bar'>Username/path/to/the/folder</div>
                <div className='dir_container'>
                    {data.map(({ ext, filename, isDirectory, path, lastModified }, i) =>
                        <span key={i} className='file'>
                            <DirectoryIcon />
                            <span className='filename'>{filename + i}</span>
                        </span>
                    )}
                </div>
            </div>
    }
}