import React from 'react';
import moment from 'moment';
import firebase from './firebase.js';
import ShowSearchForm from './ShowSearchForm.js';
import MoreInformation from './MoreInformation.js';

const showRef = firebase.database().ref('/shows');

class Results extends React.Component {
	constructor(){
		super();
		this.state = ({
			city: '',
			genre: '',
			date: '',
			chosenCity: localStorage.getItem("city"),
			chosenDate: localStorage.getItem("date"),
			chosenGenre: localStorage.getItem("genre"),
			shows: [],
		});

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault();

		const grabGenre = this.state.genre
		const grabDate = this.state.date

		localStorage.setItem("genre", grabGenre);
		localStorage.setItem("date", grabDate);

		this.context.router.history.push('/results');
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	handleClick(id){
		this.context.router.history.push(`/results/${id}`);
	}
	componentDidMount(){
		showRef.on('value', (snapshot) => {
			const newShowsArray = [];
			const firebaseItems = snapshot.val();
			for(let key in firebaseItems) {
				const firebaseItem = firebaseItems[key];
				firebaseItem.id = key;
				newShowsArray.push(firebaseItem);
			}
			this.setState({	
				shows : newShowsArray,
			});	
		});
	}
	render(){

			const chosenCity = localStorage.getItem("city");
			const chosenGenre = localStorage.getItem("genre");
			const allShows = this.state.shows;
			const chosenDate = moment(localStorage.getItem("date"), "YYYY-MM-DD");
			const cityGenreResults =allShows.filter((el) => {
				if (chosenCity === '' && chosenGenre === ''){
					return el;
				} else if (chosenCity === '' && chosenGenre !== ''){
					return el.genre === chosenGenre;
				} else if(chosenCity !== '' && chosenGenre !== ''){
					return el.city === chosenCity && el.genre === chosenGenre;
				} 
			});

			const finalResults = cityGenreResults.filter((el, i) => {
				// const startDate = moment(allShows[i].startDate, "YYYY-MM-DD");
				const startDate = moment(allShows[i].startDate, "YYYY-MM-DD");
				const endDate = moment(allShows[i].endDate, "YYYY-MM-DD");
				if(localStorage.getItem("date") === '') {
					return el;
					console.log('no date');
				} else if(moment(chosenDate).isBetween(startDate, endDate)) {
						return el;
				}
			});

		return(
			<section className='results'>
				<div className='wrapper'>
					<div className="resultsPageSearchForm">
						<ShowSearchForm
						handleChange={this.handleChange} 
						handleSubmit={this.handleSubmit} 
						city={this.state.city}
						date={this.state.date}
						genre={this.state.genre}
						/> 
					</div>
					<ul className='results_display'>
						{finalResults.map((result, i) => {
							const startDateRender = moment(result.startDate).format(`MMMM Do YYYY`);
							const endDateRender = moment(result.endDate).format(`MMMM Do YYYY`);
							return (
								<li className="show" key={result.id} onClick={() => this.handleClick(result.id)}>
									<div className="showPoster">
										<img src={result.showPoster} />
									</div>
									<div className="showInfo">
										<div className="resultText">
											<h3>{result.showTitle}</h3>
											<p className="date">From {startDateRender}</p>
											<p>To {endDateRender}</p>
											<p>At the {result.venue}</p>
											<p className="clickForMore">(Click for More Info)</p>
										</div>
										<div className="clickForMoreOverlay">
											<div className="clickForContainer">
												<p>Click for</p>
												<p>More Information</p>
											</div>
										</div>
									</div>
 								</li>
							);
						})};
					</ul>
				</div>	
			</section> 
		)
	}
}

Results.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  }),
}; 

MoreInformation.contextTypes = {
  router: React.PropTypes.shape({
    history: React.PropTypes.object.isRequired,
  }),
}; 

export default Results;