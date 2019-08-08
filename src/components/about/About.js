import React from 'react';
import './about.css';

export default function About() {
    return (
        <div className='about-container'>
            <div className="about-wrapper">
                <div className="section-header">
                    <h1>ABOUT COBALT</h1>
                    <hr/>
                </div>
                <div className="article-content">
                    <div className="article-section">
                        <h3>Keep in touch with friends</h3>
                        <p>
                            Start chatting today, using Cobalt's easy to use
                            interface! Add frieds to your contacts and start 
                            chatting. Want to add more friends to your conversation?
                            Create a group chat and invite all your buds, share whimsical
                            GIFs and emojis to liven the conversation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
