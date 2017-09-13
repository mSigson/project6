import React from 'react';
import firebase from 'firebase';
import MoreInformation from './MoreInformation.js';

class ShowSuggestions extends React.Component{
	constructor(){
		super();
		this.state=({
			allShows: [],
			threeRandomShows: [],
		})
	}
	handleClick(id){
		this.context.router.history.push(`/results/${id}`);
	}
	componentDidMount(){
		const showRef = firebase.database().ref('/shows');

		showRef.on('value', (snapshot) => {
			const newShowsArray = [];
			const firebaseItems = snapshot.val();
			for(let key in firebaseItems) {
				const firebaseItem = firebaseItems[key];
				firebaseItem.id = key;
				newShowsArray.push(firebaseItem);
			}
			this.setState({	
				allShows : newShowsArray,
			});	

		});

	}
	render(){
		var randoShows = [];
		var loopLength  = 0;
		if(this.state.allShows.length > 3) {
			loopLength = 3
		}
		else {
			loopLength = this.state.allShows.length
		}
		for (let i = 0; i < loopLength ; i++){
			let randomNumber = Math.floor(Math.random() * loopLength);
			let show = this.state.allShows[randomNumber];
			randoShows.push(show);
		}
		return(
			<section className="showSuggestions">
				<div className="wrapper">
					<p>May we suggest...</p>
					<ul className='results_display'>
						{randoShows.map((show, i) => {
							return (
								<li className="show" key={show.id} onClick={() => this.handleClick(show.id)}>
									<h3>{show.showTitle}</h3>
									<div className="informationBackground">
										<div className="showDetails">
											<div className="showPoster">
												<img src={show.showPoster} />
											</div>
											<div className="showInfo">
												<p>{show.venue}</p>
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

export default ShowSuggestions ;