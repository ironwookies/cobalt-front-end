import React from 'react';
import { NavLink } from 'react-router-dom';

const RoomsList = (props) => {
	const renderRoomList = () => {
		if (props.roomsList) {
			return props.roomsList.map((room, i) => {
				return (
					<NavLink key={i} to={`/chat/room/${room._id}`}>
						{room.name} - {room.updatedAt}
					</NavLink>
				);
			});
		} else {
			return <div>No rooms Available</div>;
		}
	};

	return (
		<div>
			<h3>Chat Rooms</h3>
			{renderRoomList()}
		</div>
	);
};

export default RoomsList;
