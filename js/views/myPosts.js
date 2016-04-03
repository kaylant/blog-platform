import React, {Component} from 'react'
import Header from './header'
import AddPost from './addPost'

// --------------- My Posts --------------- //

var MyPosts = React.createClass ({

	getInitialState: function() {
		console.log(this)
		return {
			myPostsColl: this.props.myPostsColl
		}
	},

	_update: function() {
		console.log(this)
		this.setState({
			myPostsColl: this.state.myPostsColl
		})
	},

	_makePostComponent: function(model, i) {
		return <AddPost myPostsColl={this.props.myPostsColl} postData={model} key={i} update={this._update}/>
	},

	render: function() {
		return (
			<div className="myPostsList">
				<Header/>
				{this.props.myPostsColl.map(this._makePostComponent)}
			</div>
			)
	}

})

export default MyPosts