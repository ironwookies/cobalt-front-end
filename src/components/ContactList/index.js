import React from 'react';
import { NavLink } from 'react-router-dom';

const ContactList = (props) => {
	const renderContacts = () => {
		return props.contacts.map((user, i) => {
			return (
				<NavLink key={i} to={`/chat/room${user._id}`}>
					{user.firstName} {user.familyName}
				</NavLink>
			);
		});
	};
	return (
		<div>
			<h3>Contacts</h3>
			{renderContacts()}
		</div>
	);
};

export default ContactList;
