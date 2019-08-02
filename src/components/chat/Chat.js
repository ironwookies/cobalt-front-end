import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

import './chat.css';
export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				_id: '5d42efbef87c0c03307e0617',
			},
			message: '',
			messages: [],
			socket: socketIOClient('http://192.168.125.9:3000', {
				// socket: socketIOClient('http://192.168.1.242:3000', {
				query: { _id: this.props.match.params.id },
			}),
			room: this.props.match.params.id,
		};

		this.state.socket.on('chat message', (data) => {
			this.addMessage(data);
		});
	}

	componentDidMount() {
		this.fetchChatHistory();
	}

	addMessage = (data) => {
		this.setState({ messages: [...this.state.messages, data] });
	};

	sendMessage = (e) => {
		e.preventDefault();
		this.state.socket.emit('chat message', {
			creator: this.state.user._id,
			content: this.state.message,
		});
		this.saveMessage(this.state.message);

		this.setState({ message: '' });
		e.target.value = '';
	};

	saveMessage = (message) => {
		try {
			axios
				.post(
					`http://192.168.125.9:3000/chat/messages/${
						this.props.match.params.id
					}`,
					{
						message,
					},
					{
						headers: {
							Authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250YWN0cyI6W10sImNoYXQiOltdLCJmaWxlcyI6W10sInZlcmlmaWVkRW1haWwiOmZhbHNlLCJfaWQiOiI1ZDQzMGY5YjBkZjA2ZjJmNzE5MTVlM2EiLCJwYXNzd29yZCI6IiQyYiQxMCQvdnhTeXFRWlB1YktiT1VLR1hkSEZ1bUhkZ1hOT1I5NFU0aTM2SkhsSThVVlFiWjBocnQ5NiIsImVtYWlsIjoidGVzc2FzZGFzZGZhc2RmYXRAYXNkcy5jb20iLCJmaXJzdE5hbWUiOiJ0ZXN0IiwiY3JlYXRlZEF0IjoiMjAxOS0wOC0wMVQxNjoxMzoxNS41ODZaIiwidXBkYXRlZEF0IjoiMjAxOS0wOC0wMVQxNjoxMzoxNS41ODZaIiwiX192IjowLCJpYXQiOjE1NjQ2ODQ2Mjh9.WvI4c4qEivY5VCEPCj0ln0q4-0pDxbhuYU7ECmZGR2E',
						},
					},
				)
				.then((response) => {
					this.fetchChatHistory();
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	renderMessages = () => {
		if (this.state.messages && this.state.messages.length === 0) {
			return <div />;
		} else {
			return (
				<div>
					{this.state.messages.map((message, i) => {
						return (
							<div key={i}>
								<h3>Author: {message.creator.firstName}</h3>
								<p>
									<span>Message:</span>
									{message.content}
								</p>
							</div>
						);
					})}
				</div>
			);
		}
	};

	fetchChatHistory = () => {
		try {
			axios
				.get(
					`http://192.168.125.9:3000/chat/history/${
						this.props.match.params.id
					}`,
					{
						headers: {
							Authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250YWN0cyI6W10sImNoYXQiOltdLCJmaWxlcyI6W10sInZlcmlmaWVkRW1haWwiOmZhbHNlLCJfaWQiOiI1ZDQzMGY5YjBkZjA2ZjJmNzE5MTVlM2EiLCJwYXNzd29yZCI6IiQyYiQxMCQvdnhTeXFRWlB1YktiT1VLR1hkSEZ1bUhkZ1hOT1I5NFU0aTM2SkhsSThVVlFiWjBocnQ5NiIsImVtYWlsIjoidGVzc2FzZGFzZGZhc2RmYXRAYXNkcy5jb20iLCJmaXJzdE5hbWUiOiJ0ZXN0IiwiY3JlYXRlZEF0IjoiMjAxOS0wOC0wMVQxNjoxMzoxNS41ODZaIiwidXBkYXRlZEF0IjoiMjAxOS0wOC0wMVQxNjoxMzoxNS41ODZaIiwiX192IjowLCJpYXQiOjE1NjQ2ODQ2Mjh9.WvI4c4qEivY5VCEPCj0ln0q4-0pDxbhuYU7ECmZGR2E',
						},
					},
				)
				.then((response) => {
					this.setState({ messages: response.data.messages });
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {}
	};

	inputOnChange = (e) => {
		if (e.key === 'Enter') {
			this.sendMessage(e);
		}
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div className="card">
				<div className="card-body">
					<div className="card-title">
						Global Chat {this.props.match.params.id}
					</div>
					<hr />
					<div className="messages">{this.renderMessages()}</div>
				</div>
				<div className="card-footer">
					<form>
						<textarea
							maxLength="700"
							placeholder="Message"
							className="form-control"
							onKeyPress={(e) => {
								this.inputOnChange(e);
							}}
							onChange={(e) => {
								this.inputOnChange(e);
							}}
							value={this.state.message}
							name="message"
						/>
						<br />
						<button
							onClick={this.sendMessage}
							className="btn btn-primary form-control">
							Send
						</button>
					</form>
				</div>
			</div>
		);
	}
}
