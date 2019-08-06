import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthService from './../auth/auth-service';
import Chat from '../chat/Chat';
import SidebarNavbar from './../SidebarNavbar';
import ContactList from './../ContactList';
import RoomsList from './../RoomsList';
import './charGroups.css';

export default class ChatRooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			chatGroups: [],
			contacts: [],
			fullContacts: [],
			error: [],
			currentGroup: '',
		};
		this.service = new AuthService();
	}

	componentDidMount = () => {
		this.getfullContactList();
	};

	getfullContactList = () => {
		this.service.checkRoute('user').then((response) => {
			this.setState({ fullContacts: response });
		});
	};

	render() {
		return (
			<div className="chatgroups__container">
				<div className="chatgroups__sidebar">
					<SidebarNavbar user={this.state.user} />
					<Switch>
						<Route
							exact
							path="/chat/contacts"
							render={(props) => {
								return (
									<ContactList {...props} contacts={this.state.user.contacts} />
								);
							}}
						/>
						<Route
							exact
							path="/chat/rooms"
							render={(props) => {
								return (
									<RoomsList {...props} roomsList={this.state.user.chat} />
								);
							}}
						/>
						<Route
							exact
							path="/chat/contactslist"
							render={(props) => {
								return (
									<ContactList
										{...props}
										contacts={this.state.fullContacts}
										roomsList={this.state.user.chat}
									/>
								);
							}}
						/>
					</Switch>
				</div>
				<div className="chatgroups__messagearea">
					<Route
						exact
						path="/chat/room/:id"
						render={(props) => <Chat {...props} user={this.props.user} />}
					/>
				</div>
			</div>
		);
	}
}
