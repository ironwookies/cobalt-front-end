import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import { Picker, emojiIndex } from 'emoji-mart';
import { Smile } from 'react-feather';
import ScrollToBottom from 'react-scroll-to-bottom';

import 'emoji-mart/css/emoji-mart.css';

import Giphy from './../giphy/Giphy';
import AuthService from './../auth/auth-service';
import './chat.css';
export default class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			showEmojiPicker: false,
			message: '',
			messages: [],
			fetchingHistory: true,
			socket: socketIOClient(process.env.REACT_APP_SOCKET, {
				query: { _id: this.props.match.params.id, user: this.props.user._id },
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
				'https://api.giphy.com/v1/gifs/trending?&api_key=' +
					process.env.REACT_APP_GIPHY_API +
					'&limit=5',
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
		if (
			// this.state.fetchingHistory ||
			// !!this.state.messages ||
			!!this.state.messages &&
			this.state.messages.length === 0
		) {
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
					this.setState({
						messages: response.messages,
					});
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
				<div>
					<button
						type="button"
						className="toggle-emoji"
						onClick={this.toggleEmojiPicker}>
						<Smile />
					</button>
					<ReactTextareaAutocomplete
						className="message-input my-textarea"
						name="message"
						value={this.state.message}
						loadingComponent={() => <span>Loading</span>}
						onKeyPress={this.inputOnChange}
						onChange={this.inputOnChange}
						placeholder="Compose your message and hit ENTER to send"
						trigger={{
							':': {
								dataProvider: (token) =>
									emojiIndex.search(token).map((o) => ({
										colons: o.colons,
										native: o.native,
									})),
								component: ({ entity: { native, colons } }) => (
									<div>{`${colons} ${native}`}</div>
								),
								output: (item) => `${item.native}`,
							},
						}}
					/>
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
				</div>
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
				'https://api.giphy.com/v1/gifs/search?q=' +
					search +
					'&api_key=' +
					process.env.REACT_APP_GIPHY_API +
					'&limit=5',
			)
			.then((res) => {
				return this.setState({ gifs: this.createGiffs(res.data.data) });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	sendGifMessage = (e) => {
		this.state.socket.emit('chat message', {
			creator: this.state.user._id,
			content: this.state.message,
			type: 'Image',
			createAt: new Date(),
		});

		try {
			this.service
				.postRoute(`chat/messages/${this.props.match.params.id}`, {
					message: e.target.src,
					type: 'Image',
				})
				.then((response) => {
					this.fetchChatHistory();
				});

			this.setState({
				giphy: false,
			});
		} catch (error) {
			console.log(error);
		}
	};

	createGiffs = (giffs) => {
		return giffs.map((giff, i) => {
			// console.log(giffs);
			return (
				<div className="giff-container" key={i}>
					<img
						src={giff.images.fixed_width.url}
						alt=""
						onClick={this.sendGifMessage}
					/>
				</div>
			);
		});
	};

	toggleEmojiPicker = () => {
		this.setState({
			showEmojiPicker: !this.state.showEmojiPicker,
		});
	};

	addEmoji = (emoji) => {
		this.setState({
			message: `${this.state.message}${emoji.native}`,
			showEmojiPicker: false,
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
					<ScrollToBottom className="messages" mode="bottom">
						{this.renderMessages()}
					</ScrollToBottom>
					{this.state.showEmojiPicker ? (
						<Picker set="emojione" onSelect={this.addEmoji} />
					) : null}
				</div>
				<div className="card-footer">
					<form
						className="chatarea"
						onSubmit={(e) => {
							e.preventDefault();
						}}>
						{this.displayInput()}
					</form>
				</div>
			</div>
		);
	}
}
