import React from 'react';
import moment from 'moment';
import firebase from './firebase.js';

const showRef = firebase.database().ref('/shows');

class Results extends React.Component {
	constructor(){
		super();
		this.state = ({
			chosenCity: localStorage.getItem("city"),
			chosenDate: localStorage.getItem("date"),
			chosenGenre: localStorage.getItem("genre"),
			shows: [],
		});
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

			const chosenCity = this.state.chosenCity;
			const chosenGenre = this.state.chosenGenre;
			const allShows = this.state.shows;
			const chosenDate = moment(this.state.chosenDate, "YYYY-MM-DD");

			const cityGenreResults =allShows.filter(function (el) {
				if (chosenCity === '' && chosenGenre === ''){
					return el
				} else if (chosenCity === '' && chosenGenre !== ''){
					return el.genre === chosenGenre
				} else if(chosenCity !== '' && chosenGenre !== ''){
					return el.city === chosenCity && el.genre === chosenGenre;
				} 

			});

			const finalResults = cityGenreResults.filter(function(el, i) {
				const startDate = moment(allShows[i].startDate, "YYYY-MM-DD");
				const endDate = moment(allShows[i].endDate, "YYYY-MM-DD");

				if(chosenDate === '') {
					return el;
					console.log('no date');
				} else if(moment(chosenDate).isBetween(startDate, endDate)) {
						return el;
				}
			});

		return(
			<section className='results'>
				<div className='wrapper'>
					<ul className='results_display'>
						{finalResults.map((result, i) => {
							return (
								<li className="show" key={result.id}>
									<h3>{result.showTitle}</h3>
									<div className="showDetails">
										<div className="showPoster">
											<img src={result.showPoster} />
										</div>
										<div className="showInfo">
											<p>From {result.startDate} to {result.endDate}</p>
											<p>{result.description}</p>
											<p>{result.venue}</p>
											<p>{result.address}</p>
											<p> {result.city} </p>
											<p>{result.website}</p>
											<p>{result.ticketCost}</p>
										</div>
									</div>
 								</li>
							);
						})}
					</ul>
				</div>	
			</section> 
		)
	}
}

export default Results;