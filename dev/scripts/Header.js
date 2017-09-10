import React from 'react';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink } from 'react-router-dom';
import App from './app.js';
import ShowInputForm from './ShowInputForm.js';

const Header = () => {
	return (
		<header>
		    <div className='wrapper'>
		      <h1>Playlist</h1>
		      <nav>
		      	<ul>
		      		<NavLink to="/">Home</NavLink>
		      		<Route exact path="/" component={App} />
		      		<NavLink to="/add_show">Add Show</NavLink>
		      		<Route path="/add_show" component={ShowInputForm} />
		      	</ul>
		      </nav>
		    </div>
		</header>
	)
}

export default Header;