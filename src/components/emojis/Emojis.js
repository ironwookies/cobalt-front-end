import React from 'react';
import './emojis.css';

export default function Emojis(props) {
    return (
        <div className='emoji-container'>
            <div className="emoji-select">
                
            </div>
            <div className="emoji-wrapper">
                {props.emojis}
            </div>
        </div>
    )
}
