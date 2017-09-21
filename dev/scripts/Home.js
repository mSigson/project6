import React from 'react';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink } from 'react-router-dom';
import moment from 'moment';
import ShowSearchForm from './ShowSearchForm.js';
import ShowSuggestions from './ShowSuggestions.js';
import MissionStatement from './MissionStatement.js';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			city: '',
			genre: '',
			date: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();

		const grabCity = this.state.city
		const grabGenre = this.state.genre
		const grabDate = this.state.date

		localStorage.setItem("city", grabCity);
		localStorage.setItem("genre", grabGenre);
		localStorage.setItem("date", grabDate);

		this.context.router.history.push('/results');

		
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	render() {
		return (
			<section className='homePage'>
					<div className="homePageSearchForm">
						<ShowSearchForm
						handleChange={this.handleChange} 
						handleSubmit={this.handleSubmit} 
						city={this.state.city}
						date={this.state.date}
						genre={this.state.genre}
						/> 
					</div>
			</section>
		);
	}
}

Home.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  }),
}; 
export default Home; 
