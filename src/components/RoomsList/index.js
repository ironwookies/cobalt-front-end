import React from 'react';
import { NavLink } from 'react-router-dom';
import './roomList.css';

const RoomsList = (props) => {
	const renderRoomList = () => {
		if (props.roomsList) {
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

	return (
		<div className="chatrooms-wrapper">
			<h3>Chat Rooms</h3>
			{renderRoomList()}
		</div>
	);
};

export default RoomsList;
