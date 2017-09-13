import React from 'react';
import {BrowserHistory, Link} from 'react-router-dom';
import moment from 'moment';
import firebase from './firebase.js';
import Results from './Results.js';

class MoreInformation extends React.Component{
	constructor(){
		super();
		this.state =({
			show: {},
		})
	}
	handleClick(){
		window.history.back();
	}
	componentDidMount(){
		const showRef = firebase.database().ref(`/shows/${this.props.match.params.show_id}`);
		showRef.on('value', (snapshot) => {
			const newShowsArray = [];
			const firebaseItem = snapshot.val();
		
			this.setState({	
				show : firebaseItem,
			});	
		});
	}
	render(){
		console.log(this.state);
		return(
			<section className="moreInformation">
				<div className="wrapper">
					<button className="backButton" onClick={this.handleClick}>Back to Results</button>
					<div className="fullShowInformation">
						<h2>{this.state.show.showTitle}</h2>
						<p>{this.state.show.date}</p>
						<p>Tickets via: {this.state.show.website}</p>
						<p>{this.state.show.description}</p>
						<div className="moreInfoPoster">
							<img src={this.state.show.showPoster} />
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default MoreInformation;