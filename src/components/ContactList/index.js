import React from 'react';

const ContactList = (props) => {
	const addContactRedirect = () => {
		props.history.push('/chat/contactslist');
	};

	const renderContacts = () => {
		if (props.contacts.length !== 0) {
			return (
				<div>
					{contactList()}
					<div onClick={addContactRedirect}>Add contacts...</div>
				</div>
			);
		} else {
			return (
				<div>
					<div>No contacts...</div>
					<div onClick={addContactRedirect}>Add contacts...</div>
				</div>
			);
		}
	};

	const contactList = () => {
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
