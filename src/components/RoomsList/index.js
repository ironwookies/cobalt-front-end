import React from 'react';
import { NavLink } from 'react-router-dom';

const RoomsList = (props) => {
	const renderRoomList = () => {
		return props.roomsList.map((room, i) => {
			return (
				<NavLink key={i} to={`/chat/room/${room._id}`}>
					{room.name} - {room.description} - {room.updatedAt} - {room.private}
				</NavLink>
			);
		});
	};

	return (
		<div>
			<h3>Chat Rooms</h3>
			{renderRoomList()}
		</div>
	);
};

export default RoomsList;
