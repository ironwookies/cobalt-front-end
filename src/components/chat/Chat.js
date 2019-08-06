import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

import Giphy from './../giphy/Giphy';
import AuthService from './../auth/auth-service';
import './chat.css';
export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			message: '',
			messages: [],
			socket: socketIOClient('http://192.168.125.9:3000', {
				query: { _id: this.props.match.params.id },
			}),
			giphy: false,
			gifs: [],
			room: this.props.match.params.id,
		};
		this.service = new AuthService();

		this.state.socket.on('chat message', (data) => {
			this.addMessage(data);
		});
	}

	componentDidMount() {
		this.fetchChatHistory();
		this.getTrendingGiphy();
	}

	getTrendingGiphy() {
		axios
			.get(
				'http://api.giphy.com/v1/gifs/trending?&api_key=' +
					'm5ItKE4FT6iJhDAdWAYtNAhVOkG40WUT' +
					// process.env.GIPHYKEY +
					'&limit=1',
			)
			.then((res) => {
				return this.setState({ gifs: this.createGiffs(res.data.data) });
			})
			.catch((error) => {
				console.log(error);
			});
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
			this.service
				.postRoute(`chat/messages/${this.props.match.params.id}`, {
					message,
				})
				.then((response) => {
					this.fetchChatHistory();
				});
		} catch (error) {
			console.log(error);
		}
	};

	renderMessages = () => {
		if (this.state.messages && this.state.messages.length === 0) {
			return null;
		} else {
			return (
				<div>
					{this.state.messages.map((message, i) => {
						if (message.type === 'Image') {
							return (
								<div key={i}>
									<h3>Author: {message.creator.firstName}</h3>
									<p>
										<span>Message:</span>
										<img src={message.content} alt="gif" />
									</p>
								</div>
							);
						}
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
			this.service
				.checkRoute(`chat/history/${this.props.match.params.id}`)
				.then((response) => {
					this.setState({ messages: response.messages });
				});
		} catch (error) {}
	};

	inputOnChange = (e) => {
		if (e.key === 'Enter') {
			this.sendMessage(e);
		}
		this.setState({ [e.target.name]: e.target.value });
	};

	displayInput = () => {
		this.getTrendingGiphy();
		if (this.state.giphy) {
			return (
				<Giphy
					gifs={this.state.gifs}
					search={(e) => {
						this.getSearchedGiphy(e);
					}}
				/>
			);
		} else {
			return (
				<textarea
					maxLength="700"
					placeholder="Message"
					className="chatarea__textarea"
					onKeyPress={(e) => {
						this.inputOnChange(e);
					}}
					onChange={(e) => {
						this.inputOnChange(e);
					}}
					value={this.state.message}
					name="message"
				/>
			);
		}
	};

	toggleGif = (e) => {
		e.preventDefault();
		this.setState({ giphy: !this.state.giphy });
	};

	getSearchedGiphy(e) {
		let search = e.target.value;
		if (search === '') {
			this.getTrendingGiphy();
			return;
		}

		axios
			.get(
				'http://api.giphy.com/v1/gifs/search?q=' +
					search +
					'&api_key=' +
					'm5ItKE4FT6iJhDAdWAYtNAhVOkG40WUT' +
					// this.state.key +
					'&limit=1',
			)
			.then((res) => {
				return this.setState({ gifs: this.createGiffs(res.data.data) });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getImageUrl = (e) => {
		console.log(e.target.src);
		this.setState({
			message: `<img src='${e.target.src}'/>`,
		});
	};
	createGiffs = (giffs) => {
		return giffs.map((giff, i) => {
			return (
				<div className="giff-container" key={i}>
					<img
						src={giff.images.fixed_width.url}
						alt=""
						onClick={this.getImageUrl}
					/>
				</div>
			);
		});
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
					<form
						className="chatarea"
						onSubmit={(e) => {
							e.preventDefault();
						}}>
						{this.displayInput()}
						<div className="chatarea__input">
							<button
								onClick={this.sendMessage}
								className="btn btn-primary form-control">
								Send
							</button>
							<button
								onClick={(e) => {
									this.toggleGif(e);
								}}
								className="btn btn-primary form-control">
								Giphy
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
