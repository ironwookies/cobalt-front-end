import React from 'react';
import './emojis.css'

export default function EmojiPage(props) {
    return (
        <div className='emoji-page'>
            {props.emojis}
        </div>
    )
}
