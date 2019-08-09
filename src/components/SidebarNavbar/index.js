import React from 'react';
import { NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { MessageSquare, UserPlus, Users } from 'react-feather';

import ContactList from './../ContactList';
import RoomsList from './../RoomsList';

import './sidebarNavbar.css';

const SidebarNavbar = (props) => {
	return (
		<div className='sidebar-container'>
			<div className="sidebar-wrapper">
				<div className="sidebar-control-icons">
					<ul>
						<li>
							<NavLink to="/chat/contacts" >
								<Users className='chat-icons' />
							</NavLink>
						</li>
						<li>
							<NavLink to="/chat/rooms" >
								<MessageSquare className='chat-icons' />
							</NavLink>
						</li>
						<li>
							<NavLink to="/chat/contactslist" >
								<UserPlus className='chat-icons' />
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="sidebar-pages">
					<div className="sidebar-pages-container">
						<Switch>
							<Route exact path="/chat/contacts"
								component={() => {
									return (
										<ContactList {...props} 
											contacts={props.user.contacts} 
											addChat={props.checkRoom}
										/>
									);
								}}
							/>
							<Route exact path="/chat/rooms"
								component={() => {
									return (
										<RoomsList {...props} 
											roomsList={props.user.chat}
											contacts={props.contacts}
											addToGroup={props.addToGroup}
											groupContacts={props.groupContacts}
											displayContacts={props.displayContacts}
											toogleContacts={props.toogleContacts}
											createGroup={props.createGroup}
										/>
									);
								}}
							/>
							<Route exact path="/chat/contactslist"
								component={() => {
									return (
										<ContactList {...props} 
											contacts={props.fullContacts}
											addChat={props.addToContacts} 
										/>
									);
								}}
							/>
						</Switch>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SidebarNavbar;
