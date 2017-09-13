import React from 'react';
import Results from './Results.js';

class SubmissionThankYou extends React.Component{
	render(){
		return(
			<section className="submissionThankYou">
				<div className="wrapper">
					<div className="thankYouMessage">
						<h3>Thank you for your submission!</h3>
						<Link to='./'>Home</Link>
						<Link to="./results">Submit Another</Link>
					</div>
				</div>
			</section>
		)
	}
}