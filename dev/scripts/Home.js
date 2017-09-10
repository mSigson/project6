import React from 'react';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink } from 'react-router-dom';
import ShowSearchForm from './ShowSearchForm.js';

class Home extends React.Component {
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
		return (
			<div className='app'>
				<div className='wrapper'>
					<ShowSearchForm
					handleChange={this.handleChange} 
					handleSubmit={this.handleSubmit} 
					city={this.state.city}
					date={this.state.date}
					/> 
				</div>
			</div>
		);
	}
}

export default Home; 
