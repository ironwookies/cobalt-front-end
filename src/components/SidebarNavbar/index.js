import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarNavbar = () => {
	return (
		<div>
			<ul>
				<li>
					<NavLink exact to={'/chat/contacts'}>
						Contacts
					</NavLink>
				</li>
				<li>
					<NavLink exact to={'/chat/rooms'}>
						Chats
					</NavLink>
				</li>
				<li>
					<NavLink exact to={'/chat/contactslist'}>
						Add Contact
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default SidebarNavbar;
