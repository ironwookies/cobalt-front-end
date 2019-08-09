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
			groupContacts: [],
			groupContactsInfo: [],
			displayContacts: false,
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

	addToContacts = (id) => {
		this.service.postRoute(`user/${id}`);
		this.setState({ contacts: [...this.state.contacts, id] });
	};

	toogleContacts = () => {
		this.setState({ displayContacts: !this.state.displayContacts });
	};

	addToGroup = (id) => {
		const groupContacts = this.state.fullContacts.filter((user, i) => {
			return this.state.groupContacts.includes(user._id) || id === user._id;
		});
		this.setState({
			groupContacts: [...new Set([...this.state.groupContacts, id])],
			groupContactsInfo: groupContacts,
		});
	};

	createGroup = () => {
		this.service.postRoute('/chat', {
			users: [...new Set([...this.state.groupContacts, this.state.user._id])],
			name: 'Some name',
			description: 'Some description',
			type: 'private',
		});
		this.setState({ groupContacts: [] });
	};

	checkRoom = async (id) => {
		let rooms = this.state.user.chat.filter((room) => {
			return room.users.includes(id);
		});
		if (rooms.length === 1) {
			this.props.history.push(`/chat/room/${rooms[0]._id}`);
		} else {
			let response = await this.service.postRoute('chat', {
				users: [id, this.state.user._id],
				name: `Private Chat`,
				description: ' ',
				type: 'private',
			});

			this.props.history.push(`/chat/room/${response.chat._id}`);
		}
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
									<ContactList
										{...props}
										contacts={this.state.user.contacts}
										addChat={this.checkRoom}
									/>
								);
							}}
						/>
						<Route
							exact
							path="/chat/rooms"
							render={(props) => {
								return (
									<RoomsList
										{...props}
										roomsList={this.state.user.chat}
										contacts={this.state.user.contacts}
										addToGroup={this.addToGroup}
										groupContacts={this.state.groupContactsInfo}
										displayContacts={this.state.displayContacts}
										toogleContacts={this.toogleContacts}
										createGroup={this.createGroup}
									/>
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
										addChat={this.addToContacts}
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
