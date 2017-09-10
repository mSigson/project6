import React from 'react';
import firebase from 'firebase';

const showRef = firebase.database().ref('/shows');

class ShowInputForm extends React.Component {
	constructor() {
		super();
		this.state = {
		    showTitle: '',
		    description:'',
		    venue: '',
		    address: '',
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
		const newShow = {
			showTitle: this.state.showTitle,
			description:this.state.description,
			venue: this.state.venue,
			address: this.state.address,
			website: this.state.website,
			showPoster: this.state.showPoster,
		}
		showRef.push(newShow);
	}
	render(){
		return (
			<section className='add-show'>
				<form onSubmit={this.handleSubmit}>
		          <label htmlFor="title">Title</label>
		          <input type="text" value={this.state.username} name="showTitle" onChange={this.handleChange} />
		          <label htmlFor="description" >Description</label>
		          <input type="text" value={this.state.description} name="description" onChange={this.handleChange} />
		          <label htmlFor="venue">Venue</label>
		          <input type="text" value={this.state.venue} name="venue" onChange={this.handleChange} />
		          <label htmlFor="address">Address</label>
		          <input type="text" value={this.state.address} name="address" onChange={this.handleChange} />
		           <label htmlFor="website">Website</label>
		          <input type="text" value={this.state.website} name="website" onChange={this.handleChange} />
		          <label htmlFor="showPoster"> Show Poster </label>
		          <input type="file" name="showPoster" accept="image/*" ref={(ref)=>{this.poster = ref}} onChange={this.handleUpload}/>
		          <img src={this.state.showPoster} />
		          <button type="submit">Submit</button>
		        </form>
			</section>
		)
	}
}

export default ShowInputForm;