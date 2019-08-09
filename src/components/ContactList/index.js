import React from 'react';
import Contact from '../contact/Contact';
import './contactList.css';

const ContactList = (props) => {

	const renderContacts = () => {
		if(props.contacts.length > 0){
			return props.contacts.map((user, i) => {
				return (
					<Contact 
						key={i}
						to={`/chat/room/${user._id}`}
						addChat={() => {
							props.addChat(user._id);
						}}
						online={user.online}
						firstName={user.firstName}
					/>
				);
			});
		}else{
			return <h5 className='no-contacts'>You have no contacts</h5>;
		}
	};

	return (
		<div className="contacts-wrapper">
			<h3>Contacts</h3>
			{renderContacts()}
		</div>
	);
};

export default ContactList;
