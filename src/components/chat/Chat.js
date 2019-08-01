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
			socket: socketIOClient('http://192.168.125.9:3000', {
				query: { _id: this.props.match.params.id },
			}),
			room: this.props.match.params.id,
		};
		// this.socket = socketIOClient('http://192.168.125.9:3000');

		this.state.socket.on('chat message', (data) => {
			addMessage(data);
		});

		const addMessage = (data) => {
			this.setState({ messages: [...this.state.messages, data] });
		};

		this.sendMessage = (e) => {
			e.preventDefault();
			this.state.socket.emit('chat message', {
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

	componentDidMount() {
		// const { endpoint } = this.state;
		// const socket = socketIOClient(endpoint);
		// socket.on('FromAPI', (data) => this.setState({ response: data }));
	}

	render() {
		console.log(this.props.match.params.id);
		return (
			<div className="card">
				<div className="card-body">
					<div className="card-title">
						Global Chat {this.props.match.params.id}
					</div>
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
