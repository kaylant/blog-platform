import React, {Component} from 'react'
import Textarea from 'react-textarea-autosize'
import Header from './header'
import MyPosts from './myPosts'
import AllPosts from './allPosts'

// --------------- Add Post --------------- //

var AddPost = React.createClass ({

	_grabPost: function(evt) {
		evt.preventDefault()
		var titleInput = evt.target.title.value
		var contentInput = evt.target.content.value
		// console.log(titleInput)
		// console.log(contentInput)

		// console.log(this.props.myPostsColl)
		this.props.myPostsColl.add({
			'title': titleInput,
			'content': contentInput
		})
		console.log('adding to allpostcoll')
		console.log(this.props.allPostsColl)
		this.props.allPostsColl.add({
			'title': titleInput,
			'content': contentInput
		})
		console.log('adding to allpostcoll')
		console.log(this.props.allPostsColl)

		window.location.hash = "myposts"
	},

	render: function() {
		var Textarea = require('react-textarea-autosize')
		return (
			<div className="addpost">
				<Header/>
				<p>Create post</p>
				<a href="#dash">Back to Dash</a>
				<form onSubmit={this._grabPost}>
					<textarea id="title" placeholder="My title"/>
					<Textarea id="content" placeholder="Type something here..."/>
					<input id="submitButton" type="submit" value="Submit"/>
				</form>
			</div>
			)
	}
})

export default AddPost