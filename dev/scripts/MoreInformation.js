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
			const startDate = this.state.show.startDate
			const startDateRender = moment(startDate).format(`MMMM Do YYYY`);
			const endDate = this.state.show.endDate
			const endDateRender = moment(endDate).format(`MMMM Do YYYY`);
		return(
			<section className="moreInformation">
				<div className="wrapper">
					<button className="backButton" onClick={this.handleClick}>Back to Results</button>
					<div className="fullShowInformation">
						<div className="showPosterAndMainInfo">
							<div className="moreInfoPoster">
								<img src={this.state.show.showPoster} />
							</div>
							<div className="titleAndDate">
								<h2>{this.state.show.showTitle}</h2>
								<p> From: {startDateRender}</p>
								<p> To: {endDateRender}</p>
							</div>
						</div>
						<p>{this.state.show.description}</p>
						<p className="website">Tickets at {this.state.show.website}</p>
					</div>
				</div>
			</section>
		)
	}
}

export default MoreInformation;