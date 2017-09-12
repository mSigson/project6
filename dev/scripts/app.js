import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase.js';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink, Redirect } from 'react-router-dom';
import Home from './Home.js';
import ShowInputForm from './ShowInputForm.js';
import Results from './Results.js';
import MoreInformation from './MoreInformation.js';

const dbRef = firebase.database().ref('/items');

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='app'>
					<div className='wrapper'>
						<header>
							<h1>Playlist</h1>
							<div>
								<nav>
									<Link to="/">Home</Link>
									<Link to="/add_show">Add Show</Link>
									<Route exact path="/" component={Home} />
									<Route path="/add_show" component={ShowInputForm} />
									<Route path="/results" component={Results} />
									<Route path="/results/:results_id" component={MoreInformation} />
								</nav>
							</div>
						</header>
					</div>
				</div>
			</Router>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));