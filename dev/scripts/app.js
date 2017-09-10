import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase.js';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink, Redirect } from 'react-router-dom';
import Home from './Home.js';
import ShowInputForm from './ShowInputForm.js';

const dbRef = firebase.database().ref('/items');

class App extends React.Component {
	render() {
		return (
			<div className='app'>
				<div className='wrapper'>
					<header>
						<h1>Playlist</h1>
						<Router>
							<nav>
								<Link to="/">Home</Link>
								<Link to="/add_show">Add Show</Link>
								<Route exact path="/" component={Home} />
								<Route path="/add_show" component={ShowInputForm} />
							</nav>
						</Router>
					</header>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));