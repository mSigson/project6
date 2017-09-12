import React from 'react';
import { 
	BrowserRouter as Router, 
	Route, Link, NavLink } from 'react-router-dom';
import Results from './Results.js';

class ShowSearchForm extends React.Component {
	render(){
		return(
			<section className="showSearch">
				<div className='wrapper'>
					<div className="showSearch__img">
						<img src="./dev/assets/batOutOfHell.jpg" />
					</div>
					<div className="showSearch__form">
						<h2>What are you looking for?</h2>
						<form onSubmit={this.props.handleSubmit}>
							<label htmlFor="city">Enter city</label>
							<input name="city" type="text" value="Toronto" onChange={this.props.handleChange} />
							<label htmlFor="date">Select a date</label>
							<input name="date" type="date" onChange={this.props.handleChange} />
							<label htmlFor="genre">Pick a style of theatre</label>
							<select name="genre" onChange={this.props.handleChange}>
								<option value=''>Genres</option>
								<option value="musical">Musicals</option>
								<option value="play">Plays</option>
							</select>
							<div>
								<button type="submit">Search</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		)
	}
}

export default ShowSearchForm;