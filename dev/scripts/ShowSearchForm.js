import React from 'react';

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
						<form>
							<label htmlFor="city">Enter city</label>
							<input name="city" type="text" placeholder="eg. Toronto" onChange={this.props.handleChange} />
							<label htmlFor="date">Select a date</label>
							<input name="date" type="date" onChange={this.props.handleChange} />
							<label htmlFor="genre">Pick a style of theatre</label>
							<select name="genre" onChange={this.props.handleChange}>
								<option value="musical">Musicals</option>
								<option value="play">Plays</option>
							</select>
							<button type="submit">Searc
							</button>
						</form>
					</div>
				</div>
			</section>
		)
	}
	
}

export default ShowSearchForm;