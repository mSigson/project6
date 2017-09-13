import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase.js';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink, Redirect, BrowserHistory } from 'react-router-dom';
import Home from './Home.js';
import ShowInputForm from './ShowInputForm.js';
import ShowSuggestions from './ShowSuggestions.js';
import Results from './Results.js';
import MoreInformation from './MoreInformation.js';

const dbRef = firebase.database().ref('/items');

class App extends React.Component {
	render() {
		return (
			<Router history={BrowserHistory}>
				<div className='app'>
					<div className='wrapper'>
						<header>
							<h1>Playlist Toronto</h1>
							<nav>
								<Link to="/" >Home</Link>
								<Link to="/add_show">Add Show</Link>
							</nav>
						</header>
						<Route exact path="/" component={Home} />
						<Route path="/add_show" component={ShowInputForm} />
						<Route exact path="/results" component={Results} />
						<Route exact path="/results/:show_id" component={MoreInformation} />
					</div>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));