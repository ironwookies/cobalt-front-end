import React, { Component } from 'react';
import { Switch, NavLink, Route } from 'react-router-dom';

import AuthService from './../auth/auth-service';
import Chat from '../chat/Chat';
import SidebarNavbar from './../SidebarNavbar';
import ContacList from './../ContactList';
import RoomsList from './../RoomsList';
import './charGroups.css';

export default class ChatRooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			chatGroups: [],
			contacts: [],
			error: [],
			currentGroup: '',
		};
		this.service = new AuthService();
	}

	componentDidMount() {
		this.fetchUserInfo();
		this.fetchUserChats();
	}

	renderListOfContacts = () => {
		if (this.state.contacts.length > 0) {
			return this.state.contacts.map((chat, i) => {
				return (
					<div key={i}>
						<NavLink activeClassName="active" exact to={'/chat/' + chat._id}>
							{chat.firstName}
						</NavLink>
					</div>
				);
			});
		} else {
			return <div>Loading users...</div>;
		}
	};

	renderListOfChats = () => {
		if (this.state.chatGroups.length > 0) {
			return this.state.chatGroups.map((group, i) => {
				return (
					<div key={i}>
						<NavLink
							activeClassName="active"
							exact
							to={'/chat/room/' + group._id}>
							{group.name}-{group.description}
						</NavLink>
					</div>
				);
			});
		} else {
			return <div>Loading Chat Groups...</div>;
		}
	};

	fetchUserInfo = () => {
		try {
			this.service
				.checkRoute('user')
				.then((response) => {
					this.setState({ contacts: response });
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	fetchUserChats = () => {
		try {
			this.service
				.checkRoute('chat/groups')
				.then((response) => {
					this.setState({ chatGroups: response });
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
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
							component={ContacList}
							contactList={this.state.user.contacts}
						/>
						<Route
							exact
							path="/chat/rooms"
							component={RoomsList}
							// chatList={this.state.user.chat}
						/>
					</Switch>
					<div>
						<h3>Contacts</h3>
						{this.renderListOfContacts()}
					</div>
					<div>
						<h3>Chats</h3>
						{this.renderListOfChats()}
					</div>
				</div>
				<div>
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
