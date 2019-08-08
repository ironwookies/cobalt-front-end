import React from 'react';
import Navbar from '../navbar/Navbar';
import Body from '../body/Body';
import About from '../about/About';
import Action from '../action/Action';
import Footer from '../footer/Footer';

export default function Home(props) {
	return (
		<div className="home-container">
			<Navbar user={props.user} />
			<Body />
			<Action />
			<About />
			<Footer />
		</div>
	);
}
