import React from 'react';
import { NavLink } from 'react-router-dom';
import './roomList.css';

const RoomsList = (props) => {
	const renderRoomList = () => {
		if (props.displayContacts) {
			return null;
		} else if (props.roomsList) {
			return props.roomsList.map((room, i) => {
				return (
					<div className='list-container'>
						<NavLink className='list-item' key={i} to={`/chat/room/${room._id}`}>
							{room.name} - {room.updatedAt}
						</NavLink>
					</div>
				);
			});
		} else {
			return <div>No rooms Available</div>;
		}
	};

	const displayCreateRoom = () => {
		if (props.displayContacts) {
			return (
				<div>
					<span>Contact List</span>
					<ul>{userList()}</ul>
					<button
						onClick={() => {
							props.toogleContacts();
							props.createGroup();
						}}>
						Create Room
					</button>
					{newRoomUsers()}
				</div>
			);
		} else {
			return <div onClick={createRoom}>Create Room</div>;
		}
	};

	const newRoomUsers = () => {
		if (props.groupContacts.length > 0) {
			return props.groupContacts.map((user, i) => {
				return (
					<div key={i}>
						{user.firstName} {user.familyName}
					</div>
				);
			});
		} else {
			return <div>No users in the new room yet....</div>;
		}
	};

	const userList = () => {
		return props.contacts.map((contact, i) => {
			return (
				<li
					key={i}
					onClick={() => {
						props.addToGroup(contact._id);
					}}>
					{contact.firstName}
				</li>
			);
		});
	};

	const createRoom = () => {
		props.toogleContacts();
	};

	return (
		<div className="chatrooms-wrapper">
			<h3>Chat Rooms</h3>
			{renderRoomList()}
			{displayCreateRoom()}
		</div>
	);
};

export default RoomsList;
