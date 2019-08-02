import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './chat.css';
export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			message: '',
			messages: [],
		};
		this.socket = socketIOClient('http://192.168.125.9:3000');

		this.socket.on('RECEIVE_MESSAGE', (data) => {
			addMessage(data);
		});

		const addMessage = (data) => {
			this.setState({ messages: [...this.state.messages, data] });
		};

		this.sendMessage = (e) => {
			e.preventDefault();
			this.socket.emit('SEND_MESSAGE', {
				author: this.state.username,
				message: this.state.message,
			});
			this.setState({ message: '' });
			e.target.value = '';
		};
	}

	inputOnChange = (e) => {
		if (e.key === 'Enter') {
			this.sendMessage(e);
		}
		this.setState({ [e.target.name]: e.target.value });
	};
	// registerHandler = (onMessageReceived) => {
	// 	socket.on('message', onMessageReceived);
	// };

	// unregisterHandler = () => {
	// 	socket.off('message');
	// };

	// // socket.on('error', function (err) {
	// // 	console.log('received socket error:')
	// // 	console.log(err)
	// // })

	// register = (name, cb) => {
	// 	socket.emit('register', name, cb);
	// };

	// join = (chatroomName, cb) => {
	// 	socket.emit('join', chatroomName, cb);
	// };

	// leave = (chatroomName, cb) => {
	// 	socket.emit('leave', chatroomName, cb);
	// };

	// message = (chatroomName, msg, cb) => {
	// 	socket.emit('message', { chatroomName, message: msg }, cb);
	// };

	// getChatrooms = (cb) => {
	// 	socket.emit('chatrooms', null, cb);
	// };

	// getAvailableUsers = (cb) => {
	// 	socket.emit('availableUsers', null, cb);
	// };

	componentDidMount() {
		// const { endpoint } = this.state;
		// const socket = socketIOClient(endpoint);
		// socket.on('FromAPI', (data) => this.setState({ response: data }));
	}

	render() {
		return (
			<div className="card">
				<div className="card-body">
					<div className="card-title">Global Chat</div>
					<hr />
					<div className="messages">
						{this.state.messages.map((message, i) => {
							return (
								<div key={i}>
									<h1>Author: {message.author}</h1>
									<p>
										<span>Message:</span>
										{message.message}
									</p>
								</div>
							);
						})}
					</div>
				</div>
				<div className="card-footer">
					<input
						type="text"
						placeholder="Username"
						className="form-control"
						name="username"
						value={this.state.username}
						onChange={(e) => {
							this.inputOnChange(e);
						}}
					/>
					<br />
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
