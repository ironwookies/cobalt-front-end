import React from 'react';
import './emojis.css';

export default function emoji(props) {
    return (
        <div className="emoji">
            {props.emoji}
        </div>
    )
}
