import React, { Component } from 'react';

export default class NoProfilePic extends Component {
    constructor() {
        super()
        this.backgroundColor = 'white'
        this.fontColor = 'black'
        this.letter = "U"
    }

    render() {

        return <svg
            xmlns="http://www.w3.org/2000/svg"
            width='100%'
            height='100%'
            viewBox="0 0 100 100"
        >
            <circle cx="50" cy="50" r="45" fill={this.backgroundColor} />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="40"
                fill={this.fontColor}
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
            >
                {this.letter}
            </text>
        </svg>
    }
}