import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, UserPlus, Users } from 'react-feather';

const SidebarNavbar = () => {
	return (
		<div>
			<ul>
				<li>
					<NavLink exact to={'/chat/contacts'}>
						Contacts
						<Users />
					</NavLink>
				</li>
				<li>
					<NavLink exact to={'/chat/rooms'}>
						Chats
						<MessageSquare />
					</NavLink>
				</li>
				<li>
					<NavLink exact to={'/chat/contactslist'}>
						Add Contact
						<UserPlus />
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default SidebarNavbar;
