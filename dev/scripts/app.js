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
	constructor() {
		super();
		this.state = {
			city: '',
			genre: '',
			date: '',
			shows:[],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();
		
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		})
	}
	render() {
		console.log(this.props.router);
		return (
			<div className='app'>
				<div className='wrapper'>
					<header>
						<h1>Playlist</h1>
						<Router>
							<nav>
								<Route path="/" render={ () => <Redirect to="/home" />} />
								<Link to="/home">Home</Link>
								<Link to="/add_show">Add Show</Link>
								<Route path="/home" component={Home} />
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