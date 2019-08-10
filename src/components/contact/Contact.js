import React from 'react';
import './contact.css';

export default function Contact(props) {
	const getUserNameFirstLetter = () => {
		return props.firstName[0].toUpperCase();
	};

	const setUserStatus = () => {
		if (props.online == true) {
			return 'online';
		} else {
			return 'offline';
		}
	};

	return (
		<div className="contact-container">
			<p className="contact-icon">{getUserNameFirstLetter()}</p>
			<p className="contact-name" onClick={props.addChat}>
				{props.firstName} {props.familyName}
			</p>
			<div className={`status ${setUserStatus()}`} />
		</div>
	);
}
