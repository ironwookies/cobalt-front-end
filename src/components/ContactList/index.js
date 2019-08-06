import React from 'react';

const ContactList = (props) => {
	const renderContacts = () => {
		return props.contacts.map((user, i) => {
			return (
				<p
					key={i}
					to={`/chat/room/${user._id}`}
					onClick={() => {
						props.addChat(user._id);
					}}>
					{user.firstName} {user.familyName}
				</p>
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
