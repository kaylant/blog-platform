import React, {Component} from 'react'
import Header from './header'

// --------------- Dash View --------------- //

var DashView = React.createClass ({
	render: function() {
		return (
			<div className="dash">
				<p>Welcome, {this.props.email}</p>
				<Header/>
				<div className="dashOptions">
					<a href="#addpost">Add Post</a>
					<a href="#myposts">View My Posts</a>
					<a href="#myposts">View All Posts</a>
					<a href="#allposts">Sign Out</a>
				</div>
			</div> 
			)
	}
})

export default DashView