import React, {Component} from 'react'
import Header from './header'
import MyPosts from './myPosts'

// --------------- Add Post --------------- //

var AddPost = React.createClass ({

	_grabPost: function(evt) {
		console.log(this.props.postData)
		evt.preventDefault()
		var titleInput = evt.target.title.value
		var contentInput = evt.target.content.value
		this.props.postData.set({'title' : titleInput, 'content' : contentInput})
		this.props.myPostsColl.add(this.props.postData)
		this.props.update()
	},

	// store new data (model) on props
	// add new model to collection
	// make new post
	// run update

	render: function() {
		return (
			<div className="addpost">
				<p>Create post</p>
				<form onSubmit={this._grabPost}>
					<textarea id="title" placeholder="My title"/>
					<textarea id="content" placeholder="Type something here..."/>
					<input type="submit" value="Submit"/>
				</form>
			</div>
			)
	}
})

export default AddPost