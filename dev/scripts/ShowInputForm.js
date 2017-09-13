import React from 'react';
import firebase from 'firebase';
import SweetAlert from 'react-bootstrap-sweetalert';

class ShowInputForm extends React.Component {
	constructor() {
		super();
		this.state = {
		    showTitle: '',
		    description:'',
		    genre:'',
		    startDate: '',
		    endDate: '',
		    venue: '',
		    address: '',
		    city: '',
		    website: '',
		    showPoster: '',
		    loading: false,
		    shows: [],
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleUpload(event){
		event.preventDefault();
		const poster = this.poster.files[0];
		const storageRef = firebase.storage().ref("/");
		const thisImage = storageRef.child(poster.name);
		this.setState({
			loading: true,
		});
		thisImage.put(poster).then((snapshot) => {
			thisImage.getDownloadURL().then((url) => {
				this.setState({
					showPoster: url,
					loading: false,
				});
			});
		});
	}
	handleSubmit(event){
		event.preventDefault();
		const showRef = firebase.database().ref('/shows');
		const newShow = {
			showTitle: this.state.showTitle,
			description:this.state.description,
			genre: this.state.genre,
			startDate: this.state.startDate,
			endDate: this.state.endDate,
			venue: this.state.venue,
			address: this.state.address,
			city: this.state.city,
			website: this.state.website,
			showPoster: this.state.showPoster,
		}
		showRef.push(newShow);
	}
	render(){
		return (
			<section className='add-show'>
				<div className="wrapper">
					<form onSubmit={this.handleSubmit}>
						<div className="labelInput">
							<label htmlFor="title">Title</label>
							<input type="text" value={this.state.username} name="showTitle" onChange={this.handleChange} />
						</div>
						<div className="labelInput">
							<label htmlFor="genre">Genre</label>
							<select name="genre" onChange={this.handleChange} >
								<option>Select a Genre</option>
								<option value="musical" >Musical</option>
								<option value="play">Play</option>
							</select>
						</div>
						<div className="labelInput showDuration">
							<label htmlFor="startDate">Start Date</label>
							<input name="startDate" type="date" onChange={this.handleChange} />
							<label htmlFor="endDate">End Date</label>
							<input name="endDate" type="date" onChange={this.handleChange} />
						</div>
						<div className="labelInput">
							<label htmlFor="venue">Venue</label>
							<input type="text" value={this.state.venue} name="venue" onChange={this.handleChange} />
						</div>
						<div className="labelInput">
							<label htmlFor="address">Address</label>
							<input type="text" value={this.state.address} name="address" onChange={this.handleChange} />
						</div>
						<div className="labelInput">
							<label htmlFor="city">City</label>
							<input type="text" value={this.state.city} name="city" onChange={this.handleChange} />
						</div>
						<div className="labelInput">
							<label htmlFor="website">Website</label>
							<input type="text" value={this.state.website} name="website" onChange={this.handleChange} />
						</div>
						<div className="labelInput">
							<label htmlFor="description" >Description</label>
							<textarea value={this.state.description} name="description" onChange={this.handleChange} className="description"/>
						</div>
						<div className="labelInput">
							<label htmlFor="showPoster"> Show Poster </label>
							<input type="file" name="showPoster" accept="image/*" ref={(ref)=>{this.poster = ref}} onChange={this.handleUpload} className="showPoster"/>
						</div>
						<button type="submit">Submit</button>
						<div className="showPoster">
							<img src={this.state.showPoster} />
						</div>
					</form>
				</div>
			</section>
		)
	}
}

export default ShowInputForm;