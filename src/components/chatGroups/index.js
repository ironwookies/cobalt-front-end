import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import axios from 'axios';

import Chat from '../chat/Chat';
import './charGroups.css';

export default class ChatRooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chatGroups: [],
			contacts: [],
			error: [],
			currentGroup: '',
		};
	}

	componentDidMount() {
		this.fetchUserInfo();
		this.fetchUserChats();
	}

	componentDidUpdate() {}

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
						<NavLink activeClassName="active" exact to={'/chat/' + group._id}>
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
			axios
				.get('http://192.168.125.9:3000/user', {
					// .get('http://192.168.1.242:3000/user', {
					headers: {
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250YWN0cyI6W10sImNoYXQiOltdLCJmaWxlcyI6W10sInZlcmlmaWVkRW1haWwiOmZhbHNlLCJfaWQiOiI1ZDQzMGY5YjBkZjA2ZjJmNzE5MTVlM2EiLCJwYXNzd29yZCI6IiQyYiQxMCQvdnhTeXFRWlB1YktiT1VLR1hkSEZ1bUhkZ1hOT1I5NFU0aTM2SkhsSThVVlFiWjBocnQ5NiIsImVtYWlsIjoidGVzc2FzZGFzZGZhc2RmYXRAYXNkcy5jb20iLCJmaXJzdE5hbWUiOiJ0ZXN0IiwiY3JlYXRlZEF0IjoiMjAxOS0wOC0wMVQxNjoxMzoxNS41ODZaIiwidXBkYXRlZEF0IjoiMjAxOS0wOC0wMVQxNjoxMzoxNS41ODZaIiwiX192IjowLCJpYXQiOjE1NjQ2ODQ2Mjh9.WvI4c4qEivY5VCEPCj0ln0q4-0pDxbhuYU7ECmZGR2E',
					},
				})
				.then((response) => {
					this.setState({ contacts: response.data });
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
			axios
				.get('http://192.168.125.9:3000/chat/groups', {
					// .get('http://192.168.1.242:3000/chat/groups', {
					headers: {
						Authorization:
							'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250YWN0cyI6W10sImNoYXQiOltdLCJmaWxlcyI6W10sInZlcmlmaWVkRW1haWwiOmZhbHNlLCJfaWQiOiI1ZDQzMGY5YjBkZjA2ZjJmNzE5MTVlM2EiLCJwYXNzd29yZCI6IiQyYiQxMCQvdnhTeXFRWlB1YktiT1VLR1hkSEZ1bUhkZ1hOT1I5NFU0aTM2SkhsSThVVlFiWjBocnQ5NiIsImVtYWlsIjoidGVzc2FzZGFzZGZhc2RmYXRAYXNkcy5jb20iLCJmaXJzdE5hbWUiOiJ0ZXN0IiwiY3JlYXRlZEF0IjoiMjAxOS0wOC0wMVQxNjoxMzoxNS41ODZaIiwidXBkYXRlZEF0IjoiMjAxOS0wOC0wMVQxNjoxMzoxNS41ODZaIiwiX192IjowLCJpYXQiOjE1NjQ2ODQ2Mjh9.WvI4c4qEivY5VCEPCj0ln0q4-0pDxbhuYU7ECmZGR2E',
					},
				})
				.then((response) => {
					this.setState({ chatGroups: response.data });
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
						path="/chat/:id"
						render={(props) => <Chat {...props} />}
					/>
				</div>
			</div>
		);
	}
}
