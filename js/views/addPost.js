import React, {Component} from 'react'
import Header from './header'

// --------------- Add Post --------------- //

var AddPost = React.createClass ({

	_grabPost: function(evt) {
		evt.preventDefault()
		var titleInput = evt.target.title.value
		var contentInput = evt.target.content.value
	},

	render: function() {
		return (
			<div className="addpost">
				<p>Create post</p>
				<form onSubmit={this._grabPost}>
					<textarea id="title" placeholder="My title"/>
					<textarea id="content" placeholder="Type something here..."/>
				</form>
			</div>
			)
	}
})

export default AddPost